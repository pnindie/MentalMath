"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Suspense } from 'react'

export default function Home() {
  const [numberCount, setNumberCount] = useState(2);

  return (
        <Suspense>
    <div className="bg-flowing-gradient bg-200% animate-flowingGradient min-h-screen w-screen flex flex-col items-center justify-center"> 
      <h1 className="text-3xl font-bold mb-8">Reclaim Your Mental Prowess</h1>
      <div className="mb-8">
        <h2 className="text-xl font-medium mb-4 justify-center">How many numbers?</h2>
        <div className="flex space-x-5 justify-center">
          {[2, 3, 4, 5].map((count) => (
            <label key={count} className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="numberCount"
                value={count}
                checked={numberCount === count}
                onChange={() => setNumberCount(count)}
                className="hidden"
              />
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${
                  numberCount === count ? "bg-gradient-to-br from-indigo-200 via-purple-800 to-pink-500 text-white" : "bg-white text-blue-500"
                }`}
              >
                {count}
              </div>
            </label>
          ))}
        </div>
      </div>

      <div className="space-x-4">
        <Link href={`./addition?count=${numberCount}`} className="px-4 py-2 bg-blue-500 text-white rounded">
          Addition
        </Link>
        <Link href={`./subtraction?count=${numberCount}`} className="px-4 py-2 bg-green-500 text-white rounded">
          Subtraction
        </Link>
      </div>
    </div>
        </Suspense>
  );
}
