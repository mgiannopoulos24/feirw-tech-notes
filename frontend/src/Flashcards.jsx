import React from 'react';
import { FlashcardArray } from "react-quizlet-flashcard";

const Flashcards = () => {
  const cards = [
    {
      id: 1,
      frontHTML: <div className="pt-10 text-center">Τι είναι η μεταβλητή;</div>,
      backHTML: <>Θέση μνήμης στην οποία μπορούμε να αποθηκεύσουμε δεδομένα.</>,
    },
    {
      id: 2,
      frontHTML: <div className="pt-10 text-center">Ποια εντολή χρησιμοποιούμε για είσοδο δεδομένων στην ΓΛΩΣΣΑ;</div>,
      backHTML: <>ΔΙΑΒΑΣΕ</>,
    },
    {
      id: 3,
      frontHTML: <div className="pt-10 text-center">Ποια εντολή χρησιμοποιούμε για έξοδο δεδομένων στην ΓΛΩΣΣΑ;</div>,
      backHTML: <>ΓΡΑΨΕ</>,
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
