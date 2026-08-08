import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

// Wraps a page so that only authenticated users can access it.
// Unauthenticated users are redirected to /login.
export default function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // Wait until the initial auth state is known to avoid a wrong redirect.
  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!isAuthenticated) {
    // Pass `from` so Login can return the user after signing in.
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return children;
}

