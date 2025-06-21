const mongoose = require('mongoose');
const { Question } = require("../models");
const dotenv = require("dotenv");
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const questions = [
    {
        quizId: "6851a2733b15cc07d6201ffd",
        title: "What does FPGA stand for?",
        options: ["Field Programmable Gate Array", "Fast Processing Gate Array", "Flexible Programmable Gate Architecture", "Field Processing Gate Array"],
        answer: "Field Programmable Gate Array",
        type: "mcq",
        explanation: "FPGA stands for Field Programmable Gate Array, a type of reconfigurable hardware."
    },
    {
        quizId: "6851a2733b15cc07d6201ffd",
        title: "Which of the following is a key characteristic of FPGAs?",
        options: ["Fixed functionality", "Low reconfigurability", "Hardware reprogrammability", "Only used in final products"],
        answer: "Hardware reprogrammability",
        type: "mcq",
        explanation: "FPGAs are known for their reprogrammability, allowing hardware-level changes after manufacturing."
    },
    {
        quizId: "6851a2733b15cc07d6201ffd",
        title: "Which logic element is commonly used in FPGA architecture?",
        options: ["AND gates", "Flip-flops", "LUTs", "Counters"],
        answer: "LUTs",
        type: "mcq",
        explanation: "FPGAs use Look-Up Tables (LUTs) as the fundamental logic elements."
    },
    {
        quizId: "6851a2733b15cc07d6201ffd",
        title: "The primary building block of an FPGA is the:",
        options: ["ALU", "Control Unit", "Logic Block", "Bus Interface"],
        answer: "Logic Block",
        type: "mcq",
        explanation: "Logic blocks (including LUTs, flip-flops) are the fundamental units of FPGA architecture."
    },
    {
        quizId: "6851a2733b15cc07d6201ffd",
        title: "What is the role of interconnects in an FPGA?",
        options: ["Store data", "Process signals", "Provide clock", "Connect logic blocks"],
        answer: "Connect logic blocks",
        type: "mcq",
        explanation: "Interconnects allow logic blocks to communicate in FPGAs."
    },
    {
        quizId: "6851a2733b15cc07d6201ffd",
        title: "What is the main purpose of CLBs (Configurable Logic Blocks)?",
        options: ["Data transfer", "Memory access", "Logic implementation", "Clock generation"],
        answer: "Logic implementation",
        type: "mcq",
        explanation: "CLBs are used to implement logic functions using LUTs and flip-flops."
    },
    {
        quizId: "6851a2733b15cc07d6201ffd",
        title: "Which of the following is NOT typically part of an FPGA?",
        options: ["LUT", "Flip-Flop", "Register File", "Interconnect"],
        answer: "Register File",
        type: "mcq",
        explanation: "Register files are common in CPUs but not typically found as standalone blocks in FPGAs."
    },
    {
        quizId: "6851a2733b15cc07d6201ffd",
        title: "Which component stores configuration data in an SRAM-based FPGA?",
        options: ["ROM", "EEPROM", "SRAM", "DRAM"],
        answer: "SRAM",
        type: "mcq",
        explanation: "SRAM-based FPGAs use SRAM cells to store configuration data."
    },
    {
        quizId: "6851a2733b15cc07d6201ffd",
        title: "Which of the following is a typical application of FPGAs?",
        options: ["Video transcoding", "Real-time signal processing", "ASIC prototyping", "All of the above"],
        answer: "All of the above",
        type: "mcq",
        explanation: "FPGAs are versatile and used in many areas like video, DSP, and ASIC prototyping."
    },
    {
        quizId: "6851a2733b15cc07d6201ffd",
        title: "Which FPGA vendor is known for the Vivado Design Suite?",
        options: ["Intel", "Xilinx", "Lattice", "Microsemi"],
        answer: "Xilinx",
        type: "mcq",
        explanation: "Xilinx provides the Vivado Design Suite for FPGA development."
    },
    {
        quizId: "6851a2733b15cc07d6201ffd",
        title: "The FPGA configuration is typically done via:",
        options: ["USB Drive", "JTAG", "HDMI", "PCIe"],
        answer: "JTAG",
        type: "mcq",
        explanation: "JTAG is a standard method for programming and debugging FPGAs."
    },
    {
        quizId: "6851a2733b15cc07d6201ffd",
        title: "Which tool is commonly used to write FPGA logic?",
        options: ["C++", "Verilog", "Python", "Java"],
        answer: "Verilog",
        type: "mcq",
        explanation: "Verilog (or VHDL) is a hardware description language used for FPGA design."
    },
    {
        quizId: "6851a2733b15cc07d6201ffd",
        title: "Which of these is a hardware description language (HDL)?",
        options: ["HTML", "VHDL", "SQL", "JSON"],
        answer: "VHDL",
        type: "mcq",
        explanation: "VHDL is used to describe digital logic circuits."
    },
    {
        quizId: "6851a2733b15cc07d6201ffd",
        title: "Which step occurs first in FPGA design flow?",
        options: ["Bitstream generation", "Synthesis", "Place and route", "RTL design"],
        answer: "RTL design",
        type: "mcq",
        explanation: "RTL design is the starting point where the behavior is described using HDL."
    },
    {
        quizId: "6851a2733b15cc07d6201ffd",
        title: "What does the term 'place and route' mean in FPGA design?",
        options: ["Code formatting", "Assigning logic to gates", "Physically mapping logic to FPGA resources", "Testing"],
        answer: "Physically mapping logic to FPGA resources",
        type: "mcq",
        explanation: "Place and route maps the synthesized logic to specific areas on the FPGA."
    },
    {
        quizId: "6851a2733b15cc07d6201ffd",
        title: "What is a 'bitstream' in FPGA terminology?",
        options: ["A signal pattern", "A binary file for configuration", "An HDL file", "Clock pulses"],
        answer: "A binary file for configuration",
        type: "mcq",
        explanation: "Bitstream is the final binary file used to configure the FPGA."
    },
    {
        quizId: "6851a2733b15cc07d6201ffd",
        title: "What makes an FPGA reprogrammable?",
        options: ["Flash memory", "SRAM configuration", "ROM", "Fixed logic"],
        answer: "SRAM configuration",
        type: "mcq",
        explanation: "SRAM cells in FPGAs can be reprogrammed, allowing flexibility."
    },
    {
        quizId: "6851a2733b15cc07d6201ffd",
        title: "Which is more power-efficient for a fixed task?",
        options: ["FPGA", "ASIC", "CPU", "GPU"],
        answer: "ASIC",
        type: "mcq",
        explanation: "ASICs are tailored for a specific task, making them more power-efficient than FPGAs."
    },
    {
        quizId: "6851a2733b15cc07d6201ffd",
        title: "Which of the following is a soft processor core available for FPGAs?",
        options: ["ARM Cortex-A9", "Intel Core i5", "MicroBlaze", "RISC-V"],
        answer: "MicroBlaze",
        type: "mcq",
        explanation: "MicroBlaze is a soft-core processor from Xilinx for FPGAs."
    },
    {
        quizId: "6851a2733b15cc07d6201ffd",
        title: "What is a major drawback of FPGAs compared to ASICs?",
        options: ["Cannot be programmed", "Fixed hardware", "Higher cost per unit", "Lower flexibility"],
        answer: "Higher cost per unit",
        type: "mcq",
        explanation: "FPGAs are more expensive than ASICs in high-volume production."
    },
    {
        quizId: "6851a2733b15cc07d6201ffd",
        title: "What happens during the 'synthesis' stage of FPGA design?",
        options: ["Logic simulation", "RTL is translated to a gate-level netlist", "Hardware wiring", "Bitstream generation"],
        answer: "RTL is translated to a gate-level netlist",
        type: "mcq",
        explanation: "Synthesis converts HDL code to a netlist of logic elements."
    },
    {
        quizId: "6851a2733b15cc07d6201ffd",
        title: "Which of these is an advantage of using FPGAs?",
        options: ["Fixed architecture", "Non-programmable", "Hardware flexibility", "Low clock speed"],
        answer: "Hardware flexibility",
        type: "mcq",
        explanation: "FPGAs can be reprogrammed to adapt to new designs or algorithms."
    },
    {
        quizId: "6851a2733b15cc07d6201ffd",
        title: "Which vendor produces the 'Stratix' family of FPGAs?",
        options: ["Xilinx", "Altera (Intel)", "Microchip", "Lattice"],
        answer: "Altera (Intel)",
        type: "mcq",
        explanation: "Stratix is a high-performance FPGA family by Altera (now part of Intel)."
    },
    {
        quizId: "6851a2733b15cc07d6201ffd",
        title: "True or False: FPGAs can implement parallel processing architectures.",
        options: ["True", "False"],
        answer: "True",
        type: "mcq",
        explanation: "FPGAs are ideal for parallel data processing due to their reconfigurable fabric."
    },
    {
        quizId: "6851a2733b15cc07d6201ffd",
        title: "Which design flow step ensures timing constraints are met?",
        options: ["RTL coding", "Simulation", "Timing analysis", "Debugging"],
        answer: "Timing analysis",
        type: "mcq",
        explanation: "Timing analysis verifies that the circuit meets performance requirements."
    }
];

const seedQuestions = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("MongoDB connected");

        await Question.deleteMany(); // Optional: clean existing data
        await Question.insertMany(questions);

        console.log("FPGA questions seeded");
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedQuestions();
