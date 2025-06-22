import React, { useState } from 'react';

const [quizQuestions, setQuizQuestions] = useState([
  {
    id: 1,
    question: "Ποια εντολή χρησιμοποιούμε για να επιλέξουμε όλα τα δεδομένα από έναν πίνακα;",
    options: ["SELECT *", "GET ALL", "FETCH", "PULL"],
    correct: 0,
    points: 10,
  },
  {
    id: 2,
    question: "Ποια εντολή SQL διαγράφει εγγραφή;",
    options: ["DELETE", "DROP", "REMOVE", "CLEAR"],
    correct: 0,
    points: 10,
  },
  // μπορείς να προσθέσεις όσες θέλεις!
]);
