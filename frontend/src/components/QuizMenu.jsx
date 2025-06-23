import React, { useState } from "react";

const QuizMenu = ({ quizzes, onSelect, onClose, categoryProgress }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
    <div className="bg-pink-50 rounded-xl shadow-2xl p-8 max-w-3xl w-full">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Εδώ θα βρείτε flashcards για να επαναλάβετε τις έννοιες της θεωρίας μας.
        </h2>
        <h3 className="text-xl font-bold text-gray-900 mt-6 mb-4">
          Επιλέξτε Κεφάλαιο για Flashcards
        </h3>
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        {quizzes.map((quiz) => {
          const answered = categoryProgress?.[quiz.id]?.size || 0;
          const total = quiz.questions.length;
          const percent = total ? Math.round((answered / total) * 100) : 0;
          return (
            <button
              key={quiz.id}
              className="relative rounded-lg px-6 py-2 border-2 border-pink-300 text-pink-700 bg-white font-semibold transition-colors hover:bg-pink-100 hover:border-pink-500 w-64 overflow-hidden"
              onClick={() => onSelect(quiz)}
            >
              <span className="relative z-10">{quiz.title}</span>
              <span
                className="absolute left-0 bottom-0 h-1 bg-gradient-to-r from-pink-400 to-pink-600 transition-all z-0"
                style={{ width: `${percent}%` }}
              />
            </button>
          );
        })}
      </div>
      <button
        onClick={onClose}
        className="mt-8 px-6 py-2 rounded-lg bg-pink-200 text-pink-800 font-semibold hover:bg-pink-300 transition-colors"
      >
        Κλείσιμο
      </button>
    </div>
  </div>
);

const QuizDialog = ({ quiz, isOpen, onClose, onQuestionAnswered, progress }) => {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showSolution, setShowSolution] = useState(false);

  if (!isOpen || !quiz || !quiz.questions) return null;

  const question = quiz.questions[current];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-3xl w-full">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            {quiz.title}
          </h2>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>
              Ερώτηση {current + 1} από {quiz.questions.length}
            </span>
            <button
              onClick={onClose}
              className="text-pink-600 hover:underline"
            >
              Κλείσιμο
            </button>
          </div>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {question.question}
          </h3>
          {question.image && (
            <img
              src={question.image}
              alt="Ερώτηση"
              className="w-full h-auto rounded-lg mb-4"
            />
          )}
          <div className="grid grid-cols-2 gap-4">
            {question.answers.map((answer, index) => (
              <button
                key={index}
                onClick={() => {
                  setSelected(answer);
                  setShowSolution(true);
                }}
                className={`rounded-lg px-4 py-2 font-semibold transition-all flex items-center justify-center ${
                  selected === answer
                    ? "bg-pink-500 text-white"
                    : "bg-pink-100 text-pink-700 hover:bg-pink-200"
                }`}
              >
                {answer}
              </button>
            ))}
          </div>
        </div>
        {showSolution && (
          <div className="mb-4">
            <h4 className="text-md font-semibold text-gray-800 mb-2">
              Λύση:
            </h4>
            <div className="p-4 bg-pink-50 rounded-lg border-l-4 border-pink-400">
              {question.correctAnswer}
            </div>
          </div>
        )}
        <div className="flex justify-between">
          <button
            onClick={() => {
              setShowSolution(false);
              setCurrent((prev) => Math.max(prev - 1, 0));
            }}
            className="px-4 py-2 rounded-lg bg-pink-200 text-pink-800 font-semibold hover:bg-pink-300 transition-colors"
          >
            Προηγούμενη
          </button>
          <button
            onClick={() => {
              if (selected === question.correctAnswer) {
                onQuestionAnswered();
              }
              setShowSolution(false);
              setCurrent((prev) => Math.min(prev + 1, quiz.questions.length - 1));
            }}
            className="px-4 py-2 rounded-lg bg-pink-600 text-white font-semibold hover:bg-pink-700 transition-colors"
          >
            {current === quiz.questions.length - 1 ? "Τέλος" : "Επόμενη"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizMenu;