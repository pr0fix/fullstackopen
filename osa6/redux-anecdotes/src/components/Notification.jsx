import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => {
    return state.notification;
  });

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };

  const clearNotification = () => {
    return notification === "";
  };

  const displayNotification = () => {
    return <div style={style}>{notification}</div>;
  };

  return <>{clearNotification() ? null : displayNotification()}</>;
};

export default Notification;
