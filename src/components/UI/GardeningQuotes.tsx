"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Leaf, RefreshCw } from "lucide-react";

const gardeningQuotes = [
  { text: "To plant a garden is to believe in tomorrow.", author: "Audrey Hepburn" },
  { text: "The glory of gardening: hands in the dirt, head in the sun, heart with nature.", author: "Alfred Austin" },
  { text: "Gardening is the art that uses flowers and plants as paint, and the soil and sky as canvas.", author: "Elizabeth Murray" },
  { text: "A garden is a grand teacher. It teaches patience and careful watchfulness.", author: "Gertrude Jekyll" },
  { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
  { text: "Gardening is how I relax. It's another form of creating and playing with colors.", author: "Oscar de la Renta" },
  { text: "A society grows great when old men plant trees whose shade they know they shall never sit in.", author: "Greek Proverb" },
  { text: "The garden suggests there might be a place where we can meet nature halfway.", author: "Michael Pollan" },
  { text: "Gardens are not made by singing 'Oh, how beautiful,' and sitting in the shade.", author: "Rudyard Kipling" },
  { text: "When the world wearies and society fails to satisfy, there is always the garden.", author: "Minnie Aumonier" }
];

function getRandomQuote() {
  const randomIndex = Math.floor(Math.random() * gardeningQuotes.length);
  return gardeningQuotes[randomIndex];
}

export default function GardeningQuotes() {
  const [quote, setQuote] = useState({ text: "", author: "" });

  useEffect(() => {
    setQuote(getRandomQuote());
  }, []);

  const handleRefresh = () => {
    setQuote(getRandomQuote());
  };

  return (
    <div className="bg-gradient-to-r from-green-100 to-green-200 p-6 rounded-lg shadow-lg max-w-2xl mx-auto my-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Leaf className="text-green-600 mr-2" size={24} />
          <h2 className="text-2xl font-semibold text-green-800">Gardening Wisdom</h2>
        </div>
        <RefreshButton onRefresh={handleRefresh} />
      </div>
      <motion.div
        key={quote.text}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <p className="text-lg text-green-700 italic mb-2">{quote.text}</p>
        <p className="text-sm text-green-600">- {quote.author}</p>
      </motion.div>
    </div>
  );
}

function RefreshButton({ onRefresh }: { onRefresh: () => void }) {
  return (
    <button
      onClick={onRefresh}
      className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
      aria-label="Refresh quote"
    >
      <RefreshCw size={20} />
    </button>
  );
}
