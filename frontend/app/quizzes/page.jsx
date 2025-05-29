import React from 'react';

const quizzes = [
  {
    level: 'Beginner',
    title: 'VLSI Design Fundamentals',
    duration: '30 min',
    category: 'VLSI',
    questions: 20,
    color: 'blue',
  },
  {
    level: 'Intermediate',
    title: 'Digital Circuit Analysis',
    duration: '25 min',
    category: 'Digital Electronics',
    questions: 15,
    color: 'blue',
  },
  {
    level: 'Advanced',
    title: 'Semiconductor Physics',
    duration: '40 min',
    category: 'Electronics',
    questions: 25,
    color: 'red',
  },
  {
    level: 'Intermediate',
    title: 'PCB Design Principles',
    duration: '30 min',
    category: 'Hardware Design',
    questions: 18,
    color: 'blue',
  },
  {
    level: 'Advanced',
    title: 'Analog Circuit Design',
    duration: '35 min',
    category: 'Analog Electronics',
    questions: 22,
    color: 'red',
  },
  {
    level: 'Beginner',
    title: 'CMOS Technology Basics',
    duration: '25 min',
    category: 'VLSI',
    questions: 18,
    color: 'blue',
  },
  {
    level: 'Intermediate',
    title: 'Verilog HDL Programming',
    duration: '30 min',
    category: 'HDL',
    questions: 20,
    color: 'blue',
  },
  {
    level: 'Advanced',
    title: 'FPGA Architecture and Design',
    duration: '40 min',
    category: 'FPGA',
    questions: 25,
    color: 'red',
  },
];

export default function Quizzes() {
  return (
    <>
      <div className="bg-container-background px-4 sm:px-10 md:px-16 lg:px-20 py-10">
        <div className="max-w-screen-xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold">Quizzes</h1>
          <p className="text-sm sm:text-base text-secondary-foreground mt-2">
            Test your knowledge with our collection of engineering quizzes. Each quiz is designed to challenge
            your understanding and help you prepare for exams and interviews.
          </p>
        </div>
      </div>


      <div className="px-20 py-10 ">
        <div className="flex justify-between items-center mb-6">
          <input
            type="text"
            placeholder="Search quizzes..."
            className="w-1/2 p-2 border rounded-md border-secondary-background shadow-sm"
          />
          {/* Filters can be added here */}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {quizzes.map((quiz, index) => (
            <div key={index} className="border rounded-lg p-4 shadow-sm border-secondary-background">
              <div className="flex justify-between items-center text-sm mb-2">
                <span
                  className={`px-2 py-1 rounded-full text-white ${quiz.color === 'red' ? 'bg-red-500' : 'bg-blue-500'
                    }`}
                >
                  {quiz.level}
                </span>
                <span className="text-gray-500">{quiz.duration}</span>
              </div>
              <h2 className="font-semibold text-lg mb-1">{quiz.title}</h2>
              <p className="text-sm text-gray-500 mb-4">{quiz.category} · {quiz.questions} questions</p>
              <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
                Start Quiz
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
