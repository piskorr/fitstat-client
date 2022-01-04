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

export default function NewEntryPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [date, setDate] = React.useState(new Date());
  const [activity, setActivity] = React.useState("");
  const [time, setTime] = React.useState("00:00");
  const [hours, setHours] = React.useState("");
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    api.get("/activities/all").then((response) => {
      setIsLoading(false);
      setActivities(response.data);
    });
  }, []);

  const handleActivityChange = (event) => {
    setActivity(event.target.value);
  };

  const handleSubmit = async () => {
    var actualTime = time.split(":");
    var totalSeconds = actualTime[0] * 60 * 60 + actualTime[1] * 60;
    await api
      .post(`/activities/${activity}/entries`, {
        activityDate: `${date.toISOString()}`,
        activityDuration: `${totalSeconds}`,
      })
      .then(() => {
        navigate("/");
      });
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
          p={2}
          sx={{            
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Toolbar>
            <Title> Add new activity entry</Title>
          </Toolbar>
          <FormControl variant="standard" fullWidth style={{ minWidth: 230 }}>
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
          <DateTimePicker
            renderInput={(props) => <TextField fullWidth {...props} />}
            label="Choose Date"
            value={date}
            ampm={false}
            onChange={(newValue) => {
              setDate(newValue);
            }}
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
