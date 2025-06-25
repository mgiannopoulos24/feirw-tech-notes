import React from 'react';

const QuizMenu = ({ quizzes, onSelect, onClose, categoryProgress }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
    <div className="bg-pink-50 rounded-xl shadow-2xl p-8 max-w-4xl w-full">
      <div className="mb-6 text-center">
        <h3 className="text-xl font-bold text-gray-900 mt-6 mb-4">
          Επιλέξτε Κεφάλαιο για Quiz
        </h3>
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        {quizzes.map((quiz) => (
          <button
            key={quiz.id}
            onClick={() => onSelect(quiz)}
            className="bg-pink-100 text-pink-800 font-semibold rounded-full px-8 py-2 text-sm hover:bg-pink-200 transition-all shadow-sm"
          >
            {quiz.title}
          </button>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <button
          onClick={onClose}
          className="bg-pink-200 text-pink-800 font-semibold rounded-full px-8 py-2 hover:bg-pink-300 transition-all shadow-sm"
        >
          Κλείσιμο
        </button>
      </div>
    </div>
  </div>
);

export default QuizMenu;
