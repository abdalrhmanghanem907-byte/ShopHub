import { useState, useCallback, useEffect } from "react";

// localStorage keys for authentication
const USERS_KEY = "shophub_users";
const CURRENT_USER_KEY = "shophub_current_user";

// Helper: safely read JSON from localStorage
function readStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    // Ensure we got the expected data type; otherwise fall back safely.
    if (key === USERS_KEY && !Array.isArray(parsed)) return fallback;
    if (key === CURRENT_USER_KEY && (typeof parsed !== "object" || parsed === null)) {
      return fallback;
    }
    return parsed;
  } catch (error) {
    // Corrupted JSON or storage errors should never crash the app.
    console.warn(`Unable to read localStorage key "${key}":`, error);
    return fallback;
  }
}

// Helper: safely write JSON to localStorage
function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Unable to write localStorage key "${key}":`, error);
  }
}

// Helper: validate email format
function isValidEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

export default function useAuth() {
  // currentUser = { id, name, email } or null when logged out
  const [currentUser, setCurrentUser] = useState(() =>
    readStorage(CURRENT_USER_KEY, null)
  );
  const [isLoading, setIsLoading] = useState(true);

  // Simulate a brief initial load so we never redirect before auth state is known.
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 150);
    return () => clearTimeout(timer);
  }, []);

  // Login: find matching user and set as current user.
  const login = useCallback((email, password) => {
    const users = readStorage(USERS_KEY, []);
    const user = users.find(
      (u) =>
        String(u.email).toLowerCase() === String(email).toLowerCase() &&
        String(u.password) === String(password)
    );

    if (!user) {
      return { error: "Invalid email or password." };
    }

    // Store the user WITHOUT the password in the current-user key.
    const safeUser = { id: user.id, name: user.name, email: user.email };
    setCurrentUser(safeUser);
    writeStorage(CURRENT_USER_KEY, safeUser);
    return { success: true };
  }, []);

  // Register: create a new user, store it, and auto log in.
  const register = useCallback((name, email, password) => {
    // Basic validation
    if (!name || !name.trim()) {
      return { error: "Please enter your name." };
    }
    if (!isValidEmail(email)) {
      return { error: "Please enter a valid email address." };
    }
    if (!password || password.length < 6) {
      return { error: "Password must be at least 6 characters." };
    }

    const users = readStorage(USERS_KEY, []);

    // Prevent duplicate email registration.
    const exists = users.some(
      (u) => String(u.email).toLowerCase() === String(email).toLowerCase()
    );
    if (exists) {
      return { error: "An account with this email already exists." };
    }

    // Build the new user object.
    // NOTE: This is a classroom/frontend demo. In a real application you must
    // NEVER store plain-text passwords like this — use a secure backend with
    // hashing/salting instead.
    const newUser = {
      id: String(Date.now()),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password: password,
    };

    const updatedUsers = [...users, newUser];
    writeStorage(USERS_KEY, updatedUsers);

    const safeUser = { id: newUser.id, name: newUser.name, email: newUser.email };
    setCurrentUser(safeUser);
    writeStorage(CURRENT_USER_KEY, safeUser);
    return { success: true };
  }, []);

  // Logout: clear the current user (keep users list intact).
  const logout = useCallback(() => {
    setCurrentUser(null);
    try {
      localStorage.removeItem(CURRENT_USER_KEY);
    } catch (error) {
      console.warn("Unable to clear current user:", error);
    }
  }, []);

  // Update the authenticated user's profile (name).
  // Updates both the current-user key and the matching entry in the users list.
  const updateProfile = useCallback(
    (newName) => {
      if (!currentUser) {
        return { error: "Not authenticated." };
      }
      const safeName = newName.trim();
      if (!safeName || safeName.length < 2) {
        return { error: "Name must be at least 2 characters." };
      }

      const updatedUser = { ...currentUser, name: safeName };
      setCurrentUser(updatedUser);
      writeStorage(CURRENT_USER_KEY, updatedUser);

      const users = readStorage(USERS_KEY, []);
      const updatedUsers = users.map((u) =>
        String(u.id) === String(currentUser.id) ? { ...u, name: safeName } : u
      );
      writeStorage(USERS_KEY, updatedUsers);

      return { success: true };
    },
    [currentUser]
  );

  return {
    currentUser,
    isAuthenticated: Boolean(currentUser),
    isLoading,
    login,
    register,
    logout,
    updateProfile,
  };
}

