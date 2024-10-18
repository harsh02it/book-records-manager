import React, { useState, useEffect } from "react";

const LoadingMessages = () => {
  const messages = [
    "Please wait, the database is very far away, so it is taking long time.",
    "Arriving in 1 minute...",
    "Be patient, the first time loading takes time, then it won't!",
    "Just fetching your data, please hang tight!",
    "Almost there, hold on a little longer!",
  ];

  const [currentMessage, setCurrentMessage] = useState(messages[0]);
  const [messageIndex, setMessageIndex] = useState(0);

  const getRandomDelay = () => {
    return Math.floor(Math.random() * (10000 - 3000 + 1)) + 5000;
  };

  useEffect(() => {
    const changeMessage = () => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    };

    const delay = getRandomDelay();

    const messageTimeout = setTimeout(() => {
      changeMessage();
    }, delay);

    return () => clearTimeout(messageTimeout);
  }, [messageIndex]);

  useEffect(() => {
    setCurrentMessage(messages[messageIndex]);
  }, [messageIndex]);

  return (
    <div>
      <p>{currentMessage}</p>
    </div>
  );
};

export default LoadingMessages;
