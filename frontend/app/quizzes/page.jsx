'use client';
import { getQuizzes } from '@/services/quizz';
import React, { useEffect, useState } from 'react';
import QuizCard from '@/components/QuizCard';
import Loading from '../loading';

export default function Quizzes() {
  const [quizzes, setQuizzes] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All Difficulties");
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const data = await getQuizzes();
        setQuizzes(data);
        const uniqueCategories = Array.from(new Set(data.map(q => q.category))).filter(Boolean);
        setCategories(uniqueCategories);
      } catch (err) {
        console.error(err);
        if (err.message === 'Network Error') {
          setError("⚠️ Network Error: Please check your internet connection or try again later.");
        } else {
          setError(`⚠️ ${err.message}`);
        }
      }
    };
    fetchQuizzes();
  }, []);

  // Loading state
  if (!quizzes && !error) {
    return <Loading />;
  }

  // Error state
  if (error) {
    return (
      <div className="p-6 text-red-500 font-semibold bg-red-100 rounded-md max-w-screen-md mx-auto mt-6">
        {error}
      </div>
    );
  }

  // Filter quizzes
  const filteredQuizzes = quizzes.filter((quiz) => {
    const categoryMatch = selectedCategory === "All Categories" || quiz.category === selectedCategory;
    const difficultyMatch = selectedDifficulty === "All Difficulties" || quiz.level === selectedDifficulty;
    const searchMatch = quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quiz.description.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && difficultyMatch && searchMatch;
  });

  return (
    <div className="bg-background min-h-screen">
      {/* Header - Matching Blogs page styling */}
      <div className="relative bg-gradient-to-r from-primary/10 to-primary/5 px-4 sm:px-10 md:px-16 lg:px-20 py-10">
        <div className="max-w-screen-xl mx-auto">
          <h1 className="text-4xl font-bold">Quizzes</h1>
          <p className="text-muted-foreground mt-2">
            Test your knowledge with our collection of engineering quizzes. Each quiz is designed to challenge
            your understanding and help you prepare for exams and interviews.
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-10 py-10">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Search quizzes..."
            className="w-full p-3 rounded-md border border-border bg-background text-foreground shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <select
            className="w-full p-3 rounded-md border border-border bg-background text-foreground shadow-sm"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option>All Categories</option>
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>{cat}</option>
            ))}
          </select>

          <select
            className="w-full p-3 rounded-md border border-border bg-background text-foreground shadow-sm"
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
          >
            <option>All Difficulties</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        {/* Quizzes Grid */}
        {filteredQuizzes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredQuizzes.map((quiz) => (
              <QuizCard key={quiz._id} quiz={quiz} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10 text-muted-foreground">
            No quizzes found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
}