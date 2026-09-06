import { useTranslation } from "react-i18next";

export default function CustomerInformation({ register, errors }) {
  const { t } = useTranslation();
  return (
    <div className="rounded-2xl border border-line bg-white p-6 shadow-sm">
      <h2 className="text-lg font-bold tracking-tight text-ink">
        {t("customerInformation")}
      </h2>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Full Name */}
        <div>
          <label
            htmlFor="name"
            className="mb-1 block text-sm font-medium text-ink"
          >
            {t("fullName")}
          </label>
          <input
            id="name"
            type="text"
            placeholder={t("namePlaceholder")}
            {...register("name", { required: t("requiredField", { field: t("fullName") }), minLength: { value: 2, message: t("nameMin") } })}
            className="w-full rounded-xl border border-line bg-background px-4 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="mb-1 block text-sm font-medium text-ink"
          >
            {t("email")}
          </label>
          <input
            id="email"
            type="email"
            placeholder={t("emailPlaceholder")}
            {...register("email", {
              required: t("requiredField", { field: t("email") }),
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: t("validEmail"),
              },
            })}
            className="w-full rounded-xl border border-line bg-background px-4 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label
            htmlFor="phone"
            className="mb-1 block text-sm font-medium text-ink"
          >
            {t("phone")}
          </label>
          <input
            id="phone"
            type="tel"
            placeholder={t("phonePlaceholder")}
            {...register("phone", {
              required: t("requiredField", { field: t("phone") }),
              minLength: { value: 7, message: t("validPhone") },
            })}
            className="w-full rounded-xl border border-line bg-background px-4 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          {errors.phone && (
            <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>
          )}
        </div>

        {/* Address */}
        <div className="sm:col-span-2">
          <label
            htmlFor="address"
            className="mb-1 block text-sm font-medium text-ink"
          >
            {t("address")}
          </label>
          <input
            id="address"
            type="text"
            placeholder={t("addressPlaceholder")}
            {...register("address", {
              required: t("requiredField", { field: t("address") }),
              minLength: { value: 5, message: t("addressMin") },
            })}
            className="w-full rounded-xl border border-line bg-background px-4 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          {errors.address && (
            <p className="mt-1 text-xs text-red-600">{errors.address.message}</p>
          )}
        </div>

        {/* City */}
        <div>
          <label
            htmlFor="city"
            className="mb-1 block text-sm font-medium text-ink"
          >
            {t("city")}
          </label>
          <input
            id="city"
            type="text"
            placeholder={t("cityPlaceholder")}
            {...register("city", { required: t("requiredField", { field: t("city") }) })}
            className="w-full rounded-xl border border-line bg-background px-4 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          {errors.city && (
            <p className="mt-1 text-xs text-red-600">{errors.city.message}</p>
          )}
        </div>

        {/* Postal Code */}
        <div>
          <label
            htmlFor="postalCode"
            className="mb-1 block text-sm font-medium text-ink"
          >
            {t("postalCode")}
          </label>
          <input
            id="postalCode"
            type="text"
            placeholder={t("postalCodePlaceholder")}
            {...register("postalCode", { required: t("requiredField", { field: t("postalCode") }) })}
            className="w-full rounded-xl border border-line bg-background px-4 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          {errors.postalCode && (
            <p className="mt-1 text-xs text-red-600">{errors.postalCode.message}</p>
          )}
        </div>
      </div>
    </div>
  );
}
