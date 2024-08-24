"use client";
import React, { useEffect, useState, useRef } from "react";
import ArrowUp from "../public/up.svg";
import ArrowDown from "../public/down.svg";
import ArrowLeft from "../public/left.svg";
import ArrowRight from "../public/right.svg";

const Keys = () => {
  const [arr, setArr] = useState<number[]>([]);
  const [score, setScore] = useState<number>(0);
  const givenArrLength = 4;
  const [given, setGiven] = useState<number[]>([]);
  const [matches, setMatches] = useState<boolean[]>(
    new Array(givenArrLength).fill(false)
  );

  const arrRef = useRef(arr);
  const givenRef = useRef(given);

  const generateRandomArray = (length: number) => {
    return Array.from({ length }, () => Math.floor(Math.random() * 4));
  };

  const areTheyEqual = () => {
    const currentArr = arrRef.current;
    const currentGiven = givenRef.current;

    if (currentArr.length !== currentGiven.length) {
      return false;
    }

    for (let i = 0; i < currentArr.length; i++) {
      if (currentArr[i] !== currentGiven[i]) {
        return false;
      }
    }
    return true;
  };

  useEffect(() => {
    const initialGiven = generateRandomArray(givenArrLength);
    setGiven(initialGiven);
    givenRef.current = initialGiven;

    const handleKeyPress = ({ key }: KeyboardEvent) => {
      let value: number | null = null;
      switch (key) {
        case "ArrowUp":
          value = 0;
          break;
        case "ArrowDown":
          value = 1;
          break;
        case "ArrowLeft":
          value = 2;
          break;
        case "ArrowRight":
          value = 3;
          break;
        default:
          return;
      }

      if (value !== null) {
        setArr((prevArr) => {
          const newArr = [...prevArr, value];
          const limitedArr = newArr.slice(0, givenArrLength);
          return limitedArr;
        });
      }
    };

    const handleSubmit = (e: KeyboardEvent) => {
      if (e.key === " ") {
        if (areTheyEqual()) {
          setScore((prevScore) => prevScore + 1);
          const newGiven = generateRandomArray(givenArrLength);
          setGiven(newGiven);
          givenRef.current = newGiven;
        }

        setArr([]);
      }
    };

    document.addEventListener("keydown", handleSubmit);
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      document.removeEventListener("keydown", handleSubmit);
    };
  }, []);

  useEffect(() => {
    const newMatches = new Array(givenArrLength).fill(false);
    arr.forEach((item, index) => {
      if (index < givenArrLength && item === given[index]) {
        newMatches[index] = true;
      }
    });

    setMatches(newMatches);
  }, [arr, given]);

  useEffect(() => {
    arrRef.current = arr;
  }, [arr]);

  useEffect(() => {
    givenRef.current = given;
  }, [given]);

  // Function to determine the class based on match status
  const getMatchClass = (index: number) => {
    if (arr[index] === undefined) {
      return "svg-white"; // Class when the index in arr is still undefined
    }
    return matches[index] ? "svg-white match" : "svg-white no-match"; // Class when there's a match or not
  };

  // Function to render the appropriate arrow icon
  const renderArrowIcon = (index: number) => {
    // Determine which arrow to render based on the given array
    const arrowIndex = given[index];

    switch (arrowIndex) {
      case 0:
        return <ArrowUp className={getMatchClass(index)} />;
      case 1:
        return <ArrowDown className={getMatchClass(index)} />;
      case 2:
        return <ArrowLeft className={getMatchClass(index)} />;
      case 3:
        return <ArrowRight className={getMatchClass(index)} />;
      default:
        return null;
    }
  };

  return (
    <main>
      <button onClick={() => console.log("Log Array")}>Log Array</button>
      <div>Array: {JSON.stringify(arr)}</div>
      <div>Given Array: {JSON.stringify(given)}</div>
      <div>Score: {score}</div>
      <div className="flex gap-6 w-full items-center">
        {given.map((_, index) => (
          <span key={index}>{renderArrowIcon(index)}</span>
        ))}
      </div>
    </main>
  );
};

export default Keys;
