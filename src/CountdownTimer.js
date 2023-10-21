import React, { useState, useEffect } from "react";

function CountdownTimer() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    const storedHours = parseInt(localStorage.getItem("hours"), 10) || 0;
    const storedMinutes = parseInt(localStorage.getItem("minutes"), 10) || 0;
    const storedSeconds = parseInt(localStorage.getItem("seconds"), 10) || 0;
    const storedIsRunning =
      localStorage.getItem("isRunning") === "true" || false;

    setHours(storedHours);
    setMinutes(storedMinutes);
    setSeconds(storedSeconds);
    setIsRunning(storedIsRunning);
  }, []);

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else {
          if (minutes > 0) {
            setMinutes(minutes - 1);
            setSeconds(59);
          } else {
            if (hours > 0) {
              setHours(hours - 1);
              setMinutes(59);
              setSeconds(59);
            } else {
              setIsRunning(false);
            }
          }
        }
      }, 1000);

      localStorage.setItem("hours", hours);
      localStorage.setItem("minutes", minutes);
      localStorage.setItem("seconds", seconds);
      localStorage.setItem("isRunning", isRunning);

      return () => clearInterval(interval);
    }
  }, [isRunning, hours, minutes, seconds]);

  const startTimer = (e) => {
    e.preventDefault();
    if (hours === 0 && minutes === 0 && seconds === 0) {
      setIsRunning(false);
    } else if (!isRunning) {
      setIsRunning(true);
    }
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setHours(0);
    setMinutes(0);
    setSeconds(0);

    localStorage.removeItem("hours");
    localStorage.removeItem("minutes");
    localStorage.removeItem("seconds");
    localStorage.removeItem("isRunning");
  };

  function Submit(e) {
    e.preventDefault();
    const newHours = parseInt(e.target.elements.hours.value, 10) || 0;
    const newMinutes = parseInt(e.target.elements.minutes.value, 10) || 0;
    const newSeconds = parseInt(e.target.elements.seconds.value, 10) || 0;

    setHours(newHours);
    setMinutes(newMinutes);
    setSeconds(newSeconds);
  }

  return (
    <div
      className="timer"
      style={{
        marginLeft: "300px",
      }}
    >
      <form onSubmit={Submit}>
        <br />
        <br />
        <label style={{ fontSize: "1.2rem" }}>Hours:</label>
        <input type="number" name="hours" />
        <br />
        <br />
        <label style={{ fontSize: "1.2rem" }}>Minutes:</label>
        <input type="number" name="minutes" />
        <br />
        <br />
        <label style={{ fontSize: "1.2rem" }}>Seconds:</label>
        <input type="number" name="seconds" />
        <br />
        <br />
        <button style={{ fontSize: "1.1rem" }}>Submit</button>
      </form>
      <h1>Countdown Timer</h1>
      <h2 className="time-display">
        <span>{hours < 10 ? "0" + hours : hours}</span>:
        <span>{minutes < 10 ? "0" + minutes : minutes}</span>:
        <span>{seconds < 10 ? "0" + seconds : seconds}</span>
      </h2>
      <div className="controls">
        {/* is running false hua then we click on start , start on click pe startimer
       function suru hua usme isrunnuing ka value true hua the stop append hua*/}
        {!isRunning ? (
          <button onClick={startTimer}>Start</button>
        ) : (
          <button onClick={stopTimer}>Stop</button>
        )}
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
}
export default CountdownTimer;
