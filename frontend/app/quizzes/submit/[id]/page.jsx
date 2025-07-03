'use client';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { getAttempt } from '@/services/quizz';
import { usePathname, useRouter } from 'next/navigation';
const Submit = ({ params }) => {
    const [attempt, setAttempt] = useState(null);
    const [error, setError] = useState(null);
    const token = Cookies.get("token");
    const { id } = React.use(params);
    const attemptId = id
    const router = useRouter()

    useEffect(() => {
        const fetchAttempt = async () => {
            try {
                const data = await getAttempt(token, attemptId);
                setAttempt(data);
            } catch (err) {
                setError(err.message);
            }
        };
        fetchAttempt();
    }, []);

    if (error) return <div className="text-red-500 p-4">Error: {error}</div>;
    if (!attempt) return <div className="p-4">Loading...</div>;

    const { score, totalQuestions, answers } = attempt;
    console.log(answers)

    return (
        <div className="max-w-3xl mx-auto px-5 py-8 text-foreground">
            <button
                onClick={() => router.back()}
                className="flex items-center text-primary/80 cursor-pointer mb-6 hover:text-primary"
            >
                ← Back to Quizzes
            </button>
            <header className="mb-6">
                <h1 className="text-2xl font-semibold text-primary mb-2">Quiz Completed!</h1>
                <p className="text-muted-foreground">
                    Your score: <span className="text-accent-foreground font-bold">{score}</span> out of {totalQuestions}
                </p>
                <p className="text-muted-foreground">
                    Correct: {score} | Incorrect: {totalQuestions - score}
                </p>
            </header>

            <div className="space-y-8">
                {answers.map((answer, index) => {
                    const q = answer.questionId;
                    const selectedAnswer = answer.selectedAnswer;
                    const correctAnswer = answer.questionId.answer

                    return (
                        <div key={index} className="bg-secondary-background rounded-lg p-6 border border-border">
                            <h3 className="text-lg font-medium mb-4">
                                Question {index + 1}: {q.title}
                                {answer.isCorrect ? (
                                    <span className="ml-2 text-sm text-green-600">✓ Correct</span>
                                ) : (
                                    <span className="ml-2 text-sm text-red-600">✗ Incorrect</span>
                                )}
                            </h3>

                            <ul className="space-y-3 mb-4">
                                {q.options.map((option, oIndex) => {
                                    let optionClasses = "p-4 rounded-lg border";
                                    const isUserSelected = option === answer.selectedAnswer;
                                    const isCorrectOption = option === correctAnswer;
                                    // console.log(answer.selectedAnswer, "-", correctAnswer);

                                    if (isUserSelected && isCorrectOption) {
                                        optionClasses += " border-l-4 border-success  text-success-foreground";
                                    } else if (isUserSelected) {
                                        optionClasses += " border-l-4 border-error  text-error-foreground";
                                    } else if (isCorrectOption) {
                                        optionClasses += " border-l-4 border-success  text-success-foreground";
                                    } else {
                                        optionClasses += " bg-container-background border-border";
                                    }

                                    return (
                                        <li
                                            key={oIndex}
                                            className={optionClasses}
                                        >
                                            {option}
                                            {isCorrectOption && !isUserSelected && (
                                                <span className="ml-2 text-xs text-muted-foreground">(Correct Answer)</span>
                                            )}
                                        </li>
                                    );
                                })}
                            </ul>

                            {q.explanation && (
                                <div className="mt-4 p-4 bg-muted rounded-lg">
                                    <h4 className="font-medium mb-2">Explanation:</h4>
                                    <p className="text-muted-foreground">{q.explanation}</p>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Submit;
