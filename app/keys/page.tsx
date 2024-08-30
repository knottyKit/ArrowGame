"use client";
import React, { useEffect, useState, useRef } from "react";
import ArrowUp from "@/public/up.svg";
import ArrowDown from "@/public/down.svg";
import ArrowLeft from "@/public/left.svg";
import ArrowRight from "@/public/right.svg";
import "./keys.css";
import { Button } from "@nextui-org/react";
import ModalWrapper from "@/components/modal/ModalWrapper";
import UserModal from "./UserModal";

const Keys = () => {
  const [arr, setArr] = useState<number[]>([]);
  const [score, setScore] = useState<number>(0);
  const givenArrLength = 4;
  const [given, setGiven] = useState<number[]>([]);
  const [matches, setMatches] = useState<boolean[]>(
    new Array(givenArrLength).fill(false)
  );
  const [isOpenModal, setIsOpenModal] = useState<boolean>(true);
  const [userName, setUserName] = useState<string>("");

  const arrRef = useRef(arr);
  const givenRef = useRef(given);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const generateRandomArray = (length: number) => {
    const randomArray = Array.from({ length }, () =>
      Math.floor(Math.random() * 4)
    );

    const timerElement = document.querySelector(".timer") as HTMLElement;
    if (timerElement) {
      timerElement.classList.remove("restart-animation");
      void timerElement.offsetWidth;
      timerElement.classList.add("restart-animation");
    }
    return randomArray;
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

  const interval = () => {
    const startInterval = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      startTimeRef.current = Date.now();

      intervalRef.current = setInterval(() => {
        const newGiven = generateRandomArray(givenArrLength);
        setGiven(newGiven);
        givenRef.current = newGiven;
      }, 5000);
    };
    startInterval();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  };

  // useEffect(() => {
  //   const startInterval = () => {
  //     if (intervalRef.current) {
  //       clearInterval(intervalRef.current);
  //     }

  //     startTimeRef.current = Date.now();

  //     intervalRef.current = setInterval(() => {
  //       const newGiven = generateRandomArray(givenArrLength);
  //       setGiven(newGiven);
  //       givenRef.current = newGiven;
  //     }, 5000);
  //   };
  //   startInterval();

  //   return () => {
  //     if (intervalRef.current) {
  //       clearInterval(intervalRef.current);
  //     }
  //   };
  // }, []);

  const startCountdown = () => {
    const getCountDown = document.querySelectorAll(".cd");

    getCountDown.forEach((element) => {
      element.classList.add("animate-countdown");
    });
  };

  const startGame = () => {
    startCountdown();
    interval();
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
          const endTime = Date.now();
          const startTime = startTimeRef.current || endTime;
          const elapsedTime = (endTime - startTime) / 1000;

          let points = 0;
          if (elapsedTime <= 1.5) {
            points = 3;
            // console.log(`Elapsed time: ${elapsedTime}s - plus 3 points`);
          } else if (elapsedTime > 1.5 && elapsedTime < 3) {
            points = 2;
            // console.log(`Elapsed time: ${elapsedTime}s - plus 2 points`);
          } else if (elapsedTime >= 3) {
            points = 1;
            // console.log(`Elapsed time: ${elapsedTime}s - plus 1 point`);
          }
          setScore((prevScore) => prevScore + points);
          const newGiven = generateRandomArray(givenArrLength);
          setGiven(newGiven);
          givenRef.current = newGiven;

          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }
          startTimeRef.current = Date.now();
          intervalRef.current = setInterval(() => {
            const newGiven = generateRandomArray(givenArrLength);
            setGiven(newGiven);
            givenRef.current = newGiven;
          }, 5000);
        }

        setArr([]);
      }
    };

    document.addEventListener("keydown", handleSubmit);
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      document.removeEventListener("keydown", handleSubmit);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  };
  // useEffect(() => {
  //   const initialGiven = generateRandomArray(givenArrLength);
  //   setGiven(initialGiven);
  //   givenRef.current = initialGiven;

  //   const handleKeyPress = ({ key }: KeyboardEvent) => {
  //     let value: number | null = null;
  //     switch (key) {
  //       case "ArrowUp":
  //         value = 0;
  //         break;
  //       case "ArrowDown":
  //         value = 1;
  //         break;
  //       case "ArrowLeft":
  //         value = 2;
  //         break;
  //       case "ArrowRight":
  //         value = 3;
  //         break;
  //       default:
  //         return;
  //     }

  //     if (value !== null) {
  //       setArr((prevArr) => {
  //         const newArr = [...prevArr, value];
  //         const limitedArr = newArr.slice(0, givenArrLength);
  //         return limitedArr;
  //       });
  //     }
  //   };

  //   const handleSubmit = (e: KeyboardEvent) => {
  //     if (e.key === " ") {
  //       if (areTheyEqual()) {
  //         const endTime = Date.now();
  //         const startTime = startTimeRef.current || endTime;
  //         const elapsedTime = (endTime - startTime) / 1000;

  //         let points = 0;
  //         if (elapsedTime <= 1.5) {
  //           points = 3;
  //           // console.log(`Elapsed time: ${elapsedTime}s - plus 3 points`);
  //         } else if (elapsedTime > 1.5 && elapsedTime < 3) {
  //           points = 2;
  //           // console.log(`Elapsed time: ${elapsedTime}s - plus 2 points`);
  //         } else if (elapsedTime >= 3) {
  //           points = 1;
  //           // console.log(`Elapsed time: ${elapsedTime}s - plus 1 point`);
  //         }
  //         setScore((prevScore) => prevScore + points);
  //         const newGiven = generateRandomArray(givenArrLength);
  //         setGiven(newGiven);
  //         givenRef.current = newGiven;

  //         if (intervalRef.current) {
  //           clearInterval(intervalRef.current);
  //         }
  //         startTimeRef.current = Date.now();
  //         intervalRef.current = setInterval(() => {
  //           const newGiven = generateRandomArray(givenArrLength);
  //           setGiven(newGiven);
  //           givenRef.current = newGiven;
  //         }, 5000);
  //       }

  //       setArr([]);
  //     }
  //   };

  //   document.addEventListener("keydown", handleSubmit);
  //   window.addEventListener("keydown", handleKeyPress);

  //   return () => {
  //     window.removeEventListener("keydown", handleKeyPress);
  //     document.removeEventListener("keydown", handleSubmit);
  //     if (intervalRef.current) {
  //       clearInterval(intervalRef.current);
  //     }
  //   };
  // }, []);

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
      <div className="fixed z-10  w-screen h-screen flex items-center justify-center ">
        <div
          className="absolute rounded-full bg-white w-[250px] h-[250px] opacity-0  flex items-center justify-center cd"
          style={{ animationDelay: "0s" }}
        >
          <span className="text-[100px] font-bold">3</span>
        </div>
        <div
          className="absolute rounded-full bg-white w-[250px] h-[250px] opacity-0  flex items-center justify-center cd"
          style={{ animationDelay: "1s" }}
        >
          <span className="text-[100px] font-bold">2</span>
        </div>
        <div
          className="absolute rounded-full bg-white w-[250px] h-[250px] opacity-0  flex items-center justify-center cd"
          style={{ animationDelay: "2s" }}
        >
          <span className="text-[100px] font-bold">1</span>
        </div>
      </div>

      <div>{userName}</div>
      <div>Array: {JSON.stringify(arr)}</div>
      <div>Given Array: {JSON.stringify(given)}</div>
      <div>Score: {score}</div>
      <div className="flex gap-6 w-full items-center">
        {given.map((_, index) => (
          <span key={index}>{renderArrowIcon(index)}</span>
        ))}
      </div>
      <div className="timer  w-[500px] h-[20px] border"></div>

      {isOpenModal && (
        <ModalWrapper>
          <UserModal
            onClose={() => {
              setIsOpenModal(false);
            }}
            setUserName={setUserName}
            onSuccess={() => {
              startGame();
            }}
          />
        </ModalWrapper>
      )}
    </main>
  );
};

export default Keys;
