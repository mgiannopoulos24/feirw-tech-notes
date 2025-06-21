import React from 'react';
import { FlashcardArray } from "react-quizlet-flashcard";

const Flashcards = () => {
  const cards = [
    {
      id: 1,
      frontHTML: <div className="flex items-center justify-center h-full text-center font-bold text-l text-2xl">Τι είναι η μεταβλητή;</div>,
      backHTML: <div className="pt-20 text-center">Θέση μνήμης στην οποία μπορούμε να αποθηκεύσουμε δεδομένα.</div>,
    },
    {
      id: 2,
      frontHTML: <div className="pt-20 text-center">Ποια εντολή χρησιμοποιούμε για είσοδο δεδομένων στην ΓΛΩΣΣΑ;</div>,
      backHTML: <div className="pt-20 text-center">ΔΙΑΒΑΣΕ</div>,
    },
    {
      id: 3,
      frontHTML: <div className="pt-20 text-center">Ποια εντολή χρησιμοποιούμε για έξοδο δεδομένων στην ΓΛΩΣΣΑ;</div>,
      backHTML: <div className="pt-20 text-center">ΓΡΑΨΕ</div>,
    },
  ];

  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-xl">
        <FlashcardArray cards={cards} />
      </div>
    </div>
  );
};

export default Flashcards;
