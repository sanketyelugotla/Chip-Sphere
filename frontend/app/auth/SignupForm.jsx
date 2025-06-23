import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, Eye, EyeOff } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"
import { signup } from "@/utils/auth"

export default function SignupForm({ toggleAuthMode }) {
    const router = useRouter()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [education, setEducation] = useState("")
    const [institution, setInstitution] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [passwordValidations, setPasswordValidations] = useState({
        minLength: false,
        hasUppercase: false,
        hasSpecialChar: false,
    })
    const [passwordTouched, setPasswordTouched] = useState(false)
    const [agreeToTerms, setAgreeToTerms] = useState(false)

    const validatePassword = (password) => {
        const minLength = 8
        const hasUppercase = /[A-Z]/.test(password)
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

        setPasswordValidations({
            minLength: password.length >= minLength,
            hasUppercase: hasUppercase,
            hasSpecialChar: hasSpecialChar,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")

        if (!agreeToTerms) {
            setError("You must agree to the terms and conditions.")
            return
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.")
            return
        }

        const isPasswordStrong = Object.values(passwordValidations).every(Boolean)
        if (!isPasswordStrong) {
            setError("Password does not meet strength requirements.")
            return
        }

        setIsLoading(true)
        try {
            const response = await signup(name, email, education, institution, password, 'user')
            if (response?.data?.token) {
                Cookies.set("token", response.data.token, {
                    expires: 7,
                    secure: true,
                    sameSite: "Lax",
                })
                router.push("/")
            } else {
                setError("Signup failed. Please try again.")
            }
        } catch (err) {
            setError(err?.response?.data?.message || "Signup failed. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }
    
    return (
        <Card className="shadow-lg rounded-2xl bg-white border border-gray-300 hover:border-[#4AC9D6] transition-all duration-300">
            <Link href="/" passHref>
                <div className="mx-auto w-32 cursor-pointer transition-all duration-500 transform hover:scale-105 hover:animate-pulse">
                    <Image
                        src="/ChipSphere.png"
                        alt="logo"
                        width={128}
                        height={128}
                        className="w-full h-auto"
                    />
                </div>
            </Link>

            <CardHeader className="text-center pt-6">
                <CardTitle className="text-3xl font-extrabold text-gray-800">Join the ChipSphere!</CardTitle>
                <CardDescription className="text-gray-500">Give us your info, and we'll roll out the red carpet!</CardDescription>
            </CardHeader>

            <CardContent>
                {error && (
                    <Alert variant="destructive" className="mb-4">
                        <AlertCircle className="h-4 w-4 text-red-600" />
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name and Email */}
                    <div className="flex gap-4">
                        <div className="flex-1 space-y-2">
                            <Label htmlFor="name" className="text-sm text-gray-600">Your Name</Label>
                            <Input
                                id="name"
                                placeholder="Type your name here"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="w-full rounded-md bg-gray-50 text-gray-700 border-2 border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#4AC9D6] transition-all"
                            />
                        </div>
                        <div className="flex-1 space-y-2">
                            <Label htmlFor="email" className="text-sm text-gray-600">Your Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Type your mail here"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full rounded-md bg-gray-50 text-gray-700 border-2 border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#4AC9D6] transition-all"
                            />
                        </div>
                    </div>

                    {/* Education and Institution */}
                    <div className="flex gap-4">
                        <div className="flex-1 space-y-2">
                            <Label htmlFor="education" className="text-sm text-gray-600">Education Level</Label>
                            <Input
                                id="education"
                                placeholder="Your education level"
                                value={education}
                                onChange={(e) => setEducation(e.target.value)}
                                required
                                className="w-full rounded-md bg-gray-50 text-gray-700 border-2 border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#4AC9D6] transition-all"
                            />
                        </div>
                        <div className="flex-1 space-y-2">
                            <Label htmlFor="institution" className="text-sm text-gray-600">Institution</Label>
                            <Input
                                id="institution"
                                placeholder="Your institution name"
                                value={institution}
                                onChange={(e) => setInstitution(e.target.value)}
                                required
                                className="w-full rounded-md bg-gray-50 text-gray-700 border-2 border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#4AC9D6] transition-all"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-sm text-gray-600">Password</Label>
                        <div className="relative">
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value)
                                    setPasswordTouched(true)
                                    validatePassword(e.target.value)
                                }}
                                placeholder="Set your key here"
                                required
                                className="w-full rounded-md bg-gray-50 text-gray-700 border-2 border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4AC9D6] transition-all"
                            />
                            <div
                                className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <EyeOff className="h-4 w-5 text-gray-500" />
                                ) : (
                                    <Eye className="h-4 w-5 text-gray-500" />
                                )}
                            </div>
                        </div>
                        {passwordTouched && (
                            <div className="mt-2 text-xs text-gray-600">
                                <div className={`flex items-center ${passwordValidations.minLength ? "text-green-500" : "text-red-500"}`}>
                                    <span>• 8+ characters</span>
                                </div>
                                <div className={`flex items-center ${passwordValidations.hasUppercase ? "text-green-500" : "text-red-500"}`}>
                                    <span>• One uppercase letter</span>
                                </div>
                                <div className={`flex items-center ${passwordValidations.hasSpecialChar ? "text-green-500" : "text-red-500"}`}>
                                    <span>• One special character</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div className="space-y-2">
                        <Label htmlFor="confirm-password" className="text-sm text-gray-600">Confirm Password</Label>
                        <div className="relative">
                            <Input
                                id="confirm-password"
                                type={showConfirmPassword ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm your password"
                                required
                                className="w-full rounded-md bg-gray-50 text-gray-700 border-2 border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4AC9D6] transition-all"
                            />
                            <div
                                className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? (
                                    <EyeOff className="h-4 w-5 text-gray-500" />
                                ) : (
                                    <Eye className="h-4 w-5 text-gray-500" />
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Terms Agreement */}
                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            id="agreeToTerms"
                            checked={agreeToTerms}
                            onChange={() => setAgreeToTerms(!agreeToTerms)}
                            className="h-4 w-4 text-[#4AC9D6] border-gray-300 rounded focus:ring-2 focus:ring-[#4AC9D6]"
                        />
                        <Label htmlFor="agreeToTerms" className="text-sm text-gray-600">
                            I agree to the{" "}
                            <Link href="/terms" className="text-[#4AC9D6] hover:underline">
                                terms and conditions
                            </Link>
                        </Label>
                    </div>

                    {/* Sign Up Button */}
                    <Button
                        type="submit"
                        className="w-full cursor-pointer rounded-md bg-[#307179] text-white hover:bg-[#374d50] transition-all hover:shadow-lg"
                        disabled={isLoading}
                    >
                        {isLoading ? "Creating your account..." : "Create Account (Welcome to Chipsphere!)"}
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
                <div className="text-center text-sm text-gray-500">
                    Been here before?{" "}
                    <button
                        onClick={toggleAuthMode}
                        className="text-[#374d50] hover:underline font-medium"
                    >
                        Login (Welcome back!)
                    </button>
                </div>
            </CardFooter>
        </Card>
    )
}