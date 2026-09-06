import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useForm, useWatch } from "react-hook-form";
import { Eye, EyeOff, UserPlus, User, Mail, Lock, Loader2 } from "lucide-react";
import Container from "../components/layout/Container";
import useAuth from "../hooks/useAuth";
import usePageTitle from "../hooks/usePageTitle";
import { useToast } from "../components/ui/Toast";

export default function Register() {
  const { t } = useTranslation();
  usePageTitle(`${t("createAccount")} | ShopAbdalrhman`);
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [authError, setAuthError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useToast();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const password = useWatch({ control, name: "password", defaultValue: "" });

  const onSubmit = (data) => {
    setAuthError("");
    setIsSubmitting(true);
    setTimeout(() => {
      const result = registerUser(data.name, data.email, data.password);
      if (result.error) {
        setAuthError(result.error);
        setIsSubmitting(false);
        return;
      }
      setIsSubmitting(false);
      showToast(t("accountCreatedToast"));
      navigate("/", { replace: true });
    }, 600);
  };

  return (
    <section className="flex min-h-[70vh] items-center py-16 sm:py-24">
      <Container className="max-w-md">
        <div className="rounded-3xl border border-line bg-white p-8 shadow-sm sm:p-10">
          {/* Header */}
          <div className="text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-light text-primary">
              <UserPlus size={26} />
            </span>
            <h1 className="mt-5 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              {t("registerTitle")}
            </h1>
<p className="mt-2 text-muted">
              {t("registerDescription")}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
            {/* Name */}
            <div>
              <label
                htmlFor="reg-name"
                className="mb-1.5 block text-sm font-medium text-ink"
              >
                {t("fullName")}
              </label>
              <div className="relative">
                <User
                  size={17}
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
                />
                <input
                  id="reg-name"
                  type="text"
                  autoComplete="name"
                  placeholder={t("namePlaceholder")}
                  className="w-full rounded-xl border border-line bg-background py-3 pl-10 pr-4 text-sm text-ink outline-none transition-colors placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-primary/20"
                  {...register("name", {
                    required: t("requiredField", { field: t("fullName") }),
                    minLength: {
                      value: 2,
                      message: t("nameMin"),
                    },
                  })}
                />
              </div>
              {errors.name && (
                <p className="mt-1.5 text-xs font-medium text-red-600">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="reg-email"
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
                  id="reg-email"
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
                htmlFor="reg-password"
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
                  id="reg-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder={t("passwordPlaceholder")}
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

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="reg-confirm"
                className="mb-1.5 block text-sm font-medium text-ink"
              >
                {t("confirmPassword")}
              </label>
              <div className="relative">
                <Lock
                  size={17}
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
                />
                <input
                  id="reg-confirm"
                  type={showConfirm ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder={t("reenterPassword")}
                  className="w-full rounded-xl border border-line bg-background py-3 pl-10 pr-12 text-sm text-ink outline-none transition-colors placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-primary/20"
                  {...register("confirmPassword", {
                    required: t("requiredField", { field: t("confirmPassword") }),
                    validate: (value) =>
                      value === password || t("passwordsMismatch"),
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((prev) => !prev)}
                  aria-label={
                    showConfirm ? t("hideConfirmPassword") : t("showConfirmPassword")
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted transition-colors hover:text-ink"
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1.5 text-xs font-medium text-red-600">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Auth error */}
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
              {isSubmitting ? t("creatingAccount") : t("createAccount")}
            </button>
          </form>

          {/* Switch to login */}
          <p className="mt-6 text-center text-sm text-muted">
            {t("alreadyAccount")}{" "}
            <Link
              to="/login"
              className="font-semibold text-primary transition-colors hover:text-primary-dark"
            >
              {t("signInLink")}
            </Link>
          </p>
        </div>
      </Container>
    </section>
  );
}
