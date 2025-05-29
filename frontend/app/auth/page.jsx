'use client'

import { AnimatePresence, motion } from "framer-motion"
import Link from "next/link"
import { useState } from "react"
import LoginForm from "./LoginForm"
import SignupForm from "./SignupForm"

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true)

    const toggleAuthMode = () => {
        setIsLogin(!isLogin)
    }

    return (
        <div className="min-h-[90vh] flex items-center justify-center px-4 py-12">
            <div className="flex justify-between items-center">
                {/* Logo - Animated */}
                {/* <motion.div
                    initial={{ x: 0 }}
                    animate={{ x: isLogin ? 0 : 'calc(100% - 12rem)' }}
                    transition={{ type: 'spring', stiffness: 100, damping: 15 }}
                    className="w-48 flex-shrink-0"
                >
                    <Link href="/">
                        <motion.img
                            src="/ChipSphere.png"
                            alt="logo"
                            className="w-full cursor-pointer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        />
                    </Link>
                </motion.div> */}

                {/* Forms Container */}
                <div className="w-full max-w-md relative flex justify-between items-center ml-10">
                    <AnimatePresence mode="wait">
                        {isLogin ? (
                            <motion.div
                                key="login"
                                initial={{ opacity: 0, x: 100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -100 }}
                                transition={{ duration: 0.3 }}
                            >
                                <LoginForm toggleAuthMode={toggleAuthMode} />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="signup"
                                initial={{ opacity: 0, x: -100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 100 }}
                                transition={{ duration: 0.3 }}
                            >
                                <SignupForm toggleAuthMode={toggleAuthMode} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}