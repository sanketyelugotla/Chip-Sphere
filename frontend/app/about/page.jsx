"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tab"
import { CircuitBoardIcon as Circuit, Mail, Phone, MapPin, Users, BookOpen, Award, Cpu } from "lucide-react"
import Image from "next/image"
import { useUser } from "@/context/userContext"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import Loading from "../loading"

export default function About() {
  const { dark } = useUser();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); // Short delay to prevent flash of loading state

    return () => clearTimeout(timer);
  }, []);

  // Tab content data
  const tabContents = {
    mission: {
      key: "mission",
      title: "Our Mission",
      content: (
        <>
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="order-2 md:order-1">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-2xl sm:text-3xl font-bold mb-4"
              >
                Our Mission
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-muted-foreground mb-4"
              >
                We're a bunch of chip enthusiasts on a mission to turn your "uh-oh" moments into "heck yeah, I've got this!". Whether you're just starting out with Verilog or sweating through interview prep (we feel you), we've got your back. Expect bite-sized learning tips, quizzes that make you scratch your head, and real interview stories.
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="order-1 md:order-2 flex justify-center w-full md:w-auto"
            >
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
            </motion.div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {[
              {
                key: "education-card",
                icon: <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />,
                title: "Education",
                content: "Making VLSI and chip design as fun and accessible as possible. No snooze-worthy lectures here—just crisp, high-quality content that actually helps."
              },
              {
                key: "community-card",
                icon: <Users className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />,
                title: "Community",
                content: "Because learning is better with friends! Join a supportive group of fellow learners who geek out over circuits as much as you do."
              },
              {
                key: "excellence-card",
                icon: <Award className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />,
                title: "Excellence",
                content: "Mediocrity? Never heard of it. We're all about top-tier content that not only levels up your skills but also fuels your inner chip geek."
              }
            ].map((card, index) => (
              <motion.div
                key={card.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
              >
                <Card className="circuit-border hover:scale-[1.02] transition-transform">
                  <CardHeader>
                    <div className="h-10 w-10 sm:h-12 sm:w-12 bg-primary/10 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                      {card.icon}
                    </div>
                    <CardTitle className="text-lg sm:text-xl">{card.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm sm:text-base text-muted-foreground">
                      {card.content}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </>
      )
    },
    team: {
      key: "team",
      title: "Our Team",
      content: (
        <>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl sm:text-3xl font-bold mb-6"
          >
            Our Team
          </motion.h2>
          <div className="grid grid-cols-1 gap-4">
            <motion.div
              key="team-card"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.3 }}
            >
              <Card className="circuit-border hover:scale-[1.01] transition-transform">
                <CardHeader>
                  <div className="flex justify-center mb-3 sm:mb-4">
                    <motion.div
                      initial={{ rotate: 0 }}
                      whileHover={{ scale: 1.05, rotate: 5 }}
                      className="h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-primary/10 flex items-center justify-center"
                    >
                      <Cpu className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
                    </motion.div>
                  </div>
                  <CardTitle className="text-center text-lg sm:text-xl">Rama Narendra Korupula</CardTitle>
                  <p className="text-center text-xs sm:text-sm text-muted-foreground">Founder & CEO</p>
                </CardHeader>
                <CardContent>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-sm sm:text-base text-muted-foreground text-center"
                  >
                    Hey there! I'm Rama Narendra, a final-year ECE student, and I created CHIPSPHERE out of my own struggle to find VLSI resources in one place.
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-sm sm:text-base text-muted-foreground text-center mt-2"
                  >
                    CHIPSPHERE is my way of sharing everything I've learned and discovered along the way.
                  </motion.p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </>
      )
    },
    story: {
      key: "story",
      title: "Our Story",
      content: (
        <>
          <div className="flex flex-col lg:flex-row gap-6">
            <motion.div
              key="story-text"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="lg:w-1/2"
            >
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">Our Story</h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-sm sm:text-base text-muted-foreground mb-3"
              >
                ChipSphere started as a wild idea in a dorm room by a group of final-year students who were tired of the struggle—hunting for VLSI study materials, real interview experiences, and solid project ideas.
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-sm sm:text-base text-muted-foreground mb-3"
              >
                We're on a mission to make learning, sharing, and growing in VLSI fun, easy, and absolutely free.
              </motion.p>
            </motion.div>
            <div className="lg:w-1/2 space-y-4">
              {[
                {
                  key: "launch-card",
                  emoji: "🚀",
                  title: "2025 – The Launch Year!",
                  content: "Launched as a free VLSI hub, bringing study materials, interview hacks, and student projects."
                },
                {
                  key: "levelup-card",
                  emoji: "📈",
                  title: "Leveling Up Soon!",
                  content: "We will introduce quizzes, hands-on projects, and expert insights—finally, a smarter way to prep!"
                },
                {
                  key: "big-card",
                  emoji: "🌍",
                  title: "Going Big Ahead!",
                  content: "We will launch mentorships, expand to universities, and kick off VLSI competitions."
                }
              ].map((card, index) => (
                <motion.div
                  key={card.key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
                >
                  <Card className="circuit-border hover:scale-[1.01] transition-transform">
                    <CardHeader>
                      <CardTitle className="text-lg sm:text-xl">
                        {card.emoji} {card.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm sm:text-base text-muted-foreground">
                        {card.content}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </>
      )
    },
    contact: {
      key: "contact",
      title: "Contact Us",
      content: (
        <>
          <div className="flex flex-col md:flex-row gap-6">
            <motion.div
              key="contact-info"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="md:w-1/2"
            >
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ping the Pros!</h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-sm sm:text-base text-muted-foreground mb-4"
              >
                Drop us a message! We promise we won't ghost you (unless we're debugging).
              </motion.p>

              <div className="space-y-3">
                {[
                  {
                    key: "email-info",
                    icon: <Mail className="h-5 w-5 mr-3 text-primary shrink-0 mt-0.5" />,
                    title: "Email",
                    content: "contact@chipsphere.in"
                  },
                  {
                    key: "phone-info",
                    icon: <Phone className="h-5 w-5 mr-3 text-primary shrink-0 mt-0.5" />,
                    title: "Phone",
                    content: "+91 83338 20622"
                  },
                  {
                    key: "address-info",
                    icon: <MapPin className="h-5 w-5 mr-3 text-primary shrink-0 mt-0.5" />,
                    title: "Address",
                    content: "Rajahmundry, Andhrapradesh-533101"
                  }
                ].map((item, index) => (
                  <motion.div
                    key={item.key}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-start"
                  >
                    {item.icon}
                    <div>
                      <h3 className="font-medium text-sm sm:text-base">{item.title}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground">{item.content}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              key="contact-form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.3 }}
              className="md:w-1/2 bg-card p-4 sm:p-6 rounded-lg circuit-border"
            >
              <h3 className="text-xl font-bold mb-3 sm:mb-4">Send us a message</h3>
              <form className="space-y-3 sm:space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    {
                      key: "name-input",
                      id: "name",
                      type: "text",
                      label: "Name",
                      placeholder: "Your Name"
                    },
                    {
                      key: "email-input",
                      id: "email",
                      type: "email",
                      label: "Email",
                      placeholder: "your@email.com"
                    }
                  ].map((input, index) => (
                    <motion.div
                      key={input.key}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      whileHover={{ scale: 1.01 }}
                      className="space-y-1 sm:space-y-2"
                    >
                      <label htmlFor={input.id} className="text-xs sm:text-sm font-medium">
                        {input.label}
                      </label>
                      <input
                        id={input.id}
                        type={input.type}
                        className="w-full p-2 text-xs sm:text-sm rounded-md border border-border bg-background"
                        placeholder={input.placeholder}
                      />
                    </motion.div>
                  ))}
                </div>
                {[
                  {
                    key: "subject-input",
                    id: "subject",
                    type: "text",
                    label: "Subject",
                    placeholder: "Subject"
                  },
                  {
                    key: "message-textarea",
                    id: "message",
                    type: "textarea",
                    label: "Message",
                    placeholder: "Your message..."
                  }
                ].map((input, index) => (
                  <motion.div
                    key={input.key}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    whileHover={{ scale: 1.01 }}
                    className="space-y-1 sm:space-y-2"
                  >
                    <label htmlFor={input.id} className="text-xs sm:text-sm font-medium">
                      {input.label}
                    </label>
                    {input.type === "textarea" ? (
                      <textarea
                        id={input.id}
                        className="w-full p-2 text-xs sm:text-sm rounded-md border border-border bg-background min-h-[100px] sm:min-h-[120px]"
                        placeholder={input.placeholder}
                      ></textarea>
                    ) : (
                      <input
                        id={input.id}
                        type={input.type}
                        className="w-full p-2 text-xs sm:text-sm rounded-md border border-border bg-background"
                        placeholder={input.placeholder}
                      />
                    )}
                  </motion.div>
                ))}
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
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
        </>
      )
    }
  };

  if (isLoading) {
    return (
      <Loading />
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <section className="relative py-12 px-4 sm:px-6 lg:px-8 circuit-bg bg-gradient-to-r from-primary/10 to-primary/5">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-center"
              >
                <h1 className="text-3xl sm:text-4xl font-bold mb-4">About ChipSphere</h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto"
                >
                  Your Orbit for VLSI Learning, Quizzes, and Career Growth.
                </motion.p>
              </motion.div>
            </div>
          </section>
        </motion.div>

        {/* About Tabs */}
        <section className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <Tabs defaultValue="mission" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <TabsList className="grid grid-cols-4 gap-2 rounded-lg sm:rounded-full mb-10">
                  {Object.values(tabContents).map((tab) => (
                    <TabsTrigger
                      key={tab.key}
                      className="rounded-lg sm:rounded-full text-xs sm:text-sm"
                      value={tab.key}
                    >
                      {tab.title}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </motion.div>

              {Object.values(tabContents).map((tab) => (
                <TabsContent key={tab.key} value={tab.key} className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {tab.content}
                  </motion.div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>
      </main>
    </div>
  )
}