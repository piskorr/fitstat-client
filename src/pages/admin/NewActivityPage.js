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

export default function NewActivityPage() {
  const navigate = useNavigate();
  const [name, setName] = React.useState("");
  const [desc, setDesc] = React.useState("");
  const [met, setMet] = React.useState(1);

  const handleSubmit = async () => {
    await api
      .post(`/activities`, { name: name, description: desc, met: met })
      .then(() => {
        navigate("/admin/activities");
      });
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescChange = (event) => {
    setDesc(event.target.value);
  };

  const handleMetChange = (event) => {
    setMet(event.target.value);
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
            <Title> Add new activity</Title>
          </Toolbar>
          <TextField
            margin="normal"
            id="name-input"
            fullWidth
            label="Activity name"
            variant="standard"
            onChange={handleNameChange}
          />
          <TextField
            margin="normal"
            id="name-input"
            fullWidth
            label="Activity description"
            variant="standard"
            multiline
            rows={4}
            onChange={handleDescChange}
          />
          <TextField
            margin="normal"
            id="value-input"
            label="MET"
            fullWidth
            type="number"
            variant="standard"
            onChange={handleMetChange}
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
