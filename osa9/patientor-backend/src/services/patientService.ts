import patientData from "../../data/patients";
import { v1 as uuid } from "uuid";
import { Patient, NoSSNPatient, NewPatient, Entry } from "../types";
import parseDiagnosisCodes from "../utils/parseDiagnosisCodes";

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

const findPatientById = (id: string): Patient | undefined => {
  const entry = patientData.find((p) => p.id === id);
  if (entry) {
    return entry;
  }
  return undefined;
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

const addPatientEntry = (id: string, entry: Entry): Patient | undefined => {
  const patient = patientData.find((p) => p.id === id);

  if (!patient) return undefined;

  const diagnosisCodes = parseDiagnosisCodes(entry)

  let newEntry: Entry;

  if (entry.type === "HealthCheck") {
    newEntry = {
      id: uuid(),
      type: entry.type,
      description: entry.description,
      date: entry.date,
      specialist: entry.specialist,
      diagnosisCodes,
      healthCheckRating: entry.healthCheckRating,
    };
  } else if (entry.type === "Hospital") {
    newEntry = {
      id: uuid(),
      type: entry.type,
      description: entry.description,
      date: entry.date,
      specialist: entry.specialist,
      diagnosisCodes,
      discharge: entry.discharge,
    };
  } else if (entry.type === "OccupationalHealthcare") {
    newEntry = {
      id: uuid(),
      type: entry.type,
      description: entry.description,
      date: entry.date,
      specialist: entry.specialist,
      diagnosisCodes,
      employerName: entry.employerName,
      sickLeave: entry.sickLeave,
    };
  } else {
    throw new Error(`Unsupported entry type`);
  }
  patient.entries.push(newEntry);
  return patient;
};

export default {
  // getPatients,
  getNoSSNPatients,
  addPatient,
  findPatientById,
  addPatientEntry,
};
