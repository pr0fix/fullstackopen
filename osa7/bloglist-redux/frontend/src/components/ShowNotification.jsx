import { useSelector } from "react-redux";

const ShowNotification = () => {
  const notification = useSelector((state) => state.notification);

  if (!notification.text) {
    return null;
  }

  const notificationClass =
    notification.status === "success" ? "success" : "error";

  return <div className={notificationClass}>{notification.text}</div>;
};

export default ShowNotification;
