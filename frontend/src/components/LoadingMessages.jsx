import React, { useState, useEffect } from "react";

const LoadingMessages = () => {
  const messages = [
    "Just fetching your data, please hang tight!",
    "Almost there, hold on a little longer!",
    "Fetching data... Did you know patience is a virtue?",
    "The database took a coffee break. Be right back!",
    "Good things take time... like this data!",
    "Hang tight, our data is still stretching its legs!",
    "The database is shy, giving it a pep talk!",
    "Still loading... It’s running on dial-up speed!",
    "Grabbing your data... slowly but surely!",
    "The database is taking the scenic route.",
  ];

  const [currentMessage, setCurrentMessage] = useState(messages[0]);

  const getRandomDelay = () => {
    return Math.floor(Math.random() * (5000 - 3000 + 1)) + 5000;
  };

  const getRandomMessage = () => {
    const randomIndex = Math.floor(Math.random() * messages.length);
    return messages[randomIndex];
  };

  useEffect(() => {
    const changeMessage = () => {
      setCurrentMessage(getRandomMessage());
    };

    const delay = getRandomDelay();

    const messageTimeout = setTimeout(() => {
      changeMessage();
    }, delay);

    return () => clearTimeout(messageTimeout);
  }, [currentMessage]);

  return (
    <div style={{ textAlign: "center", marginTop: "10px" }}>
      <p>{currentMessage}</p>
    </div>
  );
};

export default LoadingMessages;
