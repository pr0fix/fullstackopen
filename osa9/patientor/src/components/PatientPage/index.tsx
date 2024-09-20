import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Gender, Patient } from "../../types";
import patients from "../../services/patients";
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
  const [loading, setLoading] = useState<boolean>(true);
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
        setLoading(false);
        return;
      }
      try {
        const data = await patients.getById(id);
        setPatient(data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch patient information");
        setLoading(false);
        console.error(error);
      }
    };
    fetchPatientInfo();
  }, [id]);

  if (loading) return <CircularProgress />;

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
        {patient.entries.map((e) => (
          <Box key={e.id}>
            <Typography sx={{ fontStyle: "italic" }}>
              {e.date} {e.description}
            </Typography>
            <List sx={{ listStyleType: "disc", marginLeft: 5, marginTop: 1 }}>
              {e.diagnosisCodes?.map((code, idx) => (
                <ListItem sx={{ display: "list-item", padding: 0 }} key={idx}>
                  <Typography>{code}</Typography>
                </ListItem>
              ))}
            </List>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default PatientPage;
