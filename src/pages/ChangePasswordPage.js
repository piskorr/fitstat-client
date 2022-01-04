import React, { Component, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Container } from "@mui/material";
import Title from "../components/Title";
import Toolbar from "@mui/material/Toolbar";
import { Box } from "@mui/system";
import { TextField } from "@material-ui/core";
import DateTimePicker from "@mui/lab/DateTimePicker";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import Button from "@mui/material/Button";
import api from "../AxiosInstance";
import qs from "qs";
import axios from "axios";

export default function ChangePasswordPage() {
  const navigate = useNavigate();
  const [pass, setPass] = useState("");
  const [newPass, setNewPass] = useState("");

  const handleSubmit = async () => {
    api
      .post(
        `/users/profile`,
        qs.stringify({
          password: pass,
          new_password: newPass,
        }),
        {
          headers: {
            "content-type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        }
      )
      .then(function (response) {
        console.log(response);
        navigate("/")
      });
  };

  const handlePassChange = (event) => {
    setPass(event.target.value);
  };

  const handleNewPassChange = (event) => {
    setNewPass(event.target.value);
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
            <Title> Change your password</Title>
          </Toolbar>
          <TextField
            margin="normal"
            id="name-input"
            fullWidth
            type="password"
            label="Old password"
            variant="standard"
            onChange={handlePassChange}
          />
          <TextField
            margin="normal"
            id="value-input"
            label="New password"
            fullWidth
            type="password"
            variant="standard"
            onChange={handleNewPassChange}
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
              Confirm
            </Button>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}
