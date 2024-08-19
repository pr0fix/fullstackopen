import axios from "axios";
const baseUrl = "/api/users";

const getUsers = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const getUser = async (id) => {
  const res = await axios.get(`${baseUrl}/${id}`);
  return res.data;
};

export default { getUsers, getUser };
