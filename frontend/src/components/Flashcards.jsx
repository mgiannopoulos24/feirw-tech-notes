import React, { useState } from 'react';
import { FlashcardArray } from 'react-quizlet-flashcard';
import { flashcards } from '../utils/flashcards';

const Flashcards = () => {
  const [selectedSetIndex, setSelectedSetIndex] = useState(null);

  const selectedCards =
    selectedSetIndex !== null
      ? flashcards[selectedSetIndex].questions.map((card, idx) => ({
          id: card.id || idx + 1,
          frontHTML: (
            <div className="flex h-full items-center justify-center text-center text-2xl">
              {card.front}
            </div>
          ),
          backHTML: (
            <div className="flex h-full items-center justify-center text-center text-2xl">
              {card.back}
            </div>
          ),
        }))
      : [];

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      {/* Εμφάνιση κουμπιών επιλογής κατηγορίας */}
      {selectedSetIndex === null && (
        <div className="flex flex-wrap gap-4 justify-center">
          {flashcards.map((set, index) => (
            <button
              key={set.id}
              onClick={() => setSelectedSetIndex(index)}
              className="px-6 py-3 rounded-full text-lg font-semibold transition-all duration-200 bg-pink-200 text-pink-800 hover:bg-pink-300"
            >
              {set.title}
            </button>
          ))}
        </div>
      )}

      {/* Flashcards */}
      {selectedSetIndex !== null && (
        <div className="flex flex-col items-center gap-4">
          {/* Κουμπί επιστροφής */}
          <button
            onClick={() => setSelectedSetIndex(null)}
            className="px-5 py-2 rounded-full text-black-600 hover:bg-pink-300 text-base font-medium"
          >
            🔙Πίσω στις ενότητες
          </button>

          {/* Flashcards ή μήνυμα αν δεν υπάρχουν */}
          <div className="w-full max-w-xl">
            {selectedCards.length > 0 ? (
              <FlashcardArray cards={selectedCards} style={{ width: 400, height: 300 }} />
            ) : (
              <p className="text-gray-500 text-center text-lg mt-4">
                Δεν υπάρχουν διαθέσιμα flashcards για αυτήν την κατηγορία.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Flashcards;
