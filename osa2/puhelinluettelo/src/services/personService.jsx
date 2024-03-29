import axios from 'axios';
const url = '/api/persons';

const getAllPersons = async () => {
    const request = axios.get(url);
    const response = await request;
    return response.data;
}

const createPerson = async newObject => {
    const request = axios.post(url, newObject);
    const response = await request;
    return response.data;
}

const deletePerson = async (id) => {
    const request = axios.delete(`${url}/${id}`);
    const response = await request;
    return response.data;
}

const updatePerson = async (id, newPerson) => {
    const request = axios.put(`${url}/${id}`, newPerson);
    const response = await request;
    return response.data;
}

export default { getAllPersons, createPerson, deletePerson, updatePerson }