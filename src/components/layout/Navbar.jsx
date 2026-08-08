import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Search,
  Heart,
  ShoppingCart,
  User,
  LogOut,
  Package,
  UserCircle,
} from "lucide-react";
import Container from "./Container";
import useWishlist from "../../hooks/useWishlist";
import useCartStore from "../../store/cartStore";
import useAuth from "../../hooks/useAuth";
import { useToast } from "../ui/Toast";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/categories", label: "Categories" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { wishlistIds } = useWishlist();
  const wishlistCount = wishlistIds.length;
  const cartItems = useCartStore((s) => s.items);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const { currentUser, isAuthenticated, logout } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const closeMenu = () => setIsOpen(false);

  const handleLogout = () => {
    logout();
    closeMenu();
    showToast("You have been logged out.");
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-line bg-surface/95 backdrop-blur">
      <Container>
        <nav className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2" onClick={closeMenu}>
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white">
              <ShoppingCart size={18} />
            </span>
            <span className="text-xl font-bold tracking-tight text-ink">
              ShopAbdalrhman
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end
                className={({ isActive }) =>
                  `rounded-lg px-4 py-2 text-sm font-medium transition-colors hover:text-primary ${
                    isActive ? "text-primary" : "text-muted"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Desktop actions */}
          <div className="hidden items-center gap-1 md:flex">
            <button
              type="button"
              aria-label="Search"
              className="rounded-lg p-2 text-muted transition-colors hover:bg-primary-light hover:text-primary"
            >
              <Search size={20} />
            </button>
            <Link
              to="/wishlist"
              aria-label="Wishlist"
              className="relative rounded-lg p-2 text-muted transition-colors hover:bg-primary-light hover:text-primary"
            >
              <Heart size={20} />
              {wishlistCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-white">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <Link
              to="/cart"
              aria-label="Cart"
              className="relative rounded-lg p-2 text-muted transition-colors hover:bg-primary-light hover:text-primary"
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </Link>
{isAuthenticated ? (
              <div className="ml-2 flex items-center gap-1 rounded-lg border border-line bg-white p-1">
                <Link
                  to="/profile"
                  onClick={closeMenu}
                  className="flex items-center gap-1.5 rounded-md px-2 py-1.5 text-sm font-semibold text-ink transition-colors hover:bg-primary-light hover:text-primary"
                >
                  <User size={16} className="text-primary" />
                  <span className="max-w-[100px] truncate">
                    Hi, {currentUser.name.split(" ")[0]}
                  </span>
                </Link>
                <Link
                  to="/orders"
                  onClick={closeMenu}
                  aria-label="Orders"
                  title="Orders"
                  className="flex h-8 w-8 items-center justify-center rounded-md text-muted transition-colors hover:bg-primary-light hover:text-primary"
                >
                  <Package size={16} />
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  aria-label="Logout"
                  title="Logout"
                  className="flex h-8 w-8 items-center justify-center rounded-md text-muted transition-colors hover:bg-red-50 hover:text-red-600"
                >
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="ml-2 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
              >
                <User size={16} />
                Login
              </Link>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setIsOpen((prev) => !prev)}
            className="rounded-lg p-2 text-muted transition-colors hover:bg-primary-light hover:text-primary md:hidden"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </Container>

      {/* Mobile menu */}
      {isOpen && (
        <div className="border-t border-line bg-surface md:hidden">
          <Container className="py-4">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-primary-light text-primary"
                        : "text-muted hover:bg-gray-100"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>

            <div className="mt-3 flex items-center gap-2 border-t border-line pt-4">
              <Link
                to="/wishlist"
                onClick={closeMenu}
                className="relative flex flex-1 items-center justify-center gap-2 rounded-lg border border-line px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-gray-50"
              >
                <Heart size={16} /> Wishlist
                {wishlistCount > 0 && (
                  <span className="absolute right-3 top-1/2 flex h-4 min-w-4 -translate-y-1/2 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-white">
                    {wishlistCount}
                  </span>
                )}
              </Link>
              <Link
                to="/cart"
                onClick={closeMenu}
                className="relative flex flex-1 items-center justify-center gap-2 rounded-lg border border-line px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-gray-50"
              >
                <ShoppingCart size={16} /> Cart
                {cartCount > 0 && (
                  <span className="absolute right-3 top-1/2 flex h-4 min-w-4 -translate-y-1/2 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-white">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>

        {isAuthenticated ? (
              <div className="mt-3 rounded-lg border border-line bg-white p-2">
                <div className="flex items-center justify-between gap-2 px-2 py-2">
                  <div className="flex min-w-0 items-center gap-2">
                    <User size={18} className="shrink-0 text-primary" />
                    <span className="truncate text-sm font-semibold text-ink">
                      {currentUser.name}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-red-50 px-3 py-1.5 text-sm font-semibold text-red-600 transition-colors hover:bg-red-100"
                  >
                    <LogOut size={15} />
                    Logout
                  </button>
                </div>
                <div className="mt-1 grid grid-cols-2 gap-2 border-t border-line pt-2">
                  <Link
                    to="/profile"
                    onClick={closeMenu}
                    className="flex items-center justify-center gap-2 rounded-lg bg-primary-light px-3 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
                  >
                    <UserCircle size={16} />
                    Profile
                  </Link>
                  <Link
                    to="/orders"
                    onClick={closeMenu}
                    className="flex items-center justify-center gap-2 rounded-lg bg-primary-light px-3 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
                  >
                    <Package size={16} />
                    Orders
                  </Link>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={closeMenu}
                className="mt-3 flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
              >
                <User size={16} /> Login
              </Link>
            )}
          </Container>
        </div>
      )}
    </header>
  );
}
