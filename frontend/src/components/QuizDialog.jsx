import React, { useState, useEffect } from 'react';

const QuizDialog = ({ quiz, isOpen, onClose, onQuestionAnswered, selectedAnswers }) => {
  const [current, setCurrent] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [loading, setLoading] = useState(false);

  // Use selectedAnswers for the current question
  const selected = selectedAnswers?.[current] ?? null;

  // Reset state when dialog is reopened or quiz changes
  useEffect(() => {
    setCurrent(0);
    setShowSolution(false);
  }, [isOpen, quiz]);

  if (!isOpen) return null;

  const question = quiz.questions[current];

  const handleSelect = async (idx) => {
    if (selected == null && onQuestionAnswered) {
      setLoading(true);
      try {
        // Submit answer to backend
        const response = await fetch('http://localhost:8001/api/quiz/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nickname: localStorage.getItem('nickname') || 'Anonymous',
            question_id: question.id,
            selected_answer: idx,
          }),
        });

        const result = await response.json();

        // Update local state with answer
        onQuestionAnswered(quiz.id, current, idx, result.correct, result.points_earned);
      } catch (error) {
        console.error('Error submitting answer:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleNext = () => {
    setShowSolution(false);
    setCurrent((prev) => prev + 1);
  };

  const handlePrev = () => {
    setShowSolution(false);
    setCurrent((prev) => prev - 1);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-pink-50 via-pink-100 to-pink-200 bg-opacity-95 p-4 z-50">
      <div className="flex flex-col w-full max-w-2xl min-h-2xl rounded-3xl bg-white p-8 shadow-2xl border-4 border-pink-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-extrabold text-pink-700 mb-5 tracking-wide drop-shadow">
            Ερώτηση {current + 1} από {quiz.questions.length}
          </h3>
          <button
            onClick={onClose}
            className="text-pink-300 hover:text-pink-500 text-2xl font-bold transition-colors"
          >
            ✕
          </button>
        </div>
        <div className="flex flex-col flex-grow">
          <div className="mb-10 mt-10 text-pink-700 text-xl text-center flex-grow min-h-[120px] flex items-center justify-center font-medium">
            {question.question}
          </div>
          <div className="flex flex-col gap-6 mb-16">
            {loading ? (
              <div className="flex justify-center my-8">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-pink-500"></div>
              </div>
            ) : (
              question.answers.map((ans, idx) => {
                let base = 'rounded-xl px-6 py-3 border-2 transition-all font-semibold shadow-sm';
                let color = '';
                if (selected !== null) {
                  if (ans.correct) {
                    color = 'bg-green-100 border-green-400 text-green-900';
                  } else {
                    color = 'bg-red-100 border-red-400 text-red-900';
                  }
                  if (selected !== idx) {
                    color += ' opacity-60';
                  } else {
                    color += ' scale-105';
                  }
                } else {
                  color =
                    'bg-white border-pink-200 text-pink-700 hover:bg-pink-100 hover:border-pink-400 hover:scale-105';
                }
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelect(idx)}
                    disabled={selected !== null}
                    className={`${base} ${color}`}
                  >
                    {ans.text}
                  </button>
                );
              })
            )}
          </div>
        </div>
        <div className="flex justify-between mt-20">
          <button
            onClick={handlePrev}
            disabled={current === 0}
            className="rounded-lg bg-white border-2 border-pink-300 px-6 py-2 text-pink-700 font-semibold hover:bg-pink-100 hover:border-pink-500 disabled:opacity-50 shadow"
          >
            Προηγούμενη
          </button>
          <button
            onClick={handleNext}
            disabled={current === quiz.questions.length - 1}
            className="rounded-lg bg-gradient-to-r from-pink-400 to-pink-600 px-6 py-2 text-white font-bold hover:from-pink-500 hover:to-pink-700 disabled:opacity-50 shadow"
          >
            Επόμενη
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizDialog;
