"use client"

import Cookies from "js-cookie"
import { LogOut, Menu, User } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useUser } from "@/context/userContext"

const useAuth = () => {
  const { user, setUser } = useUser();

  const signOut = () => {
    Cookies.remove("token");
    setUser(null);
  };

  return { user, signOut };
};


const NavLink = ({ href, children }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`hover:text-blue-500 transition-colors duration-200 ${isActive ? 'text-blue-500' : ''}`}
    >
      {children}
    </Link>
  );
};

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, signOut } = useAuth();

  const [isScrolled, setIsScrolled] = useState(false)
  const [dark, setDark] = useState(false)

  // Detect scrolling to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) {
      setDark(savedTheme === "dark")
    }
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light")
    localStorage.setItem("theme", dark ? "dark" : "light")
  }, [dark])

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Quizzes", href: "/quizzes" },
    { name: "Resources", href: "/resources" },
    { name: "Blogs", href: "/blogs" },
    { name: "Projects", href: "/projects" },
    { name: "About", href: "/about" },
  ]

  const handleLogout = async () => {
    await signOut()
    router.push("/")
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${isScrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-transparent"
        }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-[4rem] ">
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-12 w-12 rounded-full flex items-center justify-center">
              <img src="/ChipSphere.png" alt="logo" className="h-12 w-12 rounded-full" />
            </div>
            <span className="font-bold text-xl hidden sm:inline-block">Chip Sphere</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              prefetch={true}
              className={`text-[0.875rem] font-bold transition-colors hover:text-primary ${pathname === link.href ? "text-primary" : "text-muted-foreground"
                }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          {/* <ThemeToggle /> */}
          <Button className='cursor-pointer' variant="ghost" size="icon" onClick={() => setDark(!dark)} aria-label="Toggle Theme">
            {dark ? <MdOutlineLightMode className="h-5 w-5" /> : <MdDarkMode className="h-5 w-5" />}
          </Button>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full cursor-pointer">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-background border-2 border-border" align="end">
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-semibold text-foreground">{user.name || "User"}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer" onClick={() => router.push(`/profile/${user.name}`)}>
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600 cursor-pointer" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" /> Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden sm:flex items-center space-x-2">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/auth?mode=login">Log in</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/auth?mode=signup">Sign up</Link>
              </Button>
            </div>
          )}

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open Menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="grid gap-6 py-6">
                <div className="space-y-3">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      prefetch={true}
                      className={`block text-lg font-medium transition-colors hover:text-primary ${pathname === link.href ? "text-primary" : "text-muted-foreground"
                        }`}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
                {!user && (
                  <div className="space-y-2">
                    <Button className="w-full" asChild>
                      <Link href="/auth?mode=signup">Sign up</Link>
                    </Button>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/auth?mode=login">Log in</Link>
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

