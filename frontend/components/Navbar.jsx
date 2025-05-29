"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Menu, User, LogOut } from "lucide-react"
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md"


import { Button } from "@/components/ui/button"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

// 🔁 Replace this with your auth logic
const useAuth = () => ({
  user: null, // or mock: { email: "user@example.com", displayName: "John Doe" }
  signOut: async () => console.log("Signed out"),
})

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

  const [loginOpen, setLoginOpen] = useState(false);

  const [isScrolled, setIsScrolled] = useState(false)
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light")
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
    router.push("/auth/login")
  }

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-200 ${isScrolled ? "bg-background/80 backdrop-blur-md border-b shadow-sm" : "bg-transparent"}`}>
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <img src="/ChipSphere.png" alt="logo" className="h-10 w-10 rounded-full" />
          <span className="font-bold text-xl hidden sm:inline-block">Chip Sphere</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${pathname === link.href ? "text-primary" : "text-muted-foreground"}`}
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <Button className='cursor-pointer' variant="ghost" size="icon" onClick={() => setDark(!dark)} aria-label="Toggle Theme">
            {dark ? <MdOutlineLightMode className="h-5 w-5" /> : <MdDarkMode className="h-5 w-5" />}
          </Button>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0 rounded-full">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <div className="flex items-center gap-2 p-2">
                  <div className="flex flex-col">
                    <p className="font-medium">{user.displayName || "User"}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden sm:flex items-center space-x-2">
              <Button variant="ghost" size="sm" asChild onClick={() => { setLoginOpen(true) }}>
                Log in
              </Button>
              <Button size="sm" asChild>
                Sign up
              </Button>
            </div>
          )}

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="grid gap-6 py-6">
                <div className="space-y-3">
                  {navLinks.map((link) => (
                    <NavLink
                      key={link.name}
                      href={link.href}
                      className={`block text-lg font-medium transition-colors hover:text-primary ${pathname === link.href ? "text-primary" : "text-muted-foreground"}`}
                    >
                      {link.name}
                    </NavLink>
                  ))}
                </div>
                {!user && (
                  <div className="space-y-2">
                    <Button className="w-full" asChild>
                      <Link href="/auth/signup">Sign up</Link>
                    </Button>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/auth/login">Log in</Link>
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
