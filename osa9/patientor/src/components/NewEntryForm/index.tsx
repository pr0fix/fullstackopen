import { useState, SyntheticEvent } from "react";

import {
  TextField,
  Container,
  Typography,
  Button,
  MenuItem,
  Select,
  Checkbox,
  ListItemText,
  FormControl,
  InputLabel,
  Alert,
} from "@mui/material";
import {
  Diagnosis,
  EntryFormValues,
  HealthCheckEntry,
  HealthCheckRating,
  HospitalEntry,
  OccupationalHealthcareEntry,
} from "../../types";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { useParams } from "react-router-dom";
import patients from "../../services/patients";

interface AddEntryFormProps {
  diagnosisList: Diagnosis[];
  fetchPatientInfo: () => void;
  fetchDiagnoses: () => void;
}

const AddEntryForm: React.FC<AddEntryFormProps> = ({
  diagnosisList,
  fetchPatientInfo,
  fetchDiagnoses,
}) => {
  const { id } = useParams<{ id: string }>();
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<Dayjs | null>(null);
  const [specialist, setSpecialist] = useState<string>("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [entryType, setEntryType] = useState<
    "HealthCheck" | "Hospital" | "OccupationalHealthcare"
  >("HealthCheck");
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(
    HealthCheckRating.Healthy
  );
  const [dischargeDate, setDischargeDate] = useState<Dayjs | null>(null);
  const [dischargeCriteria, setDischargeCriteria] = useState<string>("");
  const [employerName, setEmployerName] = useState<string>("");
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState<Dayjs | null>(
    null
  );
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState<Dayjs | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const formatDate = (date: Dayjs | null): string => {
    return date ? dayjs(date).format("YYYY-MM-DD") : "";
  };

  const addEntry = async (event: SyntheticEvent) => {
    event.preventDefault();
    setErrorMessage(null);

    let entry: EntryFormValues | undefined;

    if (entryType === "HealthCheck") {
      entry = {
        type: "HealthCheck",
        description,
        date: formatDate(date),
        specialist,
        diagnosisCodes: diagnosisCodes,
        healthCheckRating,
      } as HealthCheckEntry;
    } else if (entryType === "Hospital") {
      entry = {
        type: "Hospital",
        description,
        date: formatDate(date),
        specialist,
        diagnosisCodes: diagnosisCodes,
        discharge: {
          date: formatDate(dischargeDate),
          criteria: dischargeCriteria,
        },
      } as HospitalEntry;
    } else if (entryType === "OccupationalHealthcare") {
      entry = {
        type: "OccupationalHealthcare",
        description,
        date: formatDate(date),
        specialist,
        diagnosisCodes: diagnosisCodes,
        employerName,
        sickLeave:
          sickLeaveStartDate && sickLeaveEndDate
            ? {
                startDate: formatDate(sickLeaveStartDate),
                endDate: formatDate(sickLeaveEndDate),
              }
            : undefined,
      } as OccupationalHealthcareEntry;
    }
    if (!id) {
      setErrorMessage("Patient not found.");
      return;
    }
    if (entry) {
      try {
        await patients.createEntry(id, entry);
        fetchPatientInfo();
        fetchDiagnoses();
      } catch (error) {
        setErrorMessage("Failed to add entry. Please try again.");
      } finally {
        setDescription("");
        setDate(null);
        setSpecialist("");
        setDiagnosisCodes([]);
        setEntryType("HealthCheck");
        setHealthCheckRating(HealthCheckRating.Healthy);
        setDischargeDate(null);
        setDischargeCriteria("");
        setEmployerName("");
        setSickLeaveStartDate(null);
        setSickLeaveEndDate(null);
      }
    } else {
      setErrorMessage("Entry creation failed.");
    }
  };

  return (
    <Container style={{ outline: "dotted", padding: 20 }}>
      <Typography sx={{ fontSize: 18, fontWeight: "bold", paddingTop: 1 }}>
        New Entry
      </Typography>

      {errorMessage && (
        <Alert severity="error" sx={{ marginBottom: 2 }}>
          {errorMessage}
        </Alert>
      )}

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
          required
          variant="standard"
          sx={{ margin: 1 }}
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <DatePicker
          sx={{ margin: 1, width: "100%" }}
          label="Date"
          value={date}
          onChange={(newDate) => setDate(newDate)}
          slotProps={{
            textField: {
              required: true,
            },
          }}
        />
        <TextField
          label="Specialist"
          fullWidth
          required
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
            required
            variant="standard"
            sx={{ margin: 1 }}
            value={healthCheckRating}
            onChange={({ target }) =>
              setHealthCheckRating(Number(target.value) as HealthCheckRating)
            }
            InputProps={{
              inputProps: {
                min: 0,
                max: 3,
              },
            }}
          />
        )}
        <FormControl fullWidth variant="standard" sx={{ margin: 1 }}>
          <InputLabel id="diagnosis-codes-label">Diagnosis Codes</InputLabel>
          <Select
            labelId="diagnosis-codes-label"
            multiple
            value={diagnosisCodes}
            onChange={(e) => setDiagnosisCodes(e.target.value as string[])}
            renderValue={(selected) => selected.join(", ")}
          >
            {diagnosisList.map((d) => (
              <MenuItem key={d.code} value={d.code}>
                <Checkbox checked={diagnosisCodes.indexOf(d.code) > -1} />
                <ListItemText primary={`${d.code} - ${d.name}`} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {entryType === "Hospital" && (
          <>
            <DatePicker
              label="Discharge Date"
              sx={{ margin: 1, width: "100%" }}
              value={dischargeDate}
              onChange={(newDate) => setDischargeDate(newDate)}
              slotProps={{
                textField: {
                  required: true,
                },
              }}
              minDate={date ?? undefined}
            />
            <TextField
              label="Discharge Criteria"
              fullWidth
              required
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
              required
              sx={{ margin: 1 }}
              value={employerName}
              onChange={({ target }) => setEmployerName(target.value)}
            />
            <DatePicker
              label="Sick Leave Start Date"
              sx={{ margin: 1, width: "100%" }}
              value={sickLeaveStartDate}
              onChange={(newDate) => setSickLeaveStartDate(newDate)}
              minDate={date ?? undefined}
            />
            <DatePicker
              label="Sick Leave End Date"
              sx={{ margin: 1, width: "100%" }}
              value={sickLeaveEndDate}
              onChange={(newDate) => setSickLeaveEndDate(newDate)}
              minDate={sickLeaveStartDate ?? date ?? undefined}
            />
          </>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ marginLeft: 1 }}
        >
          Add Entry
        </Button>
      </form>
    </Container>
  );
};

export default AddEntryForm;
