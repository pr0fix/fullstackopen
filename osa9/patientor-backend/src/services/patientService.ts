import patientData from "../../data/patients";
import { v1 as uuid } from "uuid";
import { Patient, NoSSNPatient, NewPatient } from "../types";

const patients: Patient[] = patientData;

const getPatients = (): Patient[] => {
  return patients;
};

const getNoSSNPatients = (): NoSSNPatient[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient,
  };
  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  getNoSSNPatients,
  addPatient,
};
