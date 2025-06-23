'use client'

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"

import { signin } from '@/utils/auth'

export default function LoginForm({ toggleAuthMode }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [captchaText, setCaptchaText] = useState("")
    const [captchaInput, setCaptchaInput] = useState("")
    const [rememberMe, setRememberMe] = useState(false)

    const router = useRouter()

    useEffect(() => {
        setCaptchaText(generateCaptcha())
    }, [])

    function generateCaptcha() {
        return Math.random().toString(36).substring(2, 6).toUpperCase()
    }

    function refreshCaptcha() {
        setCaptchaText(generateCaptcha())
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setError("")
        setIsLoading(true)

        if (captchaInput.trim().toUpperCase() !== captchaText.trim().toUpperCase()) {
            setError("Captcha doesn't match. Try again.")
            setIsLoading(false)
            refreshCaptcha()
            return
        }

        try {
            const response = await signin(email, password)

            if (response?.data?.token) {
                // Store token in cookies
                Cookies.set('token', response.data.token, {
                    expires: rememberMe ? 7 : undefined, // 7 days if rememberMe is checked
                    secure: true,
                    sameSite: 'Lax',
                })

                router.push("/")
            } else {
                setError("Invalid response. Please try again.")
            }
        } catch (err) {
            setError(err?.response?.data?.message || "Login failed. Please check your credentials.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Card className="shadow-lg rounded-2xl bg-white border border-gray-300 hover:border-[#4AC9D6] transition-all duration-300">
            <Link href="/" passHref>
                <div className="mx-auto w-36 cursor-pointer transition-all duration-500 transform hover:scale-105 hover:animate-pulse">
                    <Image
                        src="/ChipSphere.png"
                        alt="logo"
                        width={128}
                        height={128}
                        priority={true}
                        className="w-full h-auto"
                    />
                </div>
            </Link>

            <CardHeader className="text-center pt-6">
                <CardTitle className="text-3xl font-extrabold text-gray-800">Time to Plug In!</CardTitle>
                <CardDescription className="text-gray-500">Chipsphere: Powering Circuit Minds Everywhere.</CardDescription>
            </CardHeader>

            <CardContent>
                {error && (
                    <Alert variant="destructive" className="mb-4">
                        <AlertCircle className="h-4 w-4 text-red-600" />
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm text-gray-600">Your Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="Type your mail here"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password" className="text-sm text-gray-600">Password</Label>
                            <Link href="/auth/Forgetpassword" className="text-sm text-[#4AC9D6] hover:underline">
                                Forgot password?
                            </Link>
                        </div>
                        <div className="relative">
                            <Input
                                id="password"
                                type={passwordVisible ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="Shh… It's a secret!"
                            />
                            <div
                                className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                                onClick={() => setPasswordVisible(!passwordVisible)}
                            >
                                {passwordVisible ? (
                                    <EyeOff className="h-4 w-5 text-gray-500" />
                                ) : (
                                    <Eye className="h-4 w-5 text-gray-500" />
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="captcha" className="text-sm text-gray-600">Captcha:</Label>
                        <div className="flex items-center gap-4">
                            <Button type="button" variant="ghost" size="icon" onClick={refreshCaptcha}>
                                <img src="/reloadicon.png" alt="Refresh Captcha" className="h-6 w-6" />
                            </Button>
                            <div className="flex h-10 w-24 items-center justify-center rounded-md bg-muted font-mono text-lg font-bold tracking-widest">
                                {captchaText}
                            </div>
                            <Input
                                id="captcha"
                                type="text"
                                value={captchaInput}
                                onChange={(e) => setCaptchaInput(e.target.value)}
                                placeholder="Enter captcha"
                                required
                                className="w-full max-w-[200px] ml-3"
                            />
                        </div>
                    </div>

                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            id="rememberMe"
                            checked={rememberMe}
                            onChange={() => setRememberMe(!rememberMe)}
                            className="h-4 w-4"
                        />
                        <Label htmlFor="rememberMe" className="text-sm text-gray-600">Remember me</Label>
                    </div>

                    <Button
                        type="submit"
                        className="w-full rounded-md bg-[#307179] text-white hover:bg-[#374d50]"
                        disabled={isLoading}
                    >
                        {isLoading ? "Logging you in..." : "Login (Let's dive into Chipsphere!)"}
                    </Button>
                </form>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4">
                <div className="text-center text-sm text-gray-500">
                    Don&apos;t have an account?{" "}
                    <button
                        onClick={toggleAuthMode}
                        className="text-[#374d50] hover:underline font-medium"
                    >
                        Sign up (We won't bite!)
                    </button>
                </div>
            </CardFooter>
        </Card>
    )
}
