import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "shophub_wishlist";

// Safely read wishlist IDs from localStorage
function loadWishlist() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    // Keep only valid strings, remove duplicates
    return [...new Set(parsed.filter((id) => typeof id === "string"))];
  } catch {
    // Invalid JSON or any other error → default to empty
    return [];
  }
}

export default function useWishlist() {
  const [wishlistIds, setWishlistIds] = useState(loadWishlist);

  // Save to localStorage whenever the list changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlistIds));
    } catch {
      // Ignore write errors (e.g. storage full / private mode)
    }
  }, [wishlistIds]);

  const isInWishlist = useCallback(
    (productId) => wishlistIds.includes(String(productId)),
    [wishlistIds]
  );

  const toggleWishlist = useCallback((productId) => {
    const id = String(productId);
    setWishlistIds((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  }, []);

  const removeFromWishlist = useCallback((productId) => {
    const id = String(productId);
    setWishlistIds((prev) => prev.filter((p) => p !== id));
  }, []);

  const clearWishlist = useCallback(() => {
    setWishlistIds([]);
  }, []);

  return {
    wishlistIds,
    isInWishlist,
    toggleWishlist,
    removeFromWishlist,
    clearWishlist,
  };
}
