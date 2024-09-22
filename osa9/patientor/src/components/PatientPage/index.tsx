import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Diagnosis, Entry, Gender, Patient } from "../../types";
import patients from "../../services/patients";
import diagnoses from "../../services/diagnoses";
import {
  Alert,
  Box,
  Card,
  CardContent,
  CircularProgress,
  List,
  Typography,
} from "@mui/material";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";
import {
  HealthCheck,
  Hospital,
  OccupationalHealthcare,
} from "../EntryComponents";
import AddEntryForm from "../NewEntryForm"

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "HealthCheck":
      return <HealthCheck entry={entry} />;
    case "Hospital":
      return <Hospital entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcare entry={entry} />;
    default:
      return assertNever(entry);
  }
};

const PatientPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnosisList, setDiagnosisList] = useState<Diagnosis[]>([]);
  const [loadingPatient, setLoadingPatient] = useState<boolean>(true);
  const [loadingDiagnoses, setLoadingDiagnoses] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getGenderIcon = (gender: Gender) => {
    switch (gender) {
      case Gender.Male:
        return <MaleIcon />;
      case Gender.Female:
        return <FemaleIcon />;
      case Gender.Other:
        return <TransgenderIcon />;
      default:
        return null;
    }
  };

  useEffect(() => {
    const fetchPatientInfo = async () => {
      if (!id) {
        setError("Patient ID not found.");
        setLoadingPatient(false);
        return;
      }
      try {
        const data: Patient = await patients.getById(id);
        setPatient(data);
      } catch (error: unknown) {
        setError("Failed to fetch patient information");
        setLoadingPatient(false);
        console.error(error);
      } finally {
        setLoadingPatient(false);
      }
    };
    fetchPatientInfo();
  }, [id]);

  useEffect(() => {
    const fetchDiagnoses = async () => {
      if (diagnosisList.length === 0) {
        try {
          const data: Diagnosis[] = await diagnoses.getAll();
          setDiagnosisList(data);
        } catch (error: unknown) {
          setError("Failed to fetch diagnoses.");
          setLoadingDiagnoses(false);
          console.error(error);
        } finally {
          setLoadingDiagnoses(false);
        }
      }
    };
    fetchDiagnoses();
  }, [diagnosisList.length]);

  if (loadingPatient || loadingDiagnoses) return <CircularProgress />;

  if (error) return <Alert severity="error">{error}</Alert>;

  if (!patient) return <Typography>No patient data available</Typography>;

  return (
    <Box>
      <Box sx={{ marginTop: 2 }}>
        <Typography sx={{ fontWeight: "bold" }} variant="h5">
          {patient.name} {getGenderIcon(patient.gender)}
        </Typography>
        <Box sx={{ marginTop: 2 }}>
          <Typography>SSN: {patient.ssn}</Typography>
          <Typography>Occupation: {patient.occupation}</Typography>
        </Box>
      </Box>
      <Box sx={{marginTop: 5, marginBottom: 5}}>
        <AddEntryForm />
      </Box>
      <Box>
        <Typography sx={{ fontWeight: "bold" }} variant="h6">
          Entries
        </Typography>
        {patient.entries?.map((e) => (
          <EntryDetails key={e.id} entry={e} />
        ))}
        {patient.entries.some((e) => e.diagnosisCodes?.length) && (
          <Box>
            <Typography sx={{ fontWeight: "bold", marginTop: 2 }} variant="h6">
              Diagnoses
            </Typography>
            <List>
              {patient.entries.flatMap((e) =>
                e.diagnosisCodes?.map((code) => {
                  const diagnosis = diagnosisList.find((d) => d.code === code);
                  return (
                    <Box key={code}>
                      <Card sx={{ margin: 1 }}>
                        <CardContent>
                          <Typography>
                            {code}{" "}
                            {diagnosis ? diagnosis.name : "Unknown diagnosis"}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Box>
                  );
                })
              )}
            </List>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default PatientPage;
