"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Logo } from "../logo/logo";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Bars3Icon, XMarkIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";



// Поддерживаемые языки
const locales = [
  { code: "en", label: "English" },
  { code: "ru", label: "Русский" },
  { code: "tj", label: "Тоҷикӣ" },
];

export function Navigation() {
  const pathname = usePathname();
  const router = useRouter();

  const t = useTranslations("navigation")


  const navItems = [
  { href: "/", label: t("home") },
  { href: "/catalog", label: t("catalog") },
  { href: "/about", label:t("about") },
  { href: "/contact", label: t("contact") },
  { href: "/chat", label: t("ai") },
];

  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Меню профиля
  const [anchorElProfile, setAnchorElProfile] = useState<null | HTMLElement>(null);
  const openProfileMenu = Boolean(anchorElProfile);

  // Меню языков
  const [anchorElLang, setAnchorElLang] = useState<null | HTMLElement>(null);
  const openLangMenu = Boolean(anchorElLang);

  useEffect(() => {
    const storedToken = localStorage.getItem("trust_token");
    setIsAuthenticated(!!storedToken);
  }, []);

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElProfile(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorElProfile(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("trust_token");
    setIsAuthenticated(false);
    handleMenuClose();
    router.push("/login");
  };

  const handleProfile = () => {
    router.push("/profile");
    handleMenuClose();
  };

  // Языковое меню
  const handleLangClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElLang(event.currentTarget);
  };

  const handleLangClose = () => {
    setAnchorElLang(null);
  };

  const handleChangeLocale = (localeCode: string) => {
    setAnchorElLang(null);
    // Перейти на страницу с выбранным языком
    // Предполагается, что у вас маршруты с локалями: /en, /ru, /tj и т.д.
    const segments = pathname.split("/");
    if (locales.some((l) => l.code === segments[1])) {
      segments[1] = localeCode; // заменить текущий locale
    } else {
      segments.splice(1, 0, localeCode); // добавить locale
    }
    const newPathname = segments.join("/") || "/";
    router.push(newPathname);
  };

  // Определим текущий язык из URL (примерно)
  const currentLocale = (() => {
    const segments = pathname.split("/");
    return locales.find((l) => l.code === segments[1])?.code || "en";
  })();

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

            {isAuthenticated ? (
              <>
                <Button
                  aria-controls={openProfileMenu ? "profile-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={openProfileMenu ? "true" : undefined}
                  onClick={handleProfileClick}
                  sx={{
                    minWidth: "auto",
                    padding: 0,
                    color: "#000000",
                    "&:hover": { backgroundColor: "rgba(215, 196, 163, 0.3)" },
                  }}
                >
                  <UserCircleIcon className="h-8 w-8" />
                </Button>

                <Menu
                  id="profile-menu"
                  anchorEl={anchorElProfile}
                  open={openProfileMenu}
                  onClose={handleMenuClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  <MenuItem onClick={handleProfile}>Profile</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
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
                onClick={() => router.push("/login")}
              >
                {t("login")}
              </Button>
            )}

            {/* Language selector */}
            <div>
              <Button
                aria-controls={openLangMenu ? "lang-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openLangMenu ? "true" : undefined}
                onClick={handleLangClick}
                sx={{
                  minWidth: "auto",
                  padding: "1px 12px",
                  color: "#000000",
                  textTransform: "none",
                  fontWeight: "500",
                  borderColor: "#d7c4a3",
                  border: "1px solid",
                  backgroundColor: "transparent",
                  marginLeft: "8px",
                  "&:hover": {
                    backgroundColor: "#D7C4A3",
                    borderColor: "#D7C4A3",
                  },
                }}
              >
                {locales.find((l) => l.code === currentLocale)?.label || "EN"}
              </Button>
              <Menu
                id="lang-menu"
                anchorEl={anchorElLang}
                open={openLangMenu}
                onClose={handleLangClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                {locales.map(({ code, label }) => (
                  <MenuItem
                    key={code}
                    selected={code === currentLocale}
                    onClick={() => handleChangeLocale(code)}
                  >
                    {label}
                  </MenuItem>
                ))}
              </Menu>
            </div>
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

              {isAuthenticated ? (
                <>
                  <Button
                    variant="text"
                    sx={{
                      justifyContent: "flex-start",
                      color: "#000000",
                      textTransform: "none",
                      fontWeight: "500",
                    }}
                    onClick={() => {
                      router.push("/profile");
                      setIsOpen(false);
                    }}
                  >
                    Profile
                  </Button>
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
                      handleLogout();
                      setIsOpen(false);
                    }}
                  >
                    Logout
                  </Button>
                </>
              ) : (
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
                    router.push("/login");
                    setIsOpen(false);
                  }}
                >
                  Login
                </Button>
              )}

              {/* Mobile language selector */}
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
                  marginTop: "8px",
                  "&:hover": {
                    backgroundColor: "#D7C4A3",
                    borderColor: "#D7C4A3",
                  },
                }}
                onClick={handleLangClick}
              >
                {locales.find((l) => l.code === currentLocale)?.label || "EN"}
              </Button>

              <Menu
                id="lang-menu-mobile"
                anchorEl={anchorElLang}
                open={openLangMenu}
                onClose={handleLangClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                {locales.map(({ code, label }) => (
                  <MenuItem
                    key={code}
                    selected={code === currentLocale}
                    onClick={() => {
                      handleChangeLocale(code);
                      setIsOpen(false);
                    }}
                  >
                    {label}
                  </MenuItem>
                ))}
              </Menu>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
