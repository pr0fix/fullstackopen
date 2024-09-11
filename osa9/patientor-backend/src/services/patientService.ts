import patientData from "../../data/patients";
import { v1 as uuid } from "uuid";
import { Patient, NoSSNPatient, NewPatient } from "../types";

// const getPatients = (): Patient[] => {
//   return patients;
// };

const getNoSSNPatients = (): NoSSNPatient[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  } as NoSSNPatient));
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ssn: patient.ssn ?? "",
    ...patient,
  };
  patientData.push(newPatient);
  return newPatient;
};

export default {
  // getPatients,
  getNoSSNPatients,
  addPatient,
};
