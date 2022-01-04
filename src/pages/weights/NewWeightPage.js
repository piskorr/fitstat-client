import React, { Component, useRef, useState } from "react";
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

export default function NewWeightPage() {
  const navigate = useNavigate();
  const [weight, setWeight] = React.useState(-1);
  const [date, setDate] = React.useState(new Date());

  const handleSubmit = async () => {
    await api.post(`/users/weight`, { weight: weight, date: date }).then(() => {
      navigate("/weights");
    });
  };

  const handleWeightChange = (event) => {
    setWeight(event.target.value);
  };

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
            <Title> Add new weight entry</Title>
          </Toolbar>
          <TextField
            margin="normal"
            id="value-input"
            label="Weight (kg)"
            type="number"
            fullWidth
            variant="standard"
            onChange={handleWeightChange}
          />
          <DateTimePicker
            // @ts-ignore
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
