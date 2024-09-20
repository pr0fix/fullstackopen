import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Gender, Patient } from "../../types";
import patients from "../../services/patients";
import { Box, Typography } from "@mui/material";
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

  if (loading) return <div>loading...</div>;

  if (error) return <div>{error}</div>;

  if (!patient) return <div>No patient data available</div>;

  return (
    <Box sx={{ marginTop: 2 }}>
      <Typography sx={{ fontWeight: "bold" }} variant="h5">
        {patient.name} {getGenderIcon(patient.gender)}
      </Typography>
      <Box sx={{ marginTop: 2 }}>
        <Typography>ssn: {patient.ssn}</Typography>
        <Typography>occupation: {patient.occupation}</Typography>
      </Box>
    </Box>
  );
};

export default PatientPage;
