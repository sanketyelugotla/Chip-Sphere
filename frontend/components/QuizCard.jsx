import { CiUser } from "react-icons/ci";
import Link from "next/link";

const QuizCard = ({ quiz }) => {

    return (
        <div className="border rounded-lg p-4 shadow-sm border-border hover:shadow-md transition-shadow h-full flex flex-col">
            <div className="flex justify-between items-center text-xs sm:text-sm mb-2">
                <span
                    className={`px-2 py-1 rounded-full text-white ${quiz.level === 'Advanced'
                        ? 'bg-red-500'
                        : quiz.level === 'Beginner'
                            ? 'bg-blue-500'
                            : 'bg-yellow-500'
                        }`}
                >
                    {quiz.level}
                </span>
                <span className="text-gray-500 border border-border rounded-full px-2 py-0.5 whitespace-nowrap">
                    {quiz.duration}
                </span>
            </div>

            <h2 className="font-semibold text-base sm:text-lg mb-1 line-clamp-2">
                {quiz.title}
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4 line-clamp-2">
                {quiz.description}
            </p>

            <div className="flex gap-2 mb-1 items-center">
                <CiUser className="text-sm" />
                <p className="text-xs sm:text-sm text-gray-500 truncate">
                    {quiz.author?.name || 'Unknown Author'}
                </p>
            </div>

            <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
                {quiz.category} · {quiz.questions} questions
            </p>

            <Link href={`/quizzes/${quiz._id}`}>
                <button
                    className="mt-auto w-full bg-blue-600 text-white py-1.5 sm:py-2 rounded-md hover:bg-blue-700 transition text-sm sm:text-base cursor-pointer"
                >
                    Start Quiz
                </button>
            </Link>
        </div>
    );
};

export default QuizCard;
