import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tab"
import { CircuitBoardIcon as Circuit, Mail, Phone, MapPin, Users, BookOpen, Award, Cpu } from "lucide-react"

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-16 px-4 sm:px-6 lg:px-8 circuit-bg">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">About ChipSphere</h1>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Your Orbit for VLSI Learning, Quizzes, and Career Growth.
              </p>
            </div>
          </div>
        </section>

        {/* About Tabs */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <Tabs defaultValue="mission" className="space-y-8">
              <TabsList className="grid w-full grid-cols-1 md:grid-cols-4">
                <TabsTrigger value="mission">Our Mission</TabsTrigger>
                <TabsTrigger value="team">Our Team</TabsTrigger>
                <TabsTrigger value="story">Our Story</TabsTrigger>
                <TabsTrigger value="contact">Contact Us</TabsTrigger>
              </TabsList>

              <TabsContent value="mission" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                    <p className="text-muted-foreground mb-4">
                      We’re a bunch of chip enthusiasts on a mission to turn your “uh-oh” moments into “heck yeah, I’ve got this!”. Whether you're just starting out with Verilog or sweating through interview prep (we feel you), we’ve got your back. Expect bite-sized learning tips, quizzes that make you scratch your head, and real interview stories.
                    </p>
                  </div>
                  <div className="flex justify-center">
                    <div className="mt-5 w-100">
                      <div className="text-primary text-9xl font-bold opacity-98">
                        <img
                          src="ChipSphere.png"
                          alt="logo"
                          className="h-100 w-100"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <Card className="circuit-border">
                    <CardHeader>
                      <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                        <BookOpen className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle>Education</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        Making VLSI and chip design as fun and accessible as possible. No snooze-worthy lectures here—just crisp, high-quality content that actually helps.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="circuit-border">
                    <CardHeader>
                      <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                        <Users className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle>Community</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        Because learning is better with friends! Join a supportive group of fellow learners who geek out over circuits as much as you do.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="circuit-border">
                    <CardHeader>
                      <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                        <Award className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle>Excellence</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        Mediocrity? Never heard of it. We're all about top-tier content that not only levels up your skills but also fuels your inner chip geek. So bring your A-game—because we sure are!                      </p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="team">
                <h2 className="text-3xl font-bold mb-8">Our Team</h2>
                <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-6">
                  <Card className="circuit-border">
                    <CardHeader>
                      <div className="flex justify-center mb-4">
                        <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
                          <Cpu className="h-10 w-10 text-primary" /> {/* Replace with Founder Icon */}
                        </div>
                      </div>
                      <CardTitle className="text-center">Rama Narendra Korupula</CardTitle>
                      <p className="text-center text-sm text-muted-foreground">Founder & CEO</p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-center">
                        Hey there! I’m Rama Narendra, a final-year ECE student, and I created CHIPSPHERE out of my own struggle to find VLSI resources in one place. I know how frustrating it can be to dig through endless websites and materials just to find what you need, so I wanted to build something that makes it easier for everyone.</p>

                      <p className="text-muted-foreground text-center"> CHIPSPHERE is my way of sharing everything I’ve learned and discovered along the way. Whether you're just starting out or already deep into VLSI, I hope this platform helps make your journey a little smoother and a lot more fun. </p>

                      <p className="text-muted-foreground text-center"> Thanks for being a part of this — we’re all in this together!
                      </p>


                    </CardContent>
                  </Card>
                </div>
              </TabsContent>


              <TabsContent value="story">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h2 className="text-3xl font-bold mb-4">Our Story</h2>
                    <p className="text-muted-foreground mb-4">
                      ChipSphere started as a wild idea in a dorm room (okay, maybe a study hall) by a group of final-year students who were tired of the struggle—hunting for VLSI study materials, real interview experiences, and solid project ideas, all without hitting a paywall. We figured, why not create a space where everything is free, accessible, and actually useful?

                    </p>
                    <p className="text-muted-foreground mb-4">
                      And so, ChipSphere was born! </p>
                    <p className="text-muted-foreground mb-4">
                      We’re on a mission to make learning, sharing, and growing in VLSI fun, easy, and absolutely free—no sneaky paywalls, no “premium” nonsense. Just a space by students, for students, helping the next wave of chip designers crack codes, not their wallets.</p>
                    <p className="text-muted-foreground">
                      So, whether you're prepping for interviews, building the next big thing, or just geeking out over transistors (because, let’s be honest, they’re kinda cool), welcome to ChipSphere! We’re thrilled to have you on board. </p>
                  </div>
                  <div className="space-y-6">
                    <Card className="circuit-border">
                      <CardHeader>
                        <CardTitle>
                          🚀 2025 – The Launch Year!
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">
                          Launched as a free VLSI hub, bringing study materials, interview hacks, and student projects—because learning shouldn't come with a price tag.                        </p>
                      </CardContent>
                    </Card>

                    <Card className="circuit-border">
                      <CardHeader>
                        <CardTitle>📈 Leveling Up Soon!</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">
                          We will introduce quizzes, hands-on projects, and expert insights—finally, a smarter way to prep! A student-professional network will grow, so you won’t have to struggle alone.</p>
                      </CardContent>
                    </Card>

                    <Card className="circuit-border">
                      <CardHeader>
                        <CardTitle>🌍 Going Big Ahead!</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">

                          We will launch mentorships, expand to universities, and kick off VLSI competitions—soon, even the industry will take notice!</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="contact">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h2 className="text-3xl font-bold mb-4">Ping the Pros!</h2>
                    <p className="text-muted-foreground mb-6">
                      Drop us a message! We promise we won’t ghost you (unless we're debugging).
                    </p>

                    <div className="space-y-4">
                      <div className="flex items-start">
                        <Mail className="h-5 w-5 mr-3 text-primary shrink-0 mt-0.5" />
                        <div>
                          <h3 className="font-medium">Email</h3>
                          <p className="text-muted-foreground">contact@chipsphere.in</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <Phone className="h-5 w-5 mr-3 text-primary shrink-0 mt-0.5" />
                        <div>
                          <h3 className="font-medium">Phone</h3>
                          <p className="text-muted-foreground">+91 83338 20622</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <MapPin className="h-5 w-5 mr-3 text-primary shrink-0 mt-0.5" />
                        <div>
                          <h3 className="font-medium">Address</h3>
                          <p className="text-muted-foreground">Rajahmundry,Andhrapradesh-533101</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card p-6 rounded-lg circuit-border">
                    <h3 className="text-xl font-bold mb-4">Send us a message</h3>
                    <form className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="name" className="text-sm font-medium">
                            Name
                          </label>
                          <input
                            id="name"
                            type="text"
                            className="w-full p-2 rounded-md border border-border bg-background"
                            placeholder="Your Majesty"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="email" className="text-sm font-medium">
                            Email
                          </label>
                          <input
                            id="email"
                            type="email"
                            className="w-full p-2 rounded-md border border-border bg-background"
                            placeholder="NotSpam@trustme.com"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="subject" className="text-sm font-medium">
                          Subject
                        </label>
                        <input
                          id="subject"
                          type="text"
                          className="w-full p-2 rounded-md border border-border bg-background"
                          placeholder="I’m Serious"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium">
                          Message
                        </label>
                        <textarea
                          id="message"
                          className="w-full p-2 rounded-md border border-border bg-background min-h-[120px]"
                          placeholder="I solved everything. Then I forgot."
                        ></textarea>
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-primary text-primary-foreground py-2 rounded-md hover:bg-primary/90 transition-colors circuit-border cursor-pointer"
                      >
                        Send Message
                      </button>
                    </form>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
    </div>
  )
}