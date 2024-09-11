import express, { Request, Response} from "express";
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

router.use(errorMiddleware);

export default router;
