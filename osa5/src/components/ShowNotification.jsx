import React, { useEffect } from "react";

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }
  return <div className={message.status}>{message.text}</div>;
};

const ShowNotification = ({ message, setMessage }) => {
  useEffect(() => {
    if (message !== null) {
      const timer = setTimeout(() => {
        setMessage(null);
      }, message.timeout);
      return () => clearTimeout(timer);
    }
  }, [message, setMessage]);

  return <Notification message={message} />;
};

export default ShowNotification;
