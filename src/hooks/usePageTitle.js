import { useEffect } from "react";

// Simple beginner-friendly hook that sets the browser document title.
function usePageTitle(title) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}

export default usePageTitle;
