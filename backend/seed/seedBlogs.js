const mongoose = require('mongoose');
const { Blog } = require("../models");
const dotenv = require("dotenv");
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

// Common image for all except the first
const sharedImage = "https://www.tessolve.com/wp-content/uploads/2023/12/memory-testing-post.jpg";

const blogData = [
    {
        title: "The Future of VLSI Design in 2025",
        image: sharedImage,
        description: "Exploring upcoming trends and technologies in VLSI design that will shape the industry in the coming years.",
        date: new Date("2023-05-15"),
        type: "Technology",
        durationRead: 8,
        author: "685199808f623fb5e7f50d6a",
        content: `# The Future of VLSI Design in 2025

VLSI (Very Large Scale Integration) design is entering a new era of innovation. Here’s what to expect:

## 🔮 Trends to Watch
- *3nm and beyond*: Shrinking technology nodes are pushing performance to new limits.
- *AI-assisted design*: Tools powered by AI are improving verification and optimization.
- *Chiplet architectures*: Modular design is enhancing scalability.

## 🚀 Opportunities
- High-speed SoCs for 5G and AI
- Energy-efficient IoT devices
- Integration with quantum hardware

2025 is shaping up to be a transformative year for semiconductor design.`
    },
    {
        title: "Interview Experience: Senior VLSI Engineer at Intel",
        image: sharedImage,
        description: "A detailed account of the interview process for a Senior VLSI Engineer position at Intel, including technical questions and tips.",
        date: new Date("2023-04-22"),
        type: "Career",
        durationRead: 12,
        author: "685199808f623fb5e7f50d6a",
        content: `# Interview Experience: Senior VLSI Engineer at Intel

I recently interviewed at *Intel* for a Senior VLSI Engineer role. Here's how it went:

## 📅 Interview Rounds
1. *Initial Screening*
   - Background questions
   - Resume walkthrough

2. *Technical Rounds*
   - Digital design problems
   - Timing analysis and STA
   - Verilog coding test

3. *Managerial Round*
   - Team experience
   - Project planning

## 💡 Tips
- Brush up on *low-power design*
- Be ready to *optimize logic*
- Practice *real-world case studies*

It was a great learning experience!`
    },
    {
        title: "Understanding Power Optimization in Modern Chip Design",
        image: sharedImage,
        description: "A comprehensive guide to power optimization techniques in modern semiconductor design and their impact on performance.",
        date: new Date("2023-06-03"),
        type: "Technical",
        durationRead: 10,
        author: "685199808f623fb5e7f50d6a",
        content: `# Understanding Power Optimization in Modern Chip Design

Power efficiency is a key factor in VLSI. Here's a breakdown of the top strategies:

## 🔧 Key Techniques
- *Clock gating*: Disables unused clocks to save dynamic power.
- *Multi-Vt cells*: Balances performance and leakage.
- *Power gating*: Shuts down entire blocks during idle periods.

## 📊 Metrics
- Dynamic vs Static Power
- PPA (Power, Performance, Area) trade-offs

These methods are essential for mobile and IoT devices.`
    },
    {
        title: "The Role of AI in VLSI Design Automation",
        image: sharedImage,
        description: "How artificial intelligence is revolutionizing VLSI design automation and improving efficiency in the design process.",
        date: new Date("2023-06-15"),
        type: "Technology",
        durationRead: 9,
        author: "685199808f623fb5e7f50d6a",
        content: `# The Role of AI in VLSI Design Automation

Artificial Intelligence is rapidly transforming how we design chips.

## 🤖 AI Applications
- *Synthesis optimization*
- *Predictive DRC violation checks*
- *Routing prediction*

## 🚀 Benefits
- Faster design iterations
- Reduced human errors
- Improved time-to-market

AI is no longer optional—it's essential in next-gen EDA tools.`
    },
    {
        title: "From Academia to Industry: My Journey in VLSI",
        image: sharedImage,
        description: "A personal account of transitioning from academic research to industry roles in VLSI design and the lessons learned along the way.",
        date: new Date("2023-05-28"),
        type: "Career",
        durationRead: 15,
        author: "685199808f623fb5e7f50d6a",
        content: `# From Academia to Industry: My Journey in VLSI

Transitioning from university to industry was a major shift.

## 🎓 Academic Life
- Focused on *low-power architecture research*
- Published papers on *RTL design optimization*

## 🏢 Industry Reality
- Real-time constraints
- Collaboration over theory
- Tools like *Synopsys, **Cadence, and **Mentor*

## 🙌 Lessons Learned
- Learn to write clean Verilog
- Communication is as important as logic

The journey was tough but incredibly rewarding.`
    },
    {
        title: "Challenges in 3nm Process Technology",
        image: sharedImage,
        description: "An in-depth look at the technical challenges and innovations in 3nm semiconductor process technology.",
        date: new Date("2023-06-10"),
        type: "Technical",
        durationRead: 11,
        author: "685199808f623fb5e7f50d6a",
        content: `# Challenges in 3nm Process Technology

The 3nm node is pushing physical and electrical limits.

## 🧪 Key Issues
- *Quantum tunneling* in transistors
- Increased *leakage current*
- Complex *masking and lithography*

## 🔬 Solutions
- Gate-All-Around (GAA) FETs
- Advanced EUV lithography
- Novel materials like *2D semiconductors*

Despite the hurdles, 3nm is unlocking powerful new capabilities.`
    }
];
const seedBlogs = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB connected');

        await Blog.deleteMany(); // Optional: Clear old data
        await Blog.insertMany(blogData);

        console.log('Dummy blogs inserted');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedBlogs();
