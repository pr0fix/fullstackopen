import { useState, SyntheticEvent } from "react";

import {
  TextField,
  Container,
  Typography,
  Button,
  MenuItem,
  Select,
} from "@mui/material";
import {
  EntryFormValues,
  HealthCheckEntry,
  HealthCheckRating,
  HospitalEntry,
  OccupationalHealthcareEntry,
} from "../../types";
import { DatePicker } from "@mui/x-date-pickers";
import { useParams } from "react-router-dom";
import patients from "../../services/patients";

const AddEntryForm = () => {
  const { id } = useParams<{ id: string }>();
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [specialist, setSpecialist] = useState<string>("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string>("");

  const [entryType, setEntryType] = useState<
    "HealthCheck" | "Hospital" | "OccupationalHealthcare"
  >("HealthCheck");

  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(
    HealthCheckRating.Healthy
  );
  const [dischargeDate, setDischargeDate] = useState<string>("");
  const [dischargeCriteria, setDischargeCriteria] = useState<string>("");
  const [employerName, setEmployerName] = useState<string>("");
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState<string>("");
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState<string>("");

  const addEntry = async (event: SyntheticEvent) => {
    event.preventDefault();

    let entry: EntryFormValues | undefined;

    if (entryType === "HealthCheck") {
      entry = {
        type: "HealthCheck",
        description,
        date,
        specialist,
        diagnosisCodes: diagnosisCodes
          ? diagnosisCodes.split(",").map((code) => code.trim())
          : [],
        healthCheckRating,
      } as HealthCheckEntry;
    } else if (entryType === "Hospital") {
      entry = {
        type: "Hospital",
        description,
        date,
        specialist,
        diagnosisCodes: diagnosisCodes
          ? diagnosisCodes.split(",").map((code) => code.trim())
          : [],
        discharge: {
          date: dischargeDate,
          criteria: dischargeCriteria,
        },
      } as HospitalEntry;
    } else if (entryType === "OccupationalHealthcare") {
      entry = {
        type: "OccupationalHealthcare",
        description,
        date,
        specialist,
        diagnosisCodes: diagnosisCodes
          ? diagnosisCodes.split(",").map((code) => code.trim())
          : [],
        employerName,
        sickLeave:
          sickLeaveStartDate && sickLeaveEndDate
            ? { startDate: sickLeaveStartDate, endDate: sickLeaveEndDate }
            : undefined,
      } as OccupationalHealthcareEntry;
    }
    if (!id) {
      throw new Error("Patient not found");
    }
    if (entry) {
      try {
        await patients.createEntry(id, entry);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error("Entry creation failed");
    }
  };

  return (
    <Container style={{ outline: "dotted", padding: 20 }}>
      <Typography sx={{ fontSize: 18, fontWeight: "bold", paddingTop: 1 }}>
        New Entry
      </Typography>

      <Select
        value={entryType}
        onChange={(e) =>
          setEntryType(
            e.target.value as
              | "HealthCheck"
              | "Hospital"
              | "OccupationalHealthcare"
          )
        }
        fullWidth
        sx={{ margin: 1 }}
      >
        <MenuItem value="HealthCheck">Health Check</MenuItem>
        <MenuItem value="Hospital">Hospital</MenuItem>
        <MenuItem value="OccupationalHealthcare">
          Occupational Healthcare
        </MenuItem>
      </Select>

      <form onSubmit={addEntry}>
        <TextField
          label="Description"
          fullWidth
          variant="standard"
          sx={{ margin: 1 }}
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          label="Date"
          fullWidth
          variant="standard"
          sx={{ margin: 1 }}
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        {/* <DatePicker label="Date" /> */}
        <TextField
          label="Specialist"
          fullWidth
          variant="standard"
          sx={{ margin: 1 }}
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />

        {entryType === "HealthCheck" && (
          <TextField
            label="Health Check Rating"
            type="number"
            fullWidth
            variant="standard"
            sx={{ margin: 1 }}
            value={healthCheckRating}
            onChange={({ target }) =>
              setHealthCheckRating(Number(target.value) as HealthCheckRating)
            }
          />
        )}
        <TextField
          label="Diagnosis Codes"
          fullWidth
          variant="standard"
          sx={{ margin: 1 }}
          value={diagnosisCodes}
          onChange={({ target }) => setDiagnosisCodes(target.value)}
        />

        {entryType === "Hospital" && (
          <>
            <TextField
              label="Discharge Date"
              fullWidth
              variant="standard"
              sx={{ margin: 1 }}
              value={dischargeDate}
              onChange={({ target }) => setDischargeDate(target.value)}
            />
            <TextField
              label="Discharge Criteria"
              fullWidth
              variant="standard"
              sx={{ margin: 1 }}
              value={dischargeCriteria}
              onChange={({ target }) => setDischargeCriteria(target.value)}
            />
          </>
        )}

        {entryType === "OccupationalHealthcare" && (
          <>
            <TextField
              label="Employer Name"
              fullWidth
              variant="standard"
              sx={{ margin: 1 }}
              value={employerName}
              onChange={({ target }) => setEmployerName(target.value)}
            />
            <TextField
              label="Sick Leave Start Date"
              fullWidth
              variant="standard"
              sx={{ margin: 1 }}
              value={sickLeaveStartDate}
              onChange={({ target }) => setSickLeaveStartDate(target.value)}
            />
            <TextField
              label="Sick Leave End Date"
              fullWidth
              variant="standard"
              sx={{ margin: 1 }}
              value={sickLeaveEndDate}
              onChange={({ target }) => setSickLeaveEndDate(target.value)}
            />
          </>
        )}
        <Button type="submit" variant="contained" color="primary">
          Add Entry
        </Button>
      </form>
    </Container>
  );
};

export default AddEntryForm;
