"use client";

import { Toaster } from "sonner";
import { useUser } from "@/context/userContext";

export default function ToastWithTheme() {
    const { dark } = useUser();

    return (
        <Toaster
            theme={dark ? "dark" : "light"}
            position="top-right"
            toastOptions={{
                style: {
                    background: dark ? "#020817" : "#ffffff",
                    color: dark ? "#ffffff" : "#000000",
                    border: dark ? "1px solid #1e293b" : "1px solid #e2e8f0"
                }
            }}
        />
    );
}