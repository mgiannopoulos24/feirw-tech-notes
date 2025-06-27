import React, { useEffect, useState } from 'react';
import { fetchAllQuizzes } from '../utils/quizUtils';

const QuizMenu = ({ onSelect, onClose, categoryAnswers }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadQuizzes = async () => {
      setLoading(true);
      try {
        const loadedQuizzes = await fetchAllQuizzes();
        setQuizzes(loadedQuizzes);
      } catch (error) {
        console.error('Error loading quizzes:', error);
      } finally {
        setLoading(false);
      }
    };

    loadQuizzes();
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-pink-50 rounded-xl shadow-2xl p-8 max-w-4xl w-full">
        <div className="mb-6 text-center">
          <h3 className="text-xl font-bold text-gray-900 mt-6 mb-4">Επιλέξτε Κεφάλαιο για Quiz</h3>
        </div>

        {loading ? (
          <div className="flex justify-center my-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-pink-500"></div>
          </div>
        ) : (
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
        )}

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
};

export default QuizMenu;
