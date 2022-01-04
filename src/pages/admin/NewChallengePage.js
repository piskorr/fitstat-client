import React, { Component, useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import Title from "../../components/Title";
import Toolbar from "@mui/material/Toolbar";
import { Box } from "@mui/system";
import { TextField } from "@material-ui/core";
import DateTimePicker from "@mui/lab/DateTimePicker";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import Button from "@mui/material/Button";
import api from "../../AxiosInstance";
import Loading from "components/Loading";
import TimeField from "react-simple-timefield";

export default function NewChallangePage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [activity, setActivity] = React.useState();
  const [description, setDesccription] = React.useState("");
  const [time, setTime] = React.useState("00:00");
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    api.get("/activities/all").then((response) => {
      setActivities(response.data);
      setIsLoading(false);
      console.log(response);
    });
  }, []);

  const handleSubmit = async () => {
    console.log(time);
    var actualTime = time.split(":");
    var totalSeconds = actualTime[0] * 60 * 60 + actualTime[1] * 60;
    console.log("Total Seconds=" + totalSeconds);
    await api
      .post(`/challenges`, {
        activityId: activity,
        description: description,
        challengeTime: totalSeconds,
      })
      .then((response) => {
        console.log(response);
        navigate("/admin/challenges");
      });
  };

  const handleActivityChange = (event) => {
    setActivity(event.target.value);
  };

  const handleDescChange = (event) => {
    setDesccription(event.target.value);
  };

  const handleTimeChange = (event) => {
    const newTime = event.target.value.replace(/-/g, ":");
    setTime(newTime.substr(0, 5));
  };

  if (isLoading) {
    return Loading();
  }

  return (
    <Container
      maxWidth="sm"
      sx={{
        mt: 12,
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
            spacing: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Toolbar>
            <Title> Add new challenge</Title>
          </Toolbar>
          <FormControl variant="standard" style={{ minWidth: 230, mb: 4 }}>
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

          <TimeField
            value={time}
            onChange={handleTimeChange}
            input={
              <TextField
                fullWidth
                label="Time (hh:mm)"
                value={time}
                variant="standard"
              />
            }
          />

          <TextField
            margin="normal"
            id="name-input"
            fullWidth
            label="Challenge description"
            variant="standard"
            multiline
            rows={4}
            onChange={handleDescChange}
          />

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
