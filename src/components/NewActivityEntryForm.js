import React, { useEffect, useState } from "react";
import {
  AppBar,
  Container,
  Grid,
  Modal,
  Toolbar,
  Typography,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { Box, TextField } from "@material-ui/core";
import { Paper } from "@mui/material";
import { Tooltip } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import DateTimePicker from "@mui/lab/DateTimePicker";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Title from "./Title";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import Button from "@mui/material/Button";
import api from "../AxiosInstance";

const style = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  verticalAlign: "middle",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "30%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  color: "primary",
};

const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#006faa",
    },
    secondary: {
      main: "#f50055",
    },
  },
});

const NewActivityEntryForm = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [date, setDate] = React.useState(new Date());
  const [activity, setActivity] = React.useState("");
  const [mins, setMins] = React.useState("");
  const [hours, setHours] = React.useState("");
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    api.get("/activities/all").then((response) => {
      setActivities(response.data);
    });
  }, []);

  const handleActivityChange = (event) => {
    setActivity(event.target.value);
  };

  const handleMinsChange = (event) => {
    setMins(event.target.value);
  };

  const handleHoursChange = (event) => {
    setHours(event.target.value);
  };

  const addActivityEntry = async () => {
    var duration = mins * 60 + hours * 3600;
    let res = await api.post(`/activities/${activity}/entries`, {
      activityDate: `${date.toISOString()}`,
      activityDuration: `${duration}`,
    });
    console.log(res);
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Tooltip title="Add activity">
        <IconButton
          color="primary"
          edge="end"
          aria-label="add"
          size="large"
          onClick={handleOpen}
        >
          <AddCircleOutlineOutlinedIcon fontSize="large" />
        </IconButton>
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <MuiThemeProvider theme={theme}>
          <Paper sx={style}>
            <Grid>
              <Grid maxWidth="md">
                <Toolbar>
                  <Title>Add new activity entry:</Title>
                </Toolbar>
              </Grid>
              <Grid maxWidth="md" sx={{ mb: 3 }}>
                <FormControl variant="standard" style={{ minWidth: 230 }}>
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
              </Grid>
              <Grid maxWidth="md" container wrap="nowrap" sx={{ mb: 3 }}>
                <Grid item sx={{ m: 2 }}>
                  <TextField
                    style={{ width: 100 }}
                    id="standard-number"
                    label="Hours"
                    type="number"
                    variant="outlined"
                    onChange={handleHoursChange}
                  />
                </Grid>
                <Grid item sx={{ m: 2 }}>
                  <TextField
                    style={{ width: 100 }}
                    id="standard-number"
                    label="Minutes"
                    type="number"
                    variant="outlined"
                    onChange={handleMinsChange}
                  />
                </Grid>
              </Grid>
              <Grid maxWidth="md" sx={{ mb: 3 }}>
                <DateTimePicker
                  renderInput={(props) => <TextField {...props} />}
                  label="Choose Date"
                  value={date}
                  ampm={false}
                  onChange={(newValue) => {
                    setDate(newValue);
                  }}
                />
              </Grid>
              <Grid
                sx={{ mt: 3 }}
                container
                direction="row"
                justifyContent="flex-end"
                alignItems="flex-end"
              >
                <Button
                  variant="contained"
                  onClick={addActivityEntry}
                  endIcon={<CheckCircleRoundedIcon />}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </MuiThemeProvider>
      </Modal>
    </React.Fragment>
  );
};

export default NewActivityEntryForm;
