/**
 * Fetches categories from the backend API
 */

const BACKEND_URL = 'http://localhost:8001';

export const fetchCategories = async () => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/categories`);
    const data = await response.json();
    return {
      quizCategories: data.quiz_categories || [],
      flashcardCategories: data.flashcard_categories || [],
      allCategories: data.all_categories || [],
    };
  } catch (error) {
    console.error('Error fetching categories:', error);
    return {
      quizCategories: [],
      flashcardCategories: [],
      allCategories: [],
    };
  }
};
