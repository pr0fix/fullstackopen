import express, { Request, Response } from "express";
import patientService from "../services/patientService";
import { NewPatient, NoSSNPatient, Patient } from "../types";
import { errorMiddleware, newPatientParser } from "../middleware";

const router = express.Router();

router.get("/", (_req, res: Response<NoSSNPatient[]>) => {
  res.send(patientService.getNoSSNPatients());
});

router.post(
  "/",
  newPatientParser,
  (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
    const addedPatient = patientService.addPatient(req.body);
    res.json(addedPatient);
  }
);

router.get("/:id", (req, res) => {
  const patient = patientService.findPatientById(req.params.id);
  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.use(errorMiddleware);

export default router;
