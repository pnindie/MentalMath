"use client";

import { useState, useEffect, useRef } from 'react';
import Confetti from 'react-confetti';
import Link from 'next/link';
import { Home } from 'lucide-react';
import { Share } from 'lucide-react';

export default function Subtraction() {
  const [count, setCount] = useState(2); // Default to 2 if no count query parameter is provided
  const [numbers, setNumbers] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [message, setMessage] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [showBackButton, setShowBackButton] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(null);
  const [score, setScore] = useState(0); // Initialize score
  const inputRef = useRef(null);
  const nextButtonRef = useRef(null);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const queryCount = parseInt(query.get('count')) || 2;
    setCount(queryCount);
    setNumbers(generateNumbers(queryCount));
  }, []);

  function generateNumbers(count) {
    setStartTime(Date.now());
    setElapsedTime(null);
    return Array.from({ length: count }, () => Math.floor(Math.random() * 90) + 10);
  }

  function handleSubmit() {
    const difference = numbers.reduce((a, b) => a - b);
    if (parseInt(userInput) === difference) {
      const currentEndTime = Date.now();
      const timeDiff = currentEndTime - startTime;
      setElapsedTime((timeDiff / 1000).toFixed(2));
      setMessage('Correct!');
      setShowConfetti(true);
      setShowBackButton(true);
      setShowNextButton(true);
      setIsCorrect(true);
      setScore(score + 1); // Increment score
      setTimeout(() => {
        if (nextButtonRef.current) {
          nextButtonRef.current.focus();
        }
      }, 0);
    } else {
      setMessage('Wrong! Try harder!');
    }
  }

  const handleNext = () => {
    setNumbers(generateNumbers(count));
    setUserInput('');
    setIsCorrect(false);
    setShowConfetti(false);
    inputRef.current.focus();
    setMessage("Here is a new one..");
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleShare = async () => {
    if (navigator.canShare && navigator.canShare({ files: [] })) {
      try {
        const canvas = await html2canvas(document.body); // Capture the screenshot
        const blob = await new Promise(resolve => canvas.toBlob(resolve));
        const file = new File([blob], 'score.png', { type: 'image/png' });
        await navigator.share({
          title: 'My Score',
          text: `I scored ${score} on the subtraction quiz!`,
          files: [file],
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      alert('Sharing is not supported in your browser.');
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-black-100">
      {/* Home Button */}
      <div className="absolute top-4 left-4">
        <Link href="/">
          <Home className="w-8 h-8 text-gray-600" />
        </Link>
      </div>

      {/* Score Display */}
      <div className="absolute top-4 right-4 text-xl font-bold text-gray-600">
        Score: {score}
      </div>

      <h1 className="text-2xl font-bold mb-4">Subtraction</h1>
      <p className="mb-4">Subtract the following numbers:</p>
      <div className="text-xl mb-4">{numbers.join(' - ')}</div>
      <input
        ref={inputRef}
        type="number"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        onKeyDown={handleKeyDown}
        className="mb-4 p-2 border border-gray-400 text-black rounded"
      />
      {!isCorrect && (
        <button onClick={handleSubmit} className="px-4 py-2 bg-blue-500 text-white rounded">
          Submit
        </button>
      )}
      {isCorrect && (
        <div className="mt-4 space-x-4">
          {showBackButton && (
            <Link href={`./`} className="bg-gray-500 text-white p-2 rounded">
              Back
            </Link>
          )}
          {showNextButton && (
            <button
              ref={nextButtonRef}
              onClick={handleNext}
              className="bg-green-500 text-white p-2 rounded"
            >
              Next
            </button>
          )}
        </div>
      )}
      {message && <p className="mt-4 text-xl">{message}</p>}
      {isCorrect && <p className="mt-4 text-xl">Time taken to answer correctly: {elapsedTime} seconds</p>}
      {showConfetti && <Confetti recycle={false} />}

      {/* Share Button */}
      <div className="absolute bottom-4">
        <button
          onClick={handleShare}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded"
        >
          <Share className="mr-2" /> Share Score
        </button>
      </div>
    </div>
  );
}
