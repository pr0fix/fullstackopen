import { LocalHospital, MedicalServices, Work } from "@mui/icons-material";
import {
  HealthCheckEntry,
  HealthCheckRating,
  HospitalEntry,
  OccupationalHealthcareEntry,
} from "../../types";
import { Card, CardContent, Typography } from "@mui/material";
import HealthIcon from "@mui/icons-material/Favorite";

const healthIcon = (rating: HealthCheckRating) => {
  switch (rating) {
    case HealthCheckRating.Healty:
      return <HealthIcon sx={{ fill: "green" }} />;
    case HealthCheckRating.LowRisk:
      return <HealthIcon sx={{ fill: "yellow" }} />;
    case HealthCheckRating.HighRisk:
      return <HealthIcon sx={{ fill: "orange" }} />;
    case HealthCheckRating.CriticalRisk:
      return <HealthIcon sx={{ fill: "red" }} />;
  }
};

export const HealthCheck: React.FC<{ entry: HealthCheckEntry }> = ({
  entry,
}) => (
  <Card sx={{ margin: 1 }}>
    <CardContent>
      <Typography variant="h6">
        {entry.date} <MedicalServices />
      </Typography>
      <Typography sx={{ fontStyle: "italic" }}>{entry.description}</Typography>
      {healthIcon(entry.healthCheckRating)}
      <Typography>Diagnose by {entry.specialist}</Typography>
    </CardContent>
  </Card>
);

export const Hospital: React.FC<{ entry: HospitalEntry }> = ({ entry }) => (
  <Card sx={{ margin: 1 }}>
    <CardContent>
      <Typography variant="h6">
        {entry.date} <LocalHospital />
      </Typography>
      <Typography sx={{ fontStyle: "italic" }}>{entry.description}</Typography>
      {entry && (
        <Typography sx={{ fontStyle: "italic" }}>
          Discharged on {entry.discharge.date}: {entry.discharge.criteria}
        </Typography>
      )}
      <Typography>Diagnose by {entry.specialist}</Typography>
    </CardContent>
  </Card>
);

export const OccupationalHealthcare: React.FC<{
  entry: OccupationalHealthcareEntry;
}> = ({ entry }) => (
  <Card sx={{margin: 1}}>
    <CardContent>
      <Typography variant="h6">
        {entry.date} <Work /> {entry.employerName}
      </Typography>
      <Typography sx={{ fontStyle: "italic" }}>{entry.description}</Typography>
      {entry.sickLeave && (
        <Typography sx={{ fontStyle: "italic" }}>
          Sick leave from {entry.sickLeave.startDate} to{" "}
          {entry.sickLeave.endDate}
        </Typography>
      )}
      <Typography>Diagnose by {entry.specialist}</Typography>
    </CardContent>
  </Card>
);
