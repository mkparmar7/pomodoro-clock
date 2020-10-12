import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import Break from "./Components/Break.jsx";
import Session from "./Components/Session.jsx";
import TimeLeft from "./Components/TimeLeft";


function App() {
  const [sessionLength, setSessionLength] = useState(1500);
  const [breakLength, setBreakLength] = useState(300);

  const [intervalId, setIntervalId] = useState(null);
  const [currentSessionType, setCurrentSessionType] = useState("Session");

  const [timeLeft, setTimeLeft] = useState(sessionLength);

  const audioElement = useRef(null);

  useEffect(() => {
    setTimeLeft(sessionLength);
  }, [sessionLength]);

  const isStarted = intervalId !== null;

  const handleStartStopClick = () => {
    // if we are in started mode:
    // we want to stop the timer
    // clear interval
    if (isStarted) {
      clearInterval(intervalId);
      setIntervalId(null);
    } else {
      // if we are in stopped mode:
      // decrement timeLeft by one every second(1000ms)
      // to do this we will use setInterval

      const newIntervalId = setInterval(() => {
        setTimeLeft((prevTimeLeft) => {
          const newTimeLeft = prevTimeLeft - 1;
          if (newTimeLeft >= 0) {
            return newTimeLeft;
          } 
          audioElement.current.play();
          console.log(typeof audioElement.current.play)
          // if Session
          if (currentSessionType === "Session"){
              setCurrentSessionType("Break");
              return breakLength;
          } else if (currentSessionType === "Break"){
              setCurrentSessionType("Session");
              return sessionLength;
          }
          else { 
            return prevTimeLeft;
          }
        });
      }, 1000);
      setIntervalId(newIntervalId);
    }
  };

  const handleSessionDecrease = () => {
    const newSessionLength = sessionLength - 60;
    if (newSessionLength > 0){
    // if (newSessionLength < 60) {
    //   setSessionLength(0);
    // } else 
      setSessionLength(newSessionLength);
    }  
  };

  const handleSessionIncrease = () => {
    const newSessionLength = sessionLength + 60;
    
    if(newSessionLength <= 60*60){
    setSessionLength(newSessionLength);
  }
}

    const handleBreakDecrease = () => {
      const newBreakLength = breakLength - 60;
      if (newBreakLength > 0){
        setBreakLength(newBreakLength);           
      } 
    };

    const handleBreakIncrease = () => {
      const newBreakLength = breakLength + 60;
      
      if(newBreakLength <= 60*60){
      setBreakLength(newBreakLength);
    }
    };

    const handleResetButtonClick = () => {
      audioElement.current.load();
      //clear the timeout interval
      clearInterval(intervalId);
      // set the intervalId to null
      setIntervalId(null);
      // reset the currentSessionType to "Session" 
      setCurrentSessionType("Session");
      // reset the sessionLength to 25 minutes and breakLength to 5 minutes
      setSessionLength(60 * 25);
      setBreakLength(60 * 5);
      // reset timeLeft to 25 minutes
      setTimeLeft(60 * 25);
    }
  
  return (
    <div className="flex">
      <Break
        breakLength={breakLength}
        handleBreakDecrease={handleBreakDecrease}
        handleBreakIncrease={handleBreakIncrease}
      />
      <TimeLeft      
      timerLabel = {currentSessionType}
      handleStartStopClick = {handleStartStopClick}
      startStopButtonLabel = {isStarted ? "Stop" : "Start"}
      timeLeft = {timeLeft}
       />
      <Session
        sessionLength={sessionLength}
        handleSessionDecrease={handleSessionDecrease}
        handleSessionIncrease={handleSessionIncrease}
      />
      <button id="reset" onClick={handleResetButtonClick}>Reset</button>
      <audio
          id="beep"          
          ref={audioElement}>
          <source src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        />
        </audio>

    </div>
  );
}

export default App;
