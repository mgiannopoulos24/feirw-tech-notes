import React from 'react';

const QuizMenu = ({ quizzes, onSelect, onClose, categoryProgress, categoryAnswers }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
    <div className="bg-pink-50 rounded-xl shadow-2xl p-8 max-w-4xl w-full">
      <div className="mb-6 text-center">
        <h3 className="text-xl font-bold text-gray-900 mt-6 mb-4">
          Επιλέξτε Κεφάλαιο για Quiz
        </h3>
      </div>
      <div className="flex flex-wrap justify-center gap-y-4 gap-x-6 mb-8">
        {quizzes.map((quiz) => {
          const answered = Object.keys(categoryAnswers?.[quiz.id] || {}).length;
          const total = quiz.questions.length;
          const percent = total ? Math.round((answered / total) * 100) : 0;
          return (
            <button
              key={quiz.id}
              onClick={() => onSelect(quiz)}
              className="relative inline-flex items-center font-semibold rounded-full px-6 py-2 text-base shadow-sm bg-white text-pink-700 hover:bg-pink-200 transition-all overflow-hidden"
              style={{ minWidth: 'fit-content' }}
            >
              {/* Progress bar as background */}
              <span
                className="absolute left-0 top-0 h-full bg-pink-300 z-0 transition-all"
                style={{ width: `${percent}%` }}
              />
              {/* Quiz title above progress bar */}
              <span className="relative z-10">{quiz.title}</span>
            </button>
          );
        })}
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
