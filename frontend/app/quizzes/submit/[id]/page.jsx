'use client';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { getAttempt } from '@/services/quizz';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const Submit = ({ params }) => {
    const [attempt, setAttempt] = useState(null);
    const [error, setError] = useState(null);
    const token = Cookies.get("token");
    const { id } = React.use(params);
    const attemptId = id;
    const router = useRouter();

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 10, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.2,
                ease: "easeOut"
            }
        }
    };

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

    if (error) return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-500 p-4"
        >
            Error: {error}
        </motion.div>
    );

    if (!attempt) return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4"
        >
            Loading...
        </motion.div>
    );

    const { score, totalQuestions, answers } = attempt;

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="max-w-3xl mx-auto px-5 py-8 text-foreground"
        >
            <motion.button
                variants={itemVariants}
                onClick={() => router.back()}
                className="flex items-center text-primary/80 cursor-pointer mb-6 hover:text-primary"
                whileHover={{ x: -3 }}
            >
                ← Back to Quizzes
            </motion.button>

            <motion.header variants={itemVariants} className="mb-6">
                <h1 className="text-2xl font-semibold text-primary mb-2">Quiz Completed!</h1>
                <p className="text-muted-foreground">
                    Your score: <span className="text-accent-foreground font-bold">{score}</span> out of {totalQuestions}
                </p>
                <p className="text-muted-foreground">
                    Correct: {score} | Incorrect: {totalQuestions - score}
                </p>
            </motion.header>

            <motion.div variants={containerVariants} className="space-y-8">
                {answers.map((answer, index) => {
                    const q = answer.questionId;
                    const selectedAnswer = answer.selectedAnswer;
                    const correctAnswer = answer.questionId.answer;

                    return (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="bg-secondary-background rounded-lg p-6 border border-border"
                        >
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

                                    if (isUserSelected && isCorrectOption) {
                                        optionClasses += " border-l-4 border-success text-success-foreground";
                                    } else if (isUserSelected) {
                                        optionClasses += " border-l-4 border-error text-error-foreground";
                                    } else if (isCorrectOption) {
                                        optionClasses += " border-l-4 border-success text-success-foreground";
                                    } else {
                                        optionClasses += " bg-container-background border-border";
                                    }

                                    return (
                                        <motion.li
                                            key={oIndex}
                                            initial={{ opacity: 0, y: 5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: oIndex * 0.05 }}
                                            className={optionClasses}
                                        >
                                            {option}
                                            {isCorrectOption && !isUserSelected && (
                                                <span className="ml-2 text-xs text-muted-foreground">(Correct Answer)</span>
                                            )}
                                        </motion.li>
                                    );
                                })}
                            </ul>

                            {q.explanation && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="mt-4 p-4 bg-muted rounded-lg"
                                >
                                    <h4 className="font-medium mb-2">Explanation:</h4>
                                    <p className="text-muted-foreground">{q.explanation}</p>
                                </motion.div>
                            )}
                        </motion.div>
                    );
                })}
            </motion.div>
        </motion.div>
    );
};

export default Submit;