"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LayoutWrapper({ children }) {
    const pathname = usePathname();
    const hideNavbar = ["/auth"].includes(pathname);

    return (
        <>
            {/* {!hideNavbar && <Navbar />} */}
            <Navbar />
            {children}
            <Footer />
            {/* {!hideNavbar && <Footer />} */}
        </>
    );
}
