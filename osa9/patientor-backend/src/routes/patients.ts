import express, { Request, Response } from "express";
import patientService from "../services/patientService";
import { NewPatient, NoSSNPatient, Patient } from "../types";
import { errorMiddleware, newPatientParser } from "../middleware";

const router = express.Router();

router.get("/", (_req, res: Response<NoSSNPatient[]>) => {
  res.send(patientService.getNoSSNPatients());
});

router.get("/:id", (req, res) => {
  const patient = patientService.findPatientById(req.params.id);
  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post(
  "/",
  newPatientParser,
  (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
    const addedPatient = patientService.addPatient(req.body);
    res.json(addedPatient);
  }
);

router.post("/:id/entries", (req, res) => {
  try {
    const { id } = req.params;
    const newEntry = req.body;

    const updatedPatient = patientService.addPatientEntry(id, newEntry);

    if (updatedPatient) {
      res.json(updatedPatient);
    } else {
      res.status(400).send({ error: "Patient not found" });
    }
  } catch (error) {
    res.status(400).send({ error: (error as Error).message });
  }
});

router.use(errorMiddleware);

export default router;
