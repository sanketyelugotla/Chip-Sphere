"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronRight, BookOpen, FileText, CheckCircle, Users } from "lucide-react"
import Image from "next/image"
import { useUser } from "@/context/userContext"

export default function Home() {

  const { dark } = useUser();

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="flex items-center justify-center text-center sm:text-left  h-[100vh] sm:h-full bg-gradient-to-r from-primary/10 to-primary/5 pb-40 sm:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h1 className="text-5xl font-semibold lg:text-6xl lg:font-bold sm:tracking-tight">
                  Elevate Your <span className="text-primary">Engineering</span> Knowledge
                </h1>
                <p className="text-lg text-muted-foreground max-w-lg">
                  Access interactive quizzes, comprehensive resources, and insightful blogs tailored for VLSI and
                  engineering students and professionals.
                </p>
                <div className="flex flex-wrap gap-4 justify-center sm:justify-normal">
                  <Button size="lg" asChild>
                    <Link href="/quizzes">
                      Get Started <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/about">Learn More</Link>
                  </Button>
                </div>
              </div>
              <div className="hidden itens-center pb-10 justify-center sm:flex opacity-88">
                <Image
                  src={dark ? "/logo_light.png" : "/logo_dark.png"}
                  alt="Logo"
                  width={380}
                  height={380}
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Platform Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-card rounded-lg p-6 shadow-sm border border-border hover:shadow-md transition-shadow">
                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Interactive Quizzes</h3>
                <p className="text-muted-foreground">
                  Test your knowledge with timed quizzes and track your progress over time.
                </p>
              </div>
              <div className="bg-card rounded-lg p-6 shadow-sm border border-border hover:shadow-md transition-shadow">
                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Learning Resources</h3>
                <p className="text-muted-foreground">
                  Access study materials, guidance documents, and interview preparation resources.
                </p>
              </div>
              <div className="bg-card rounded-lg p-6 shadow-sm border border-border hover:shadow-md transition-shadow">
                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Insightful Blogs</h3>
                <p className="text-muted-foreground">
                  Stay updated with the latest news, job notifications, and industry experiences.
                </p>
              </div>
              <div className="bg-card rounded-lg p-6 shadow-sm border border-border hover:shadow-md transition-shadow">
                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Project Showcase</h3>
                <p className="text-muted-foreground">
                  Explore and contribute to semiconductor projects from the community.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why ChipSphere Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 ">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Why Choose ChipSphere?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              ChipSphere offers a unique combination of interactive learning, community-driven projects, and expert insights. Here's why you should join us:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Comprehensive Resources</h3>
                <p className="text-muted-foreground">
                  Get access to a variety of study materials, industry reports, and expert blogs tailored to your needs.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Hands-On Learning</h3>
                <p className="text-muted-foreground">
                  Participate in interactive quizzes and projects to apply your knowledge in real-world scenarios.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Community Collaboration</h3>
                <p className="text-muted-foreground">
                  Connect with like-minded professionals, share ideas, and collaborate on semiconductor-related projects.
                </p>
              </div>
            </div>
            <div className="mt-8">
              <Button size="lg" asChild>
                <Link href="/about">Learn More About Us</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary/5">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to enhance your skills?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Join our community of engineering professionals and students to access exclusive content and track your
              progress.
            </p>
            <Button size="lg" asChild>
              <Link href="/auth?mode=signup">Sign Up Now</Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  )
}
