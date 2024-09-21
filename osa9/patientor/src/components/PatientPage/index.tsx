import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Diagnosis, Gender, Patient } from "../../types";
import patients from "../../services/patients";
import diagnoses from "../../services/diagnoses";
import {
  Alert,
  Box,
  CircularProgress,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";

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
          <Typography>ssn: {patient.ssn}</Typography>
          <Typography>occupation: {patient.occupation}</Typography>
        </Box>
      </Box>
      <Box sx={{ marginTop: 2 }}>
        <Typography sx={{ fontWeight: "bold" }} variant="h6">
          entries
        </Typography>
        {patient.entries?.map((e) => (
          <Box key={e.id}>
            <Typography sx={{ fontStyle: "italic" }}>
              {e.date} {e.description}
            </Typography>
            <List sx={{ listStyleType: "disc", marginLeft: 5, marginTop: 1 }}>
              {e.diagnosisCodes?.map((code, idx) => {
                const diagnosis = diagnosisList.find((d) => d.code === code);

                return (
                  <ListItem sx={{ display: "list-item", padding: 0 }} key={idx}>
                    <Typography>
                      {code} {diagnosis ? diagnosis.name : "Unknown diagnosis"}
                    </Typography>
                  </ListItem>
                );
              })}
            </List>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default PatientPage;
