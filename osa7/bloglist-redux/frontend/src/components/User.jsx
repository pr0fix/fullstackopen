import { useSelector } from "react-redux";

const User = () => {
  const user = useSelector((state) => state.user);


  return(

    <>
    <h2>{user.name}</h2>
    </>
  )
};

export default User;
