import React, { Component, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Container } from "@mui/material";
import Title from "../../components/Title";
import Toolbar from "@mui/material/Toolbar";
import { Box } from "@mui/system";
import { TextField } from "@material-ui/core";
import DateTimePicker from "@mui/lab/DateTimePicker";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import Button from "@mui/material/Button";
import api from "../../AxiosInstance";
import { AppBar, Typography } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { MuiThemeProvider } from "@material-ui/core/styles";

import { Tooltip } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import TimeField from "react-simple-timefield";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Loading from "components/Loading";

export default function NewRecordPage() {
  const navigate = useNavigate();
  const [isActivitiesLoading, setIsActivitiesLoading] = useState(true);
  const [date, setDate] = useState(new Date());
  const [activity, setActivity] = useState("");
  const [unit, setUnit] = useState("");
  const [time, setTime] = useState("00:00:00");
  const [units, setUnits] = useState([]);
  const [activities, setActivities] = useState([]);
  const [value, setValue] = useState();
  const [reps, setReps] = useState(0);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    getAll();
  }, []);

  const getAll = () => {
    getUnits();
    getActivities();
  };

  const getActivities = () => {
    api.get("/activities/all").then((response) => {
      setIsActivitiesLoading(false);
      setActivities(response.data);
      console.log(response);
    });
  };

  const getUnits = () => {
    api.get("/records/units").then((response) => {
      setUnits(response.data);
      console.log(response);
    });
  };

  const handleActivityChange = (event) => {
    setActivity(event.target.value);
  };

  const handleUnitChange = (event) => {
    setUnit(event.target.value);
  };

  const handleTimeChange = (event) => {
    const newTime = event.target.value.replace(/-/g, ":");
    setTime(newTime.substr(0, 8));
    var actualTime = newTime.substr(0, 8).split(":");
    var totalSeconds =
      actualTime[0] * 60 * 60 + actualTime[1] * 60 + actualTime[2] * 1;
    setValue(totalSeconds);
  };

  const handleDistanceChange = (event) => {
    setDistance(event.target.value * 1000);
    setValue(event.target.value * 1000);
  };

  const handleRepsChange = (event) => {
    setReps(event.target.value);
    setValue(event.target.value);
  };

  const handleValueChange = () => {};

  const handleSubmit = async () => {
    await api
      .post(`/activities/${activity}/records`, {
        recordDate: `${date.toISOString()}`,
        unitId: `${unit}`,
        value: value,
      })
      .then(() => {
        navigate("/records");
      });
  };

  if (isActivitiesLoading) {
    return Loading();
  }

  const ValueField = () => {
    if (unit === 3) {
      return (
        <TimeField
          showSeconds
          value={time}
          onChange={handleTimeChange}
          input={
            <TextField
              margin="normal"
              fullWidth
              label="Time (hh:mm)"
              value={time}
              variant="standard"
            />
          }
        />
      );
    }
    if (unit === 2) {
      return (
        <TextField
          margin="normal"
          id="name-input"
          fullWidth
          label="Amount"
          variant="standard"
          onChange={handleRepsChange}
        />
      );
    }
    if (unit === 1) {
      return (
        <TextField
          margin="normal"
          id="name-input"
          fullWidth
          label="Distance (km)"
          variant="standard"
          onChange={handleDistanceChange}
        />
      );
    }

    return null;
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        spacing: 5,
        mt: 12,
        width: 1 / 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper elevation={5}>
        <Box
          p={5}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Toolbar>
            <Title> Add new record</Title>
          </Toolbar>
          <FormControl
            variant="standard"
            margin="normal"
            fullWidth
            style={{ minWidth: 230 }}
          >
            <InputLabel id="demo-simple-select-standard-label">
              Activity
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={activity}
              onChange={handleActivityChange}
              color="primary"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {activities.map((row) => (
                <MenuItem key={row.id} value={row.id}>
                  {row.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <DateTimePicker
            renderInput={(props) => (
              <TextField margin="normal" fullWidth {...props} />
            )}
            label="Choose Date"
            value={date}
            ampm={false}
            onChange={(newValue) => {
              setDate(newValue);
            }}
          />

          <FormControl variant="standard" fullWidth style={{ minWidth: 230 }}>
            <InputLabel id="demo-simple-select-standard-label">Type</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={unit}
              onChange={handleUnitChange}
              color="primary"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {units.map((row) => (
                <MenuItem key={row.id} value={row.id}>
                  {row.unit}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {ValueField()}
          <Grid
            sx={{ mt: 3 }}
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="flex-end"
          >
            <Button
              variant="contained"
              onClick={handleSubmit}
              endIcon={<CheckCircleRoundedIcon />}
            >
              Add
            </Button>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}
