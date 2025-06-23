"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { UserProvider } from "@/context/userContext";

export default function LayoutWrapper({ children }) {
    const pathname = usePathname();
    const hideNavbar = ["/auth"].includes(pathname);

    return (
        <>
            <UserProvider>
                {/* {!hideNavbar && <Navbar />} */}
                <Navbar />
                {children}
                <Footer />
                {/* {!hideNavbar && <Footer />} */}
            </UserProvider>
        </>
    );
}
