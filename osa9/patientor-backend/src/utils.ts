import { Gender } from "./types";
import { z } from "zod";

export const NewPatientSchema = z.object({
  name: z.string().min(2, "Name is required and cannot be empty"),
  dateOfBirth: z.string().date(),
  ssn: z.string().optional(),
  gender: z.nativeEnum(Gender),
  occupation: z.string().min(2, "Occupation is required and cannot be empty"),
});
