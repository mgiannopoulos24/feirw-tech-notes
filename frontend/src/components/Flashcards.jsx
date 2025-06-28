import React, { useState, useEffect } from 'react';
import { FlashcardArray } from 'react-quizlet-flashcard';

const BACKEND_URL = 'http://localhost:8001';

const Flashcards = () => {
  const [flashcardSets, setFlashcardSets] = useState([]);
  const [selectedSetIndex, setSelectedSetIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch flashcard categories and data on component mount
  useEffect(() => {
    fetchFlashcardData();
  }, []);

  const fetchFlashcardData = async () => {
    setLoading(true);
    try {
      // 1. First get all available categories
      const categoriesResponse = await fetch(`${BACKEND_URL}/api/categories`);
      const categoriesData = await categoriesResponse.json();

      // 2. Then get all flashcards
      const flashcardsResponse = await fetch(`${BACKEND_URL}/api/flashcards`);
      const flashcardsData = await flashcardsResponse.json();

      // 3. Group flashcards by category
      const flashcards = flashcardsData.flashcards || [];
      const categories = categoriesData.flashcard_categories || [];

      // Create sets based on categories
      const sets = categories.map((category) => {
        const categoryCards = flashcards.filter((card) => card.category === category);
        return {
          id: category.toLowerCase().replace(/\s+/g, '-'),
          title: category,
          questions: categoryCards.map((card) => ({
            id: card.id,
            front: card.question,
            back: card.answer,
          })),
        };
      });

      setFlashcardSets(sets);
    } catch (err) {
      console.error('Error fetching flashcard data:', err);
      setError('Σφάλμα κατά τη φόρτωση των flashcards');
    } finally {
      setLoading(false);
    }
  };

  const selectedCards =
    selectedSetIndex !== null && flashcardSets[selectedSetIndex]
      ? flashcardSets[selectedSetIndex].questions.map((card, idx) => ({
          id: card.id || idx + 1,
          frontHTML: (
            <div className="flex h-full items-center justify-center text-center text-xl font-semibold">
              {card.front}
            </div>
          ),
          backHTML: (
            <div className="flex h-full items-center justify-center text-center text-xl">
              {card.back}
            </div>
          ),
        }))
      : [];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-4 text-red-600">
        <p>{error}</p>
        <button
          onClick={fetchFlashcardData}
          className="mt-4 px-4 py-2 bg-pink-500 text-white rounded"
        >
          Προσπαθήστε ξανά
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      {/* Show category selection buttons */}
      {selectedSetIndex === null && (
        <div className="flex flex-wrap gap-4 justify-center">
          {flashcardSets.map((set, index) => (
            <button
              key={set.id}
              onClick={() => setSelectedSetIndex(index)}
              className="px-6 py-3 rounded-full text-lg font-semibold transition-all duration-200 bg-pink-200 text-pink-800 hover:bg-pink-300"
            >
              {set.title}
              <span className="ml-2 text-sm">({set.questions.length})</span>
            </button>
          ))}
        </div>
      )}

      {/* Flashcards */}
      {selectedSetIndex !== null && (
        <div className="flex flex-col items-center gap-4">
          {/* Back button */}
          <button
            onClick={() => setSelectedSetIndex(null)}
            className="px-5 py-2 rounded-full text-black-600 hover:bg-pink-300 text-base font-medium"
          >
            🔙Πίσω στις ενότητες
          </button>

          {/* Selected set title */}
          <h2 className="text-2xl font-bold text-pink-700 mb-4">
            {flashcardSets[selectedSetIndex]?.title}
          </h2>

          {/* Flashcards array */}
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
