"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Logo } from "../logo/logo";
import Button from "@mui/material/Button";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/catalog", label: "Catalog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/chat", label: "AI Assistant" },
];

export function Navigation() {
  const pathname = usePathname();
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const token = localStorage.getItem("trust_token");
  useEffect(() => {
    setIsAuthenticated(!!token);
  }, [token]);

  if (!isAuthenticated) return null;

  return (
    <nav className="backdrop-blur bg-white/60 border-b border-[#d7c4a3] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex-shrink-0">
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-trusthub-beige ${
                  pathname === item.href
                    ? "text-trusthub-black border-b-2 border-[#d7c4a3]"
                    : "text-gray-600"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Button
              variant="outlined"
              size="small"
              sx={{
                borderColor: "#d7c4a3",
                color: "#000000",
                backgroundColor: "transparent",
                textTransform: "none",
                fontWeight: "500",
                "&:hover": {
                  backgroundColor: "#D7C4A3",
                  borderColor: "#D7C4A3",
                },
              }}
              onClick={() => {
                localStorage.removeItem("trust_token");
                setIsAuthenticated(false);
                router.push('/login')
              }}
            >
              Logout
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="text"
              size="small"
              onClick={() => setIsOpen(!isOpen)}
              sx={{
                minWidth: "auto",
                padding: "6px",
                color: "#000000",
                "&:hover": {
                  backgroundColor: "rgba(215, 196, 163, 0.3)",
                },
              }}
            >
              {isOpen ? (
                <XMarkIcon className="h-5 w-5" />
              ) : (
                <Bars3Icon className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-[#d7c4a3]">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium px-2 py-1 rounded transition-colors ${
                    pathname === item.href
                      ? "text-trusthub-black bg-trusthub-off-white"
                      : "text-gray-600 hover:text-trusthub-black"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Button
                variant="outlined"
                size="small"
                sx={{
                  borderColor: "#D7C4A3",
                  color: "#000000",
                  backgroundColor: "transparent",
                  textTransform: "none",
                  fontWeight: "500",
                  width: "fit-content",
                  "&:hover": {
                    backgroundColor: "#D7C4A3",
                    borderColor: "#D7C4A3",
                  },
                }}
                onClick={() => {
                  localStorage.removeItem("trust_token");
                  setIsAuthenticated(false);
                  setIsOpen(false);
                  // редирект при необходимости
                }}
              >
                Logout
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
