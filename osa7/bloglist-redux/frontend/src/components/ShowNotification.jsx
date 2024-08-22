import { useSelector } from "react-redux";

const ShowNotification = () => {
  const notification = useSelector((state) => state.notification);

  if (!notification.text) {
    return null;
  }

  const notificationClass =
    notification.status === "success"
      ? "bg-green-100 border-green-500 text-green-700 font-bold fixed"
      : "bg-red-100 border-red-500 text-red-700 font-bold fixed";

  return <div className={notificationClass}>{notification.text}</div>;
};

export default ShowNotification;
