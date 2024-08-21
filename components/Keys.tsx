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
  const [isMatch, setIsMatch] = useState<boolean>(false);
  const [matches, setMatches] = useState<boolean[]>(
    new Array(givenArrLength).fill(false)
  );

  // Ref to store the latest value of `arr` and `given`
  const arrRef = useRef(arr);
  const givenRef = useRef(given);

  const generateRandomArray = (length: number) => {
    return Array.from({ length }, () => Math.floor(Math.random() * 4));
  };

  const areTheyEqual = () => {
    const currentArr = arrRef.current;
    const currentGiven = givenRef.current;

    console.log("Comparing:", currentArr, currentGiven);
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
    console.log("Initial given array:", initialGiven);

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
          console.log("Updated arr (before limiting):", newArr);
          const limitedArr = newArr.slice(0, givenArrLength);
          console.log("Limited arr:", limitedArr);
          return limitedArr;
        });
      }
    };

    const handleSubmit = (e: KeyboardEvent) => {
      if (e.key === " ") {
        console.log("Space key pressed");
        console.log("Current arr:", arr);
        console.log("Current given array:", given);

        if (areTheyEqual()) {
          setScore((prevScore) => {
            const newScore = prevScore + 1;
            console.log("Score incremented:", newScore);
            return newScore;
          });
          const newGiven = generateRandomArray(givenArrLength);
          setGiven(newGiven);
          givenRef.current = newGiven;
          console.log("New given array:", newGiven);
        } else {
          console.log("Arrays are not equal");
        }

        // Clear `arr` only after checking if arrays are equal
        setArr([]);
        console.log("Arr cleared");
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
    // setIsMatch(areTheyEqual());
    const newMatches = given.map((item, index) => arr[index] === item);
    setMatches(newMatches);
  }, [arr, given]);

  useEffect(() => {
    arrRef.current = arr;
  }, [arr]);

  useEffect(() => {
    givenRef.current = given;
  }, [given]);

  const getArrowIcon = (index: number) => {
    switch (index) {
      case 0:
        return (
          <ArrowUp
            className={matches[index] ? "svg-white match" : "svg-white"}
          />
        );
      case 1:
        return (
          <ArrowDown
            className={matches[index] ? "svg-white match" : "svg-white"}
          />
        );
      case 2:
        return (
          <ArrowLeft
            className={matches[index] ? "svg-white match" : "svg-white"}
          />
        );
      case 3:
        return (
          <ArrowRight
            className={matches[index] ? "svg-white match" : "svg-white"}
          />
        );
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
        {given.map((item, index) => (
          <span key={index}>{getArrowIcon(item)}</span>
        ))}
      </div>
    </main>
  );
};

export default Keys;
