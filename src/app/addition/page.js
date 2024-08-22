"use client";

import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import Confetti from 'react-confetti';
import Link from 'next/link';

export default function Addition() {
  const searchParams = useSearchParams();
  const count = parseInt(searchParams.get('count')) || 2;
  const [numbers, setNumbers] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [message, setMessage] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [showBackButton, setShowBackButton] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(null);
  const inputRef = useRef(null);
  const nextButtonRef = useRef(null);

  useEffect(() => {
    setNumbers(generateNumbers(count));
  }, [count]);

  function generateNumbers(count) {
    setStartTime(Date.now()); // Use Date.now() to get the current timestamp in milliseconds
    setElapsedTime(null); // Reset elapsed time when generating a new question
    return Array.from({ length: count }, () => Math.floor(Math.random() * 90) + 10);
  }

  function handleSubmit() {
    const sum = numbers.reduce((a, b) => a + b, 0);
    if (parseInt(userInput) === sum) {
      const currentEndTime = Date.now(); // Get the current timestamp in milliseconds
      const timeDiff = currentEndTime - startTime; // Calculate the difference in milliseconds
      setElapsedTime((timeDiff / 1000).toFixed(2)); // Convert to seconds and format
      console.log(elapsedTime);
      setMessage('Correct!');
      setShowConfetti(true);
      setShowBackButton(true);
      setShowNextButton(true);
      setIsCorrect(true);
      setTimeout(() => {
      if (nextButtonRef.current) {
        nextButtonRef.current.focus(); // Ensure the button exists before focusing
      }
    }, 0); // Delay focus to ensure the button is rendered
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
    console.log("Next "+startTime)
  };

  const handleKeyDown = (e) => {
    // console.log(`Key pressed: ${e.key}`);
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent the default form submission if inside a form
      handleSubmit();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black-100">
      <h1 className="text-2xl font-bold mb-4">Addition</h1>
      <p className="mb-4">Add the following numbers:</p>
      <div className="text-xl mb-4 text-sky-300">{numbers.join(' + ')}</div>
      <input
        ref={inputRef}
        type="number"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        onKeyDown={handleKeyDown}
        className="mb-4 p-2 border border-gray-400 text-black rounded"
      />
      {!isCorrect &&(
      <button onClick={handleSubmit} className="px-4 py-2 bg-blue-500 text-white rounded">
        Submit
      </button>
      )}
      {isCorrect && (
        <div className='mt-4 space-x-4'>
          {showBackButton &&(
            <Link href={`/`} className="bg-gray-500 text-white p-2 rounded">
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
      {isCorrect && <p className='mt-4 text-xl'>Time taken to answer correctly: {elapsedTime} seconds</p>}
      {showConfetti && <Confetti recycle={false} />}
    </div>
  );
}