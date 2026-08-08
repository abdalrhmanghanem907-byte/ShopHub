import { createContext, useContext, useState, useCallback, useRef, useEffect } from "react";
import { CheckCircle2, Info, X } from "lucide-react";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const timers = useRef({});

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    if (timers.current[id]) {
      clearTimeout(timers.current[id]);
      delete timers.current[id];
    }
  }, []);

  const showToast = useCallback(
    (message, type = "success") => {
      const id = Date.now() + Math.random().toString(36).slice(2, 7);
      setToasts((prev) => [...prev, { id, message, type }]);
      timers.current[id] = setTimeout(() => removeToast(id), 3500);
    },
    [removeToast]
  );

  // Clear timers on unmount
  useEffect(() => {
    return () => {
      Object.values(timers.current).forEach((t) => clearTimeout(t));
    };
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, removeToast }}>
      {children}

      {/* Toast container */}
      <div
        aria-live="polite"
        aria-atomic="false"
        className="pointer-events-none fixed bottom-4 right-4 z-[100] flex w-full max-w-sm flex-col gap-2 px-4 sm:px-0"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-start gap-3 rounded-xl border border-line bg-white p-4 shadow-lg animate-[toast-in_0.2s_ease-out]"
          >
            <span
              className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                toast.type === "success"
                  ? "bg-green-100 text-green-600"
                  : toast.type === "error"
                  ? "bg-red-100 text-red-600"
                  : "bg-primary-light text-primary"
              }`}
            >
              {toast.type === "success" ? (
                <CheckCircle2 size={15} />
              ) : toast.type === "error" ? (
                <Info size={15} />
              ) : (
                <Info size={15} />
              )}
            </span>
            <p className="flex-1 text-sm font-medium text-ink">{toast.message}</p>
            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              aria-label="Dismiss notification"
              className="shrink-0 text-muted transition-colors hover:text-ink"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
