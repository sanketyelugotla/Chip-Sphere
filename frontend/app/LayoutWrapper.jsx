"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { UserProvider } from "@/context/userContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
                <ToastContainer />
                {/* {!hideNavbar && <Footer />} */}
            </UserProvider>
        </>
    );
}
