export default function CustomerInformation({ register, errors }) {
  return (
    <div className="rounded-2xl border border-line bg-white p-6 shadow-sm">
      <h2 className="text-lg font-bold tracking-tight text-ink">
        Customer Information
      </h2>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Full Name */}
        <div>
          <label
            htmlFor="name"
            className="mb-1 block text-sm font-medium text-ink"
          >
            Full Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="John Doe"
            {...register("name", { required: "Full Name is required", minLength: { value: 2, message: "Name must be at least 2 characters" } })}
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
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="john@example.com"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email address",
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
            Phone
          </label>
          <input
            id="phone"
            type="tel"
            placeholder="+1 555 123 4567"
            {...register("phone", {
              required: "Phone is required",
              minLength: { value: 7, message: "Enter a valid phone number" },
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
            Address
          </label>
          <input
            id="address"
            type="text"
            placeholder="123 Main Street"
            {...register("address", {
              required: "Address is required",
              minLength: { value: 5, message: "Address must be at least 5 characters" },
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
            City
          </label>
          <input
            id="city"
            type="text"
            placeholder="New York"
            {...register("city", { required: "City is required" })}
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
            Postal Code
          </label>
          <input
            id="postalCode"
            type="text"
            placeholder="10001"
            {...register("postalCode", { required: "Postal Code is required" })}
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
