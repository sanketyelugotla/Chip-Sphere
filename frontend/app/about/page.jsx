"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tab"
import { CircuitBoardIcon as Circuit, Mail, Phone, MapPin, Users, BookOpen, Award, Cpu } from "lucide-react"
import Image from "next/image"
import { useUser } from "@/context/userContext"
import { motion, AnimatePresence } from "framer-motion"

export default function About() {
  const { dark } = useUser();
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-12 px-4 sm:px-6 lg:px-8 circuit-bg bg-gradient-to-r from-primary/10 to-primary/5">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <h1 className="text-3xl sm:text-4xl font-bold mb-4">About ChipSphere</h1>
              <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">
                Your Orbit for VLSI Learning, Quizzes, and Career Growth.
              </p>
            </div>
          </div>
        </section>

        {/* About Tabs */}
        <section className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <Tabs defaultValue="mission" className="space-y-6">
              <TabsList className="grid grid-cols-2 sm:grid-cols-4 gap-2 rounded-lg sm:rounded-full mb-10">
                <TabsTrigger className="rounded-lg sm:rounded-full text-xs sm:text-sm" value="mission">Our Mission</TabsTrigger>
                <TabsTrigger className="rounded-lg sm:rounded-full text-xs sm:text-sm" value="team">Our Team</TabsTrigger>
                <TabsTrigger className="rounded-lg sm:rounded-full text-xs sm:text-sm" value="story">Our Story</TabsTrigger>
                <TabsTrigger className="rounded-lg sm:rounded-full text-xs sm:text-sm" value="contact">Contact Us</TabsTrigger>
              </TabsList>

              <AnimatePresence mode="wait">
                <TabsContent value="mission" className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    key="mission"
                  >
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                      <div className="order-2 md:order-1">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-4">Our Mission</h2>
                        <p className="text-muted-foreground mb-4">
                          We're a bunch of chip enthusiasts on a mission to turn your "uh-oh" moments into "heck yeah, I've got this!". Whether you're just starting out with Verilog or sweating through interview prep (we feel you), we've got your back. Expect bite-sized learning tips, quizzes that make you scratch your head, and real interview stories.
                        </p>
                      </div>
                      <div className="order-1 md:order-2 flex justify-center w-full md:w-auto">
                        <div className="w-40 sm:w-64">
                          <Image
                            src={dark ? "/logo_light.png" : "/logo_dark.png"}
                            alt="Logo"
                            width={300}
                            height={300}
                            priority
                            className="w-full h-auto"
                          />
                        </div>
                      </div>
                    </div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                        <Card className="circuit-border hover:scale-[1.02] transition-transform">
                          <CardHeader>
                            <div className="h-10 w-10 sm:h-12 sm:w-12 bg-primary/10 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                              <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                            </div>
                            <CardTitle className="text-lg sm:text-xl">Education</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm sm:text-base text-muted-foreground">
                              Making VLSI and chip design as fun and accessible as possible. No snooze-worthy lectures here—just crisp, high-quality content that actually helps.
                            </p>
                          </CardContent>
                        </Card>

                        <Card className="circuit-border hover:scale-[1.02] transition-transform">
                          <CardHeader>
                            <div className="h-10 w-10 sm:h-12 sm:w-12 bg-primary/10 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                              <Users className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                            </div>
                            <CardTitle className="text-lg sm:text-xl">Community</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm sm:text-base text-muted-foreground">
                              Because learning is better with friends! Join a supportive group of fellow learners who geek out over circuits as much as you do.
                            </p>
                          </CardContent>
                        </Card>

                        <Card className="circuit-border hover:scale-[1.02] transition-transform">
                          <CardHeader>
                            <div className="h-10 w-10 sm:h-12 sm:w-12 bg-primary/10 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                              <Award className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                            </div>
                            <CardTitle className="text-lg sm:text-xl">Excellence</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm sm:text-base text-muted-foreground">
                              Mediocrity? Never heard of it. We're all about top-tier content that not only levels up your skills but also fuels your inner chip geek.
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                    </motion.div>
                  </motion.div>
                </TabsContent>

                <TabsContent value="team">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    key="team"
                  >
                    <h2 className="text-2xl sm:text-3xl font-bold mb-6">Our Team</h2>
                    <div className="grid grid-cols-1 gap-4">
                      <Card className="circuit-border hover:scale-[1.01] transition-transform">
                        <CardHeader>
                          <div className="flex justify-center mb-3 sm:mb-4">
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              className="h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-primary/10 flex items-center justify-center"
                            >
                              <Cpu className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
                            </motion.div>
                          </div>
                          <CardTitle className="text-center text-lg sm:text-xl">Rama Narendra Korupula</CardTitle>
                          <p className="text-center text-xs sm:text-sm text-muted-foreground">Founder & CEO</p>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm sm:text-base text-muted-foreground text-center">
                            Hey there! I'm Rama Narendra, a final-year ECE student, and I created CHIPSPHERE out of my own struggle to find VLSI resources in one place.
                          </p>
                          <p className="text-sm sm:text-base text-muted-foreground text-center mt-2">
                            CHIPSPHERE is my way of sharing everything I've learned and discovered along the way.
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </motion.div>
                </TabsContent>

                <TabsContent value="story">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    key="story"
                  >
                    <div className="flex flex-col lg:flex-row gap-6">
                      <div className="lg:w-1/2">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-4">Our Story</h2>
                        <p className="text-sm sm:text-base text-muted-foreground mb-3">
                          ChipSphere started as a wild idea in a dorm room by a group of final-year students who were tired of the struggle—hunting for VLSI study materials, real interview experiences, and solid project ideas.
                        </p>
                        <p className="text-sm sm:text-base text-muted-foreground mb-3">
                          We're on a mission to make learning, sharing, and growing in VLSI fun, easy, and absolutely free.
                        </p>
                      </div>
                      <div className="lg:w-1/2 space-y-4">
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          <Card className="circuit-border hover:scale-[1.01] transition-transform">
                            <CardHeader>
                              <CardTitle className="text-lg sm:text-xl">
                                🚀 2025 – The Launch Year!
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm sm:text-base text-muted-foreground">
                                Launched as a free VLSI hub, bringing study materials, interview hacks, and student projects.
                              </p>
                            </CardContent>
                          </Card>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 }}
                        >
                          <Card className="circuit-border hover:scale-[1.01] transition-transform">
                            <CardHeader>
                              <CardTitle className="text-lg sm:text-xl">📈 Leveling Up Soon!</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm sm:text-base text-muted-foreground">
                                We will introduce quizzes, hands-on projects, and expert insights—finally, a smarter way to prep!
                              </p>
                            </CardContent>
                          </Card>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 }}
                        >
                          <Card className="circuit-border hover:scale-[1.01] transition-transform">
                            <CardHeader>
                              <CardTitle className="text-lg sm:text-xl">🌍 Going Big Ahead!</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm sm:text-base text-muted-foreground">
                                We will launch mentorships, expand to universities, and kick off VLSI competitions.
                              </p>
                            </CardContent>
                          </Card>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </TabsContent>

                <TabsContent value="contact">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    key="contact"
                  >
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="md:w-1/2">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ping the Pros!</h2>
                        <p className="text-sm sm:text-base text-muted-foreground mb-4">
                          Drop us a message! We promise we won't ghost you (unless we're debugging).
                        </p>

                        <motion.div
                          className="space-y-3"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          <div className="flex items-start">
                            <Mail className="h-5 w-5 mr-3 text-primary shrink-0 mt-0.5" />
                            <div>
                              <h3 className="font-medium text-sm sm:text-base">Email</h3>
                              <p className="text-xs sm:text-sm text-muted-foreground">contact@chipsphere.in</p>
                            </div>
                          </div>

                          <div className="flex items-start">
                            <Phone className="h-5 w-5 mr-3 text-primary shrink-0 mt-0.5" />
                            <div>
                              <h3 className="font-medium text-sm sm:text-base">Phone</h3>
                              <p className="text-xs sm:text-sm text-muted-foreground">+91 83338 20622</p>
                            </div>
                          </div>

                          <div className="flex items-start">
                            <MapPin className="h-5 w-5 mr-3 text-primary shrink-0 mt-0.5" />
                            <div>
                              <h3 className="font-medium text-sm sm:text-base">Address</h3>
                              <p className="text-xs sm:text-sm text-muted-foreground">Rajahmundry, Andhrapradesh-533101</p>
                            </div>
                          </div>
                        </motion.div>
                      </div>

                      <motion.div
                        className="md:w-1/2 bg-card p-4 sm:p-6 rounded-lg circuit-border"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <h3 className="text-xl font-bold mb-3 sm:mb-4">Send us a message</h3>
                        <form className="space-y-3 sm:space-y-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <motion.div
                              className="space-y-1 sm:space-y-2"
                              whileHover={{ scale: 1.01 }}
                            >
                              <label htmlFor="name" className="text-xs sm:text-sm font-medium">
                                Name
                              </label>
                              <input
                                id="name"
                                type="text"
                                className="w-full p-2 text-xs sm:text-sm rounded-md border border-border bg-background"
                                placeholder="Your Name"
                              />
                            </motion.div>
                            <motion.div
                              className="space-y-1 sm:space-y-2"
                              whileHover={{ scale: 1.01 }}
                            >
                              <label htmlFor="email" className="text-xs sm:text-sm font-medium">
                                Email
                              </label>
                              <input
                                id="email"
                                type="email"
                                className="w-full p-2 text-xs sm:text-sm rounded-md border border-border bg-background"
                                placeholder="your@email.com"
                              />
                            </motion.div>
                          </div>
                          <motion.div
                            className="space-y-1 sm:space-y-2"
                            whileHover={{ scale: 1.01 }}
                          >
                            <label htmlFor="subject" className="text-xs sm:text-sm font-medium">
                              Subject
                            </label>
                            <input
                              id="subject"
                              type="text"
                              className="w-full p-2 text-xs sm:text-sm rounded-md border border-border bg-background"
                              placeholder="Subject"
                            />
                          </motion.div>
                          <motion.div
                            className="space-y-1 sm:space-y-2"
                            whileHover={{ scale: 1.01 }}
                          >
                            <label htmlFor="message" className="text-xs sm:text-sm font-medium">
                              Message
                            </label>
                            <textarea
                              id="message"
                              className="w-full p-2 text-xs sm:text-sm rounded-md border border-border bg-background min-h-[100px] sm:min-h-[120px]"
                              placeholder="Your message..."
                            ></textarea>
                          </motion.div>
                          <motion.button
                            type="submit"
                            className="w-full bg-primary text-white py-2 text-sm sm:text-base rounded-md hover:bg-primary/90 transition-colors circuit-border cursor-pointer"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            Send Message
                          </motion.button>
                        </form>
                      </motion.div>
                    </div>
                  </motion.div>
                </TabsContent>
              </AnimatePresence>
            </Tabs>
          </div>
        </section>
      </main>
    </div>
  )
}