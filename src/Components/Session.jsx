import React from "react";
import moment from "moment";

const Session = ({
  sessionLength,
  handleSessionDecrease,
  handleSessionIncrease,
}) => {
  const sessionLengthInMinutes = moment.duration(sessionLength, "s").asMinutes();

  return (
    <div className="time-container">
      <h1 id="session-label">Session</h1>
      <h1 id="session-length" className="flex">
        {sessionLengthInMinutes}
      </h1>
      <button id="session-decrement" onClick={handleSessionDecrease}>-</button>     
      <button id="session-increment" onClick={handleSessionIncrease}>+</button>
    </div>
  );
};

export default Session;
