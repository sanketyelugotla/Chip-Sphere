"use client"

import { userDetails } from "@/utils/auth"
import Cookies from "js-cookie"
import { createContext, useContext, useEffect, useState } from "react"

const UserContext = createContext()

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const fetchUser = async () => {
        const token = Cookies.get("token");
        if (!token) return;

        const res = await userDetails(token);

        if (res.data.success = true) {
            setUser(res.data.user);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);


    const refreshUser = () => {
        fetchUser();
    }

    return (
        <UserContext.Provider value={{ user, refreshUser, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext)
