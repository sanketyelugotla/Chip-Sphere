'use client'
import { getQuizzes } from '@/utils/quizz';
import { CiUser } from "react-icons/ci";
import React, { useEffect, useState } from 'react';
export default function Quizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const [categories, setCategories] = useState([]);
  const getdata = async () => {
    const data = await getQuizzes();
    setQuizzes(data)
    const uniqueCategories = Array.from(new Set(data.map(q => q.category))).filter(Boolean);
    setCategories(uniqueCategories);
  }
  useEffect(() => {
    getdata()
  }, [])
  console.log(quizzes)
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All Difficulties");
  const filteredQuizzes = quizzes.filter((quiz) => {
    const categoryMatch =
      selectedCategory === "All Categories" || quiz.category === selectedCategory;
    const difficultyMatch =
      selectedDifficulty === "All Difficulties" || quiz.level === selectedDifficulty;

    return categoryMatch && difficultyMatch;
  });

  return (
    <>
      <div className="relative bg-gradient-to-r from-primary/10 to-primary/5 px-4 sm:px-10 md:px-16 lg:px-20 py-10">
        <div className="max-w-screen-xl mx-auto">
          <h1 className="text-2xl sm:text-4xl font-bold">Quizzes</h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-2">
            Test your knowledge with our collection of engineering quizzes. Each quiz is designed to challenge
            your understanding and help you prepare for exams and interviews.
          </p>
        </div>
      </div>


      <div className="px-30 py-10 ">
        <div className="flex justify-between items-center mb-6 gap-2">
          <input
            type="text"
            placeholder="Search quizzes..."
            className="w-1/2 p-2 border rounded-md border-border shadow-sm"
          />
          {/* Filters can be added here */}
          <select
            className='w-1/4 p-2 border rounded-md border-border shadow-sm h-10 bg-background'
            value={selectedCategory}

            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="All Categories">All Categories</option>
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>{cat}</option>
            ))}

          </select>

          <select name="" id="" className='w-1/4 p-2 border rounded-md border-border shadow-sm h-10 bg-background'

            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
          >
            <option value="All Difficulties" >All Difficulties</option>
            <option value="Intermediate" >Intermediate</option>
            <option value="Beginner" >Beginner</option>
            <option value="Advanced" >Advanced</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredQuizzes.map((quiz, index) => (
            <div key={index} className="border rounded-lg p-4 shadow-sm border-border">
              <div className="flex justify-between items-center text-sm mb-2">
                <span
                  className={`px-2 py-1 rounded-full text-white ${quiz.level === 'Advanced' ? 'bg-red-500' : quiz.level === 'Beginner' ? 'bg-blue-500' : 'bg-intermediate'
                    }`}
                >
                  {quiz.level}
                </span>
                <span className="text-gray-500 border border-border rounded-full px-2 py-0.5">{quiz.duration}</span>
              </div>
              <h2 className="font-semibold text-lg mb-1">{quiz.title}</h2>
              <p className="text-sm text-gray-500 mb-4">{quiz.description}</p>
              <div className='flex gap-2 mb-1'  >
                <CiUser />
                <p className="text-sm text-gray-500 ">
                  {quiz.author.name}
                </p>
              </div>
              <p className="text-sm text-gray-500 mb-4">{quiz.category} · {quiz.questions} questions</p>
              <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
                Start Quiz
              </button>
            </div>
          ))}
        </div>
      </div >
    </>
  );
}
