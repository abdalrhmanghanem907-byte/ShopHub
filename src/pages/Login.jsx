import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, LogIn, Mail, Lock, Loader2 } from "lucide-react";
import Container from "../components/layout/Container";
import useAuth from "../hooks/useAuth";
import usePageTitle from "../hooks/usePageTitle";
import { useToast } from "../components/ui/Toast";

export default function Login() {
  const { t } = useTranslation();
  usePageTitle(`${t("login")} | ShopAbdalrhman`);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // After login, return the user to the page they tried to access.
  const from = location.state?.from || "/";

  const onSubmit = (data) => {
    setAuthError("");
    setIsSubmitting(true);
    setTimeout(() => {
      const result = login(data.email, data.password);
      if (result.error) {
        setAuthError(result.error);
        setIsSubmitting(false);
        return;
      }
      setIsSubmitting(false);
      showToast(t("welcomeBackToast"));
      navigate(from, { replace: true });
    }, 600);
  };

  return (
    <section className="flex min-h-[70vh] items-center py-16 sm:py-24">
      <Container className="max-w-md">
        <div className="rounded-3xl border border-line bg-white p-8 shadow-sm sm:p-10">
          {/* Header */}
          <div className="text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-light text-primary">
              <LogIn size={26} />
            </span>
            <h1 className="mt-5 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              {t("loginTitle")}
            </h1>
<p className="mt-2 text-muted">{t("loginDescription")}</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="login-email"
                className="mb-1.5 block text-sm font-medium text-ink"
              >
                {t("emailAddress")}
              </label>
              <div className="relative">
                <Mail
                  size={17}
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
                />
                <input
                  id="login-email"
                  type="email"
                  autoComplete="email"
                  placeholder={t("emailPlaceholder")}
                  className="w-full rounded-xl border border-line bg-background py-3 pl-10 pr-4 text-sm text-ink outline-none transition-colors placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-primary/20"
                  {...register("email", {
                    required: t("requiredField", { field: t("emailAddress") }),
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: t("validEmail"),
                    },
                  })}
                />
              </div>
              {errors.email && (
                <p className="mt-1.5 text-xs font-medium text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="login-password"
                className="mb-1.5 block text-sm font-medium text-ink"
              >
                {t("password")}
              </label>
              <div className="relative">
                <Lock
                  size={17}
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
                />
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-line bg-background py-3 pl-10 pr-12 text-sm text-ink outline-none transition-colors placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-primary/20"
                  {...register("password", {
                    required: t("requiredField", { field: t("password") }),
                    minLength: {
                      value: 6,
                      message: t("passwordMin"),
                    },
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? t("hidePassword") : t("showPassword")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted transition-colors hover:text-ink"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1.5 text-xs font-medium text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Server/back error */}
            {authError && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                {t(authError, { defaultValue: authError })}
              </div>
            )}

<button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting && <Loader2 size={16} className="animate-spin" />}
              {isSubmitting ? t("signingIn") : t("signIn")}
            </button>
          </form>

          {/* Switch to register */}
          <p className="mt-6 text-center text-sm text-muted">
            {t("noAccount")}{" "}
            <Link
              to="/register"
              className="font-semibold text-primary transition-colors hover:text-primary-dark"
            >
              {t("createOne")}
            </Link>
          </p>
        </div>
      </Container>
    </section>
  );
}
