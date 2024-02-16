import axios from 'axios';
const url = 'http://localhost:3001/persons';

const getAll = async () => {
    const request = axios.get(url)
    const response = await request;
    return response.data;
}

const create = async newObject => {
    const request = axios.post(url, newObject)
    const response = await request;
    return response.data;
}

export default { getAll, create }