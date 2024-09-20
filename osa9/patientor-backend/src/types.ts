import { z } from "zod";
import { NewPatientSchema } from "./utils";
export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export type NewPatient = z.infer<typeof NewPatientSchema>;

export interface Entry {}

export interface Patient extends NewPatient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[];
}

export type NoSSNPatient = Omit<Patient, "ssn" | "entries">;
