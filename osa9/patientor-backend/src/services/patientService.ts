import patientData from "../../data/patients";
import { v1 as uuid } from "uuid";
import { Patient, NoSSNPatient, NewPatient, Gender } from "../types";

// const getPatients = (): Patient[] => {
//   return patients;
// };

const getNoSSNPatients = (): NoSSNPatient[] => {
  return patientData.map(
    ({ id, name, dateOfBirth, gender, occupation }) =>
      ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
      } as NoSSNPatient)
  );
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ssn: patient.ssn ?? "",
    entries: [],
    ...patient,
  };
  patientData.push(newPatient);
  return newPatient;
};

const findPatientById = (id: string): Patient | undefined => {
  const entry = patientData.find((p) => p.id === id);
  if (entry) {
    return {
      ...entry,
      gender: entry.gender as Gender,
    };
  }
  return undefined;
};

export default {
  // getPatients,
  getNoSSNPatients,
  addPatient,
  findPatientById,
};
