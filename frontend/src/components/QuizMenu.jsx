import React, { useState } from 'react';

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

export default QuizMenu;
