import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import Image from "next/image"
import { signin } from '@/utils/auth'

export default function LoginForm({ toggleAuthMode }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [captchaText, setCaptchaText] = useState()
    const [captchaInput, setCaptchaInput] = useState("")
    const [rememberMe, setRememberMe] = useState(false)

    useEffect(() => {
        setCaptchaText(generateCaptcha())
    }, [])

    function generateCaptcha() {
        return Math.random().toString(36).substring(2, 6).toUpperCase()
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const response = await signin(email, password);
        console.log(response);
    }

    function refreshCaptcha() {
        setCaptchaText(generateCaptcha())
    }

    return (
        <Card className="shadow-lg rounded-2xl bg-container-background border border-border hover:border-[#4AC9D6] transition-all duration-300">
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
                <CardTitle className="text-3xl font-extrabold">Time to Plug In!</CardTitle>
                <CardDescription className="text-sm text-muted-foreground font-medium">Chipsphere: Powering Circuit Minds Everywhere.</CardDescription>
            </CardHeader>

            <CardContent>
                {error && (
                    <Alert variant="destructive" className="mb-4">
                        <AlertCircle className="h-4 w-4 text-red-600" />
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email Input */}
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm text-muted-foreground font-medium">Your Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="Type your mail here"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full rounded-md bg-backgroud border-2 border-border placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#4AC9D6] transition-all"
                        />
                    </div>

                    {/* Password Input */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password" className="text-sm text-muted-foreground font-medium">Password</Label>
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
                                className="w-full rounded-md bg-backgroud border-2 border-border placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4AC9D6] transition-all"
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

                    {/* Captcha Input */}
                    <div className="space-y-2">
                        <Label htmlFor="captcha" className="text-sm text-muted-foreground font-medium">Captcha:</Label>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center justify-center">
                                <Button type="button" variant="ghost" size="icon" onClick={refreshCaptcha}>
                                    <img src="/reloadicon.png" alt="Refresh Captcha" className="h-6 w-6" />
                                    <span className="sr-only">Refresh Captcha</span>
                                </Button>
                            </div>

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
                                className="w-full max-w-[200px] ml-3 rounded-md bg-backgroud border-2 border-border placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4AC9D6] transition-all"
                            />
                        </div>
                    </div>

                    {/* Remember Me Checkbox */}
                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            id="rememberMe"
                            checked={rememberMe}
                            onChange={() => setRememberMe(!rememberMe)}
                            className="h-4 w-4 text-[#4AC9D6] border-gray-300 rounded focus:ring-2 focus:ring-[#4AC9D6]"
                        />
                        <Label htmlFor="rememberMe" className="text-sm text-muted-foreground font-medium">Remember me</Label>
                    </div>

                    {/* Login Button */}
                    <Button
                        type="submit"
                        className="w-full cursor-pointer rounded-md bg-[#307179] text-white hover:bg-[#374d50] transition-all  hover:shadow-lg"
                        disabled={isLoading}
                    >
                        {isLoading ? "Logging you in..." : "Login (Let's dive into Chipsphere!)"}
                    </Button>
                </form>

                {/* Divider */}
                <div className="relative mt-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300 opacity-30"></div>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase text-gray-500">
                        <span className="bg-white px-2 text-gray-400"></span>
                    </div>
                </div>
            </CardContent>

            {/* Footer */}
            <CardFooter className="flex flex-col space-y-4">
                <div className="text-center text-sm text-muted-foreground font-medium">
                    Don't have an account?{" "}
                    <button
                        onClick={toggleAuthMode}
                        className="text-[#374d50] hover:underline font-semibold"
                    >
                        Sign up (We won't bite!)
                    </button>
                </div>
            </CardFooter>
        </Card>
    )
}