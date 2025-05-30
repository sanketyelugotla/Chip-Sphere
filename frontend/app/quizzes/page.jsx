'use client'
import { getQuizzes } from '@/utils/quizz';
import React, { useEffect, useState } from 'react';
export default function Quizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const getdata = async () => {
    setQuizzes(await getQuizzes())
  }
  useEffect(() => {
    getdata()
  }, [])
  console.log(quizzes)
  return (
    <>
      <div className="bg-muted px-4 sm:px-10 md:px-16 lg:px-20 py-10">
        <div className="max-w-screen-xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold">Quizzes</h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-2">
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
            className="w-1/2 p-2 border rounded-md border-border shadow-sm"
          />
          {/* Filters can be added here */}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {quizzes.map((quiz, index) => (
            <div key={index} className="border rounded-lg p-4 shadow-sm border-border">
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
              <p className="text-sm text-gray-500 mb-4">{quiz.description }</p>
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
