'use client'
import React, { useState, useEffect } from 'react';

export default function QuizPage({ params }) {
  const { id } = params;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const questions = [
    {
      title: "What does FPGA stand for?",
      options: ["Field Programmable Gate Array", "Fast Processing Gate Array", "Flexible Programmable Gate Architecture", "Field Processing Gate Array"],
      answer: "Field Programmable Gate Array",
      type: "mcq",
      explanation: "FPGA stands for Field Programmable Gate Array, a type of reconfigurable hardware."
    },
    {
      title: "Which of the following is a key characteristic of FPGAs?",
      options: ["Fixed functionality", "Low reconfigurability", "Hardware reprogrammability", "Only used in final products"],
      answer: "Hardware reprogrammability",
      type: "mcq",
      explanation: "FPGAs are known for their reprogrammability, allowing hardware-level changes after manufacturing."
    },
    {
      title: "Which logic element is commonly used in FPGA architecture?",
      options: ["AND gates", "Flip-flops", "LUTs", "Counters"],
      answer: "LUTs",
      type: "mcq",
      explanation: "FPGAs use Look-Up Tables (LUTs) as the fundamental logic elements."
    },
    {
      title: "The primary building block of an FPGA is the:",
      options: ["ALU", "Control Unit", "Logic Block", "Bus Interface"],
      answer: "Logic Block",
      type: "mcq",
      explanation: "Logic blocks (including LUTs, flip-flops) are the fundamental units of FPGA architecture."
    },
    {
      title: "What is the role of interconnects in an FPGA?",
      options: ["Store data", "Process signals", "Provide clock", "Connect logic blocks"],
      answer: "Connect logic blocks",
      type: "mcq",
      explanation: "Interconnects allow logic blocks to communicate in FPGAs."
    },
    {
      title: "What is the main purpose of CLBs (Configurable Logic Blocks)?",
      options: ["Data transfer", "Memory access", "Logic implementation", "Clock generation"],
      answer: "Logic implementation",
      type: "mcq",
      explanation: "CLBs are used to implement logic functions using LUTs and flip-flops."
    },
    {
      title: "Which of the following is NOT typically part of an FPGA?",
      options: ["LUT", "Flip-Flop", "Register File", "Interconnect"],
      answer: "Register File",
      type: "mcq",
      explanation: "Register files are common in CPUs but not typically found as standalone blocks in FPGAs."
    },
    {
      title: "Which component stores configuration data in an SRAM-based FPGA?",
      options: ["ROM", "EEPROM", "SRAM", "DRAM"],
      answer: "SRAM",
      type: "mcq",
      explanation: "SRAM-based FPGAs use SRAM cells to store configuration data."
    },
    {
      title: "Which of the following is a typical application of FPGAs?",
      options: ["Video transcoding", "Real-time signal processing", "ASIC prototyping", "All of the above"],
      answer: "All of the above",
      type: "mcq",
      explanation: "FPGAs are versatile and used in many areas like video, DSP, and ASIC prototyping."
    },
    {
      title: "Which FPGA vendor is known for the Vivado Design Suite?",
      options: ["Intel", "Xilinx", "Lattice", "Microsemi"],
      answer: "Xilinx",
      type: "mcq",
      explanation: "Xilinx provides the Vivado Design Suite for FPGA development."
    },
    {
      title: "The FPGA configuration is typically done via:",
      options: ["USB Drive", "JTAG", "HDMI", "PCIe"],
      answer: "JTAG",
      type: "mcq",
      explanation: "JTAG is a standard method for programming and debugging FPGAs."
    },
    {
      title: "Which tool is commonly used to write FPGA logic?",
      options: ["C++", "Verilog", "Python", "Java"],
      answer: "Verilog",
      type: "mcq",
      explanation: "Verilog (or VHDL) is a hardware description language used for FPGA design."
    },
    {
      title: "Which of these is a hardware description language (HDL)?",
      options: ["HTML", "VHDL", "SQL", "JSON"],
      answer: "VHDL",
      type: "mcq",
      explanation: "VHDL is used to describe digital logic circuits."
    },
    {
      title: "Which step occurs first in FPGA design flow?",
      options: ["Bitstream generation", "Synthesis", "Place and route", "RTL design"],
      answer: "RTL design",
      type: "mcq",
      explanation: "RTL design is the starting point where the behavior is described using HDL."
    },
    {
      title: "What does the term 'place and route' mean in FPGA design?",
      options: ["Code formatting", "Assigning logic to gates", "Physically mapping logic to FPGA resources", "Testing"],
      answer: "Physically mapping logic to FPGA resources",
      type: "mcq",
      explanation: "Place and route maps the synthesized logic to specific areas on the FPGA."
    },
    {
      title: "What is a 'bitstream' in FPGA terminology?",
      options: ["A signal pattern", "A binary file for configuration", "An HDL file", "Clock pulses"],
      answer: "A binary file for configuration",
      type: "mcq",
      explanation: "Bitstream is the final binary file used to configure the FPGA."
    },
    {
      title: "What makes an FPGA reprogrammable?",
      options: ["Flash memory", "SRAM configuration", "ROM", "Fixed logic"],
      answer: "SRAM configuration",
      type: "mcq",
      explanation: "SRAM cells in FPGAs can be reprogrammed, allowing flexibility."
    },
    {
      title: "Which is more power-efficient for a fixed task?",
      options: ["FPGA", "ASIC", "CPU", "GPU"],
      answer: "ASIC",
      type: "mcq",
      explanation: "ASICs are tailored for a specific task, making them more power-efficient than FPGAs."
    },
    {
      title: "Which of the following is a soft processor core available for FPGAs?",
      options: ["ARM Cortex-A9", "Intel Core i5", "MicroBlaze", "RISC-V"],
      answer: "MicroBlaze",
      type: "mcq",
      explanation: "MicroBlaze is a soft-core processor from Xilinx for FPGAs."
    },
    {
      title: "What is a major drawback of FPGAs compared to ASICs?",
      options: ["Cannot be programmed", "Fixed hardware", "Higher cost per unit", "Lower flexibility"],
      answer: "Higher cost per unit",
      type: "mcq",
      explanation: "FPGAs are more expensive than ASICs in high-volume production."
    },
    {
      title: "What happens during the 'synthesis' stage of FPGA design?",
      options: ["Logic simulation", "RTL is translated to a gate-level netlist", "Hardware wiring", "Bitstream generation"],
      answer: "RTL is translated to a gate-level netlist",
      type: "mcq",
      explanation: "Synthesis converts HDL code to a netlist of logic elements."
    },
    {
      title: "Which of these is an advantage of using FPGAs?",
      options: ["Fixed architecture", "Non-programmable", "Hardware flexibility", "Low clock speed"],
      answer: "Hardware flexibility",
      type: "mcq",
      explanation: "FPGAs can be reprogrammed to adapt to new designs or algorithms."
    },
    {
      title: "Which vendor produces the 'Stratix' family of FPGAs?",
      options: ["Xilinx", "Altera (Intel)", "Microchip", "Lattice"],
      answer: "Altera (Intel)",
      type: "mcq",
      explanation: "Stratix is a high-performance FPGA family by Altera (now part of Intel)."
    },
    {
      title: "True or False: FPGAs can implement parallel processing architectures.",
      options: ["True", "False"],
      answer: "True",
      type: "mcq",
      explanation: "FPGAs are ideal for parallel data processing due to their reconfigurable fabric."
    },
    {
      title: "Which design flow step ensures timing constraints are met?",
      options: ["RTL coding", "Simulation", "Timing analysis", "Debugging"],
      answer: "Timing analysis",
      type: "mcq",
      explanation: "Timing analysis verifies that the circuit meets performance requirements."
    }
  ];
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    // Check if answer is correct
    if (selectedOption === questions[currentQuestionIndex].answer) {
      setScore(prev => prev + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
    } else {
      handleSubmit();
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setSelectedOption(null);
    }
  };

  const handleSubmit = () => {
    setQuizSubmitted(true);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (quizSubmitted) {
    return (
      <div className="max-w-3xl mx-auto px-5 py-8 text-slate-200">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold text-sky-300 mb-2">Quiz Completed!</h1>
          <p className="text-slate-400">Your score: {score} out of {questions.length}</p>
        </header>

        <div className="bg-slate-800 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-medium mb-4">Quiz Results</h2>
          <p>You scored {Math.round((score / questions.length) * 100)}%</p>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="max-w-3xl my-10 mx-auto px-5 py-8 text-secondary-text  relative bg-gradient-to-r from-primary/10 to-primary/5">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-foreground mb-2">FPGA Architecture and Design</h1>
        <p className="text-muted-foreground text-sm mb-6">Test your knowledge of FPGA architecture, design flow, and implementation techniques.</p>

        <div className="mb-6">
          <div className="flex justify-between text-sm text-foreground mb-2">
            <span>Progress</span>
            <span>{Math.round(progressPercentage)}%</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-1.5">
            <div
              className="bg-sky-300 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6 pb-2 border-b border-slate-800">
          <span className="text-foreground font-medium">Question {currentQuestionIndex + 1} of {questions.length}</span>
          <span className="bg-background px-3 py-1 rounded-full text-xs text-destructive font-bold ">
            ⏱ {formatTime(timeLeft)} remaining
          </span>
        </div>
      </header>

      <main>
        <div className="bg-background rounded-lg p-6 mb-6">
          <div className="text-lg mb-6 leading-relaxed text-foreground">
            {currentQuestion.title}
          </div>

          <ul className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <li
                key={index}
                className={`bg-primary p-4 rounded-lg cursor-pointer transition-all 
                  ${selectedOption === option ? 'bg-blue-900 border-l-4 border-sky-300' : ''}
                  hover:bg-slate-600`}
                onClick={() => handleOptionSelect(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex justify-between mt-6">
          <button
            className={`px-6 py-2 rounded-lg font-medium transition-all
              ${currentQuestionIndex === 0 ? 'bg-slate-700 text-slate-500 cursor-not-allowed' : 'bg-slate-700 text-slate-200 hover:bg-slate-600'}`}
            onClick={handlePrev}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </button>
          <button
            className={`px-6 py-2 rounded-lg font-medium transition-all
              ${!selectedOption ? 'bg-blue-900 text-blue-300 cursor-not-allowed' : 'bg-blue-800 text-white hover:bg-blue-700'}`}
            onClick={handleNext}
            disabled={!selectedOption}
          >
            {currentQuestionIndex === questions.length - 1 ? 'Submit' : 'Next'}
          </button>
        </div>
      </main>


    </div>
  );
}