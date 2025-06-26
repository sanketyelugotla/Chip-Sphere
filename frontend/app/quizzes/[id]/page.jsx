'use client';
import React, { useState, useEffect } from 'react';
import { getQuestions, submitAnswers } from '@/services/quizz';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export default function QuizPage({ params }) {
  const { id } = React.use(params);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState(null);
  const [answers, setAnswers] = useState([]);
  const router = useRouter()

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.replace("/auth?mode=login");
      return;
    }
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

  useEffect(() => {
    // Set selected option if returning to previous question
    if (questions && questions[currentQuestionIndex]) {
      const currentAnswer = answers.find(a => a.questionId === questions[currentQuestionIndex]._id);
      setSelectedOption(currentAnswer?.selected || null);
    }
  }, [currentQuestionIndex, questions]);

  const getData = async () => {
    const token = Cookies.get("token");
    if (!token) router.push('/auth?mode=login');
    const data = await getQuestions(id, token);

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
    } else {
      handleSubmit();
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    const token = Cookies.get('token')
    const response = await submitAnswers(id, answers, token);
    console.log(response);
    setScore(response.result.correct);
    setQuizSubmitted(true);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (!questions) {
    return <p className="text-foreground text-center mt-10">Loading questions...</p>;
  }

  if (questions.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-5 py-8 text-muted-foreground text-center">
        <h1 className="text-2xl font-semibold text-destructive mb-2">No Questions Available</h1>
        <p className="text-muted-foreground mt-2">It looks like there are no questions in this quiz. Please check back later or contact the administrator.</p>
      </div>
    );
  }

  if (quizSubmitted) {
    return (
      <div className="max-w-3xl mx-auto px-5 py-8 text-foreground">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold text-primary mb-2">Quiz Completed!</h1>
          <p className="text-muted-foreground">Your score: <span className="text-accent-foreground font-bold">{score}</span> out of {questions.length}</p>
        </header>

        <div className="bg-secondary-background rounded-lg p-6 mb-6 border border-border">
          <h2 className="text-xl font-medium mb-4 text-primary">Quiz Results</h2>
          <p className="text-foreground">
            You scored <span className="text-primary font-bold">{Math.round((score / questions.length) * 100)}%</span>
          </p>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="max-w-3xl my-10 mx-auto px-5 py-8 text-foreground relative bg-container-background rounded-xl shadow-lg border border-border">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-primary mb-2">FPGA Architecture and Design</h1>
        <p className="text-muted-foreground text-sm mb-6">Test your knowledge of FPGA architecture, design flow, and implementation techniques.</p>

        <div className="mb-6">
          <div className="flex justify-between text-sm text-foreground mb-2">
            <span>Progress</span>
            <span>{Math.round(progressPercentage)}%</span>
          </div>
          <div className="w-full bg-secondary-background rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6 pb-2 border-b border-border">
          <span className="text-foreground font-medium">Question {currentQuestionIndex + 1} of {questions.length}</span>
          <span className="bg-secondary-text px-3 py-1 rounded-full text-xs text-red-500 font-extrabold border border-border">
            ⏱ {formatTime(timeLeft)} remaining
          </span>
        </div>
      </header>

      <main>
        <div className="bg-container-background rounded-lg p-6 mb-6 border border-border">
          <div className="text-lg mb-6 leading-relaxed text-foreground">
            {currentQuestion?.title}
          </div>

          <ul className="space-y-3 mb-6">
            {currentQuestion?.options.map((option, index) => (
              <li
                key={index}
                className={`p-4 rounded-lg cursor-pointer transition-all border border-border
                  ${selectedOption === option ? 'border-primary border-l-4 text-primary' : 'bg-secondary-background hover:bg-secondary'}`}
                onClick={() => handleOptionSelect(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex justify-between mt-6">
          <button
            className={`px-6 py-2 rounded-lg font-medium transition-all border border-border cursor-pointer
              ${currentQuestionIndex === 0 ? 'bg-secondary text-muted-foreground cursor-not-allowed' : 'bg-secondary hover:bg-secondary-background text-foreground'}`}
            onClick={handlePrev}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </button>
          <button
            className={`px-6 py-2 rounded-lg font-medium transition-all border border-primary cursor-pointer
              ${!selectedOption ? 'bg-primary/50 hover:bg-primary/90  text-primary-foreground' : 'bg-primary/90 hover:bg-primary/90 text-primary-foreground'}`}
            onClick={handleNext}
          >
            {currentQuestionIndex === questions.length - 1 ? 'Submit' : !selectedOption ? "Skip" : "Next"}
          </button>
        </div>
      </main>
    </div>
  );
}