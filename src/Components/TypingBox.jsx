/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { createRef, useEffect, useMemo, useRef, useState } from "react";
import { useTestMode } from "../Context/TestModeContext";
import UpperMenu from "./UpperMenu";
import Stats from "./Stats";

var randomwords = require("random-words");

const TypingBox = () => {
  const inputRef = useRef(null);
  const { testTime } = useTestMode();
  const [countDown, setCountDown] = useState(testTime);
  const [intervalId, setIntervalId] = useState(null);
  const [correctChars, setCorrcetChars] = useState(0);
  const [inCorrectChars, setInCorrcetChars] = useState(0);
  const [missedChars, setMissedChars] = useState(0);
  const [extraChars, setExtraChars] = useState(0);
  const [corrcetWords, setCorrcetWords] = useState(0);
  const [testStart, setTestStart] = useState(false);
  const [testEnd, setTestEnd] = useState(false);
  const [wordsArray, setWordArray] = useState(() => {
    return randomwords(50);
  });

  const [currWordIndex, setCurrWordIndex] = useState(0);
  const [currCharIndex, setCurrCharIndex] = useState(0);
  const [graphData, setGraphData] = useState([]);

  const wordsSpanRef = useMemo(() => {
    return Array(wordsArray.length)
      .fill(0)
      .map((i) => createRef(null));
  }, [wordsArray]);

  const startTimer = () => {
    const intervalId = setInterval(timer, 1000);
    setIntervalId(intervalId);
    function timer() {
      setCountDown((latestCountDown) => {
        setCorrcetChars((correctChars) => {
          setGraphData((graphData) => {
            return [
              ...graphData,
              [
                testTime - latestCountDown + 1,
                correctChars / 5 / ((testTime - latestCountDown + 1) / 60),
              ],
            ];
          });
          return correctChars;
        });

        if (latestCountDown === 1) {
          setTestEnd(true);
          clearInterval(intervalId);
        }

        return latestCountDown - 1;
      });
    }
  };

  const resetTest = () => {
    clearInterval(intervalId);
    setCountDown(testTime);
    setCurrCharIndex(0);
    setCurrWordIndex(0);
    setTestStart(false);
    setTestEnd(false);
    setWordArray(randomwords(50));
    focusInput();
    resetWordSpanRefClassname();
  };

  const resetWordSpanRefClassname = () => {
    wordsSpanRef.map((i) => {
      Array.from(i.current.childNodes).map((j) => {
        j.className = "";
      });
    });
    wordsSpanRef[0].current.childNodes[0].className = "current";
  };

  const handleUserInput = (e) => {
    // console.log(e);

    if (!testStart) {
      startTimer();
      setTestStart(true);
    }

    const allCurrChars = wordsSpanRef[currWordIndex].current.childNodes;

    // console.log(allCurrChars);
    if (e.keyCode === 32) {
      //logic for space

      let correctCharsInWord =
        wordsSpanRef[currWordIndex].current.querySelectorAll(".correct");

      if (correctCharsInWord.length === allCurrChars.length) {
        setCorrcetWords(corrcetWords + 1);
      }

      if (allCurrChars.length <= currCharIndex) {
        //remove cursor from last place in word
        allCurrChars[currCharIndex - 1].classList.remove("current-right");
      } else {
        //remove cursor from in between of the word
        allCurrChars[currCharIndex].classList.remove("current");
        setMissedChars(missedChars + (allCurrChars - currCharIndex));
      }

      wordsSpanRef[currWordIndex + 1].current.childNodes[0].className =
        "current";
      setCurrWordIndex(currWordIndex + 1);
      setCurrCharIndex(0);
      return;
    }

    if (e.keyCode === 8) {
      //Logic for backspace
      if (currCharIndex !== 0) {
        if (allCurrChars.length === currCharIndex) {
          if (allCurrChars[currCharIndex - 1].className.includes("extra")) {
            allCurrChars[currCharIndex - 1].remove();
            allCurrChars[currCharIndex - 2].className += " current-right";
          } else {
            allCurrChars[currCharIndex - 1].className = "current";
          }
          setCurrCharIndex(currCharIndex - 1);
          return;
        }

        allCurrChars[currCharIndex].className = "";
        allCurrChars[currCharIndex - 1].className = "current";
        setCurrCharIndex(currCharIndex - 1);
      }

      return;
    }

    if (currCharIndex === allCurrChars.length) {
      let newSpan = document.createElement("span");
      newSpan.innerText = e.key;
      newSpan.className = "incorrect extra current-right";
      allCurrChars[currCharIndex - 1].classList.remove("current-right");
      wordsSpanRef[currWordIndex].current.append(newSpan);
      setCurrCharIndex(currCharIndex + 1);
      setExtraChars(extraChars + 1);
      return;
    }

    if (e.key === allCurrChars[currCharIndex].innerText) {
      console.log("input correct");
      allCurrChars[currCharIndex].className = "correct";
      setCorrcetChars(correctChars + 1);
    } else {
      console.log("incorrect input");
      allCurrChars[currCharIndex].className = "incorrect";
      setInCorrcetChars(inCorrectChars + 1);
    }

    if (currCharIndex + 1 === allCurrChars.length) {
      allCurrChars[currCharIndex].className += " current-right";
    } else {
      allCurrChars[currCharIndex + 1].className = "current";
    }

    setCurrCharIndex(currCharIndex + 1);
  };

  const focusInput = () => {
    inputRef.current.focus();
  };

  const calculateWPM = () => {
    return Math.round(correctChars / 5 / (testTime / 60));
  };

  const calculateAcc = () => {
    return Math.round((corrcetWords / currWordIndex) * 100);
  };

  useEffect(() => {
    // setCountDown(testTime);
    resetTest();
  }, [testTime]);

  useEffect(() => {
    focusInput();
    wordsSpanRef[0].current.childNodes[0].className = "current";
  }, []);

  return (
    <div>
      <UpperMenu countDown={countDown} />

      {testEnd ? (
        <Stats
          wpm={calculateWPM()}
          accuracy={calculateAcc()}
          correctChars={correctChars}
          inCorrectChars={inCorrectChars}
          missedChars={missedChars}
          extraChars={extraChars}
          graphData={graphData}
        />
      ) : (
        <div className="type-box" onClick={focusInput}>
          <div className="words">
            {wordsArray.map((word, index) => (
              <span className="word" ref={wordsSpanRef[index]}>
                {word.split("").map((char) => (
                  <span>{char}</span>
                ))}
              </span>
            ))}
          </div>
        </div>
      )}
      <div className="alert-message">Please use a PC to access this website. </div>
      <input
        type="text"
        className="hidden-input"
        ref={inputRef}
        onKeyDown={handleUserInput}
      />
    </div>
  );
};

export default TypingBox;
