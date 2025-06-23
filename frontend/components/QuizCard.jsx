import { CiUser } from "react-icons/ci";
import Link from "next/link";

const QuizCard = ({ quiz }) => {
    const difficultyColors = {
        'Beginner': 'bg-green-500',
        'Intermediate': 'bg-yellow-500',
        'Advanced': 'bg-red-500'
    };

    return (
        <div className="border border-border rounded-lg overflow-hidden shadow-sm bg-container-background hover:shadow-md transition-all duration-200 hover:-translate-y-1">
            <div className="p-5 flex flex-col h-full">
                {/* Difficulty and Duration */}
                <div className="flex justify-between items-center mb-4">
                    <span className={`px-3 py-1 rounded-full text-white text-xs font-medium ${difficultyColors[quiz.level]}`}>
                        {quiz.level}
                    </span>
                    <span className="text-xs text-muted-foreground border border-border rounded-full px-3 py-1">
                        {quiz.duration}
                    </span>
                </div>

                {/* Quiz Title and Description */}
                <h2 className="text-xl font-bold mb-2 line-clamp-2">
                    {quiz.title}
                </h2>
                <p className="text-muted-foreground mb-4 line-clamp-3">
                    {quiz.description}
                </p>

                {/* Author and Meta Info */}
                <div className="flex items-center gap-2 mb-2">
                    <CiUser className="text-muted-foreground" />
                    <p className="text-sm text-muted-foreground truncate">
                        {quiz.author?.name || 'Unknown Author'}
                    </p>
                </div>
                <div className="text-sm text-muted-foreground mb-4">
                    {quiz.category} · {quiz.questions} questions
                </div>

                {/* Start Button */}
                <Link
                    href={`/quizzes/${quiz._id}`}
                    className="mt-auto w-full text-center bg-primary text-background py-2 px-4 rounded-md hover:bg-primary/90 transition"
                >
                    Start Quiz
                </Link>
            </div>
        </div>
    );
};

export default QuizCard;