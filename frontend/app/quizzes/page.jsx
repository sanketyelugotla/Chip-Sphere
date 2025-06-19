// app/quizzes/page.jsx
'use client'

import { getQuizzes } from '@/utils/quizz';
import React, { useEffect, useState } from 'react';
import QuizCard from '@/components/QuizCard';

export default function Quizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const [categories, setCategories] = useState([]);

  const getdata = async () => {
    const data = await getQuizzes();
    setQuizzes(data);
    const uniqueCategories = Array.from(new Set(data.map(q => q.category))).filter(Boolean);
    setCategories(uniqueCategories);
  }

  useEffect(() => {
    getdata();
  }, []);

  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All Difficulties");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredQuizzes = quizzes.filter((quiz) => {
    const categoryMatch =
      selectedCategory === "All Categories" || quiz.category === selectedCategory;
    const difficultyMatch =
      selectedDifficulty === "All Difficulties" || quiz.level === selectedDifficulty;
    const searchMatch =
      quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quiz.description.toLowerCase().includes(searchQuery.toLowerCase());

    return categoryMatch && difficultyMatch && searchMatch;
  });

  return (
    <>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary/10 to-primary/5 px-4 sm:px-6 md:px-8 lg:px-20 py-8 sm:py-10">
        <div className="max-w-screen-xl mx-auto">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">Quizzes</h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-2 max-w-3xl">
            Test your knowledge with our collection of engineering quizzes. Each quiz is designed to challenge
            your understanding and help you prepare for exams and interviews.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 md:px-8 lg:px-20 py-6 sm:py-8 md:py-10">
        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-3 sm:gap-4">
          <input
            type="text"
            placeholder="Search quizzes..."
            className="w-full sm:w-1/2 p-2 border rounded-md border-border shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-1/2">
            <select
              className="w-full p-2 border rounded-md border-border shadow-sm h-10 bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="All Categories">All Categories</option>
              {categories.map((cat, idx) => (
                <option key={idx} value={cat}>{cat}</option>
              ))}
            </select>

            <select
              className="w-full p-2 border rounded-md border-border shadow-sm h-10 bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
            >
              <option value="All Difficulties">All Difficulties</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
        </div>

        {/* Quizzes Grid */}
        {filteredQuizzes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredQuizzes.map((quiz, index) => (
              <QuizCard key={index} quiz={quiz} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500">No quizzes found matching your criteria.</p>
          </div>
        )}
      </div>
    </>
  );
}