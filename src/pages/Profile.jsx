import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  User,
  Mail,
  LogOut,
  ShieldCheck,
  Pencil,
  Check,
  X,
  Package,
  Heart,
  ShoppingCart,
  CheckCircle2,
} from "lucide-react";
import Container from "../components/layout/Container";
import useAuth from "../hooks/useAuth";
import useWishlist from "../hooks/useWishlist";
import useCartStore from "../store/cartStore";
import { loadOrders } from "../utils/orderUtils";
import { useToast } from "../components/ui/Toast";

// Helper: get initials from a name ("John Doe" → "JD")
function getInitials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0].toUpperCase())
    .slice(0, 2)
    .join("");
}

function StatCard({ icon: Icon, label, value, to }) {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      onClick={() => navigate(to)}
      className="flex flex-col items-center rounded-2xl border border-line bg-white p-5 text-center shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-light text-primary">
        <Icon size={22} />
      </span>
      <p className="mt-3 text-2xl font-bold text-ink">{value}</p>
      <p className="mt-0.5 text-sm text-muted">{label}</p>
    </button>
  );
}

export default function Profile() {
const { currentUser, logout, updateProfile } = useAuth();
  const { wishlistIds } = useWishlist();
  const cartItems = useCartStore((s) => s.items);
  const navigate = useNavigate();
  const { showToast } = useToast();

  const orders = currentUser
    ? loadOrders().filter((o) => o.userId === currentUser.id)
    : [];

const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: { name: currentUser?.name || "" },
  });

  // Safety: this page is protected, but guard against a missing user anyway.
  if (!currentUser) {
    return null;
  }

  const handleStartEdit = () => {
    reset({ name: currentUser.name });
    setMessage("");
    setIsEditing(true);
  };

const onSave = (data) => {
    const result = updateProfile(data.name);
    if (result && result.error) {
      setMessage(result.error);
      return;
    }
    setIsEditing(false);
    setMessage("Profile updated successfully.");
    showToast("Your profile has been updated.");
    // Clear the success message after a short delay.
    setTimeout(() => setMessage(""), 3000);
  };

  const handleLogout = () => {
    logout();
    showToast("You have been logged out.");
    navigate("/login", { replace: true });
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <section className="py-12 sm:py-16">
      <Container className="max-w-3xl">
        {/* Header / Profile card */}
        <div className="rounded-3xl border border-line bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
            {/* Avatar with initials */}
            <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-primary text-2xl font-bold text-white">
              {getInitials(currentUser.name)}
            </span>
            <div className="text-center sm:text-left">
              <h1 className="text-2xl font-bold tracking-tight text-ink">
                {currentUser.name}
              </h1>
              <p className="mt-1 text-muted">{currentUser.email}</p>
              <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                <ShieldCheck size={13} />
                Active
              </span>
            </div>
          </div>

          {/* Success message */}
          {message && (
            <div className="mt-6 flex items-center gap-2 rounded-xl bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
              <CheckCircle2 size={18} />
              {message}
            </div>
          )}
        </div>

        {/* Personal Information */}
        <div className="mt-6 rounded-3xl border border-line bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-ink">
              Personal Information
            </h2>
            {!isEditing && (
              <button
                type="button"
                onClick={handleStartEdit}
                className="inline-flex items-center gap-2 rounded-xl border border-line px-4 py-2 text-sm font-semibold text-ink transition-colors hover:border-primary hover:text-primary"
              >
                <Pencil size={15} />
                Edit Profile
              </button>
            )}
          </div>

          {isEditing ? (
            <form onSubmit={handleSubmit(onSave)} noValidate className="mt-6 space-y-4">
              {/* Name */}
              <div>
                <label
                  htmlFor="profile-name"
                  className="block text-sm font-medium text-ink"
                >
                  Full Name
                </label>
                <input
                  id="profile-name"
                  type="text"
                  {...register("name", {
                    required: "Name is required.",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters.",
                    },
                  })}
                  className="mt-1.5 w-full rounded-xl border border-line bg-background px-4 py-3 text-sm text-ink outline-none transition-colors placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
                {errors.name && (
                  <p className="mt-1.5 text-sm text-red-600">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email (read-only) */}
              <div>
                <label
                  htmlFor="profile-email"
                  className="block text-sm font-medium text-ink"
                >
                  Email
                </label>
                <input
                  id="profile-email"
                  type="email"
                  value={currentUser.email}
                  readOnly
                  className="mt-1.5 w-full cursor-not-allowed rounded-xl border border-line bg-gray-100 px-4 py-3 text-sm text-muted"
                />
                <p className="mt-1 text-xs text-muted">
                  Email cannot be changed in this version.
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
                >
                  <Check size={16} />
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => {
                    reset({ name: currentUser.name });
                    setMessage("");
                    setIsEditing(false);
                  }}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-line px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                >
                  <X size={16} />
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-4 rounded-2xl border border-line bg-background p-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary">
                  <User size={20} />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted">
                    Full Name
                  </p>
                  <p className="truncate text-base font-semibold text-ink">
                    {currentUser.name}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-2xl border border-line bg-background p-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary">
                  <Mail size={20} />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted">
                    Email
                  </p>
                  <p className="truncate text-base font-semibold text-ink">
                    {currentUser.email}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Statistics */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-ink">Your Activity</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <StatCard
              icon={Package}
              label="Total Orders"
              value={orders.length}
              to="/orders"
            />
            <StatCard
              icon={Heart}
              label="Wishlist Items"
              value={wishlistIds.length}
              to="/wishlist"
            />
            <StatCard
              icon={ShoppingCart}
              label="Cart Items"
              value={cartCount}
              to="/cart"
            />
          </div>
        </div>

        {/* Logout */}
        <button
          type="button"
          onClick={handleLogout}
          className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-line bg-white px-6 py-3 text-sm font-semibold text-red-600 transition-colors hover:border-red-200 hover:bg-red-50"
        >
          <LogOut size={18} />
          Logout
        </button>
      </Container>
    </section>
  );
}
