'use client';
import React, { useState, useEffect } from 'react';
import { getQuestions, submitAnswers } from '@/utils/quizz';

export default function QuizPage({ params }) {
  const { id } = React.use(params);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState(null);
  const [answers, setAnswers] = useState([]);

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

    getData();

    return () => clearInterval(timer);
  }, []);

  const getData = async () => {
    const data = await getQuestions(id);
    setQuestions(Array.isArray(data) ? data : []);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);

    const currentQuestionId = questions[currentQuestionIndex]._id;

    setAnswers(prev => {
      const updated = [...prev];
      const existing = updated.find(a => a.questionId === currentQuestionId);
      if (existing) {
        existing.selected = option;
      } else {
        updated.push({ questionId: currentQuestionId, selected: option });
      }
      return updated;
    });
  };

  const handleNext = () => {
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

  const handleSubmit = async () => {
    const response = await submitAnswers(id, answers);
    setScore(response.result.correct);
    setQuizSubmitted(true);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (!questions) {
    return <p className="text-white text-center mt-10">Loading questions...</p>;
  }

  if (questions.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-5 py-8 text-slate-200 text-center">
        <h1 className="text-2xl font-semibold text-red-400">No Questions Available</h1>
        <p className="text-slate-400 mt-2">It looks like there are no questions in this quiz. Please check back later or contact the administrator.</p>
      </div>
    );
  }

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
    <div className="max-w-3xl my-10 mx-auto px-5 py-8 text-secondary-text relative bg-gradient-to-r from-primary/10 to-primary/5">
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
          <span className="bg-background px-3 py-1 rounded-full text-xs text-destructive font-bold">
            ⏱ {formatTime(timeLeft)} remaining
          </span>
        </div>
      </header>

      <main>
        <div className="bg-background rounded-lg p-6 mb-6">
          <div className="text-lg mb-6 leading-relaxed text-foreground">
            {currentQuestion?.title}
          </div>

          <ul className="space-y-3">
            {currentQuestion?.options.map((option, index) => (
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
