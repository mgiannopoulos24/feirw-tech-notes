import React from 'react';
import { FlashcardArray } from "react-quizlet-flashcard";
import { flashcards } from '../utils/flashcards';

const Flashcards = () => {
  // Use the first set's questions for now
  const cards = flashcards[0].questions.map((card, idx) => ({
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
  }));

  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-xl">
        <FlashcardArray cards={cards} style={{ width: 400, height: 300 }}/>
      </div>
    </div>
  );
};

export default Flashcards;