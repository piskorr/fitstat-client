import React, { Component, useEffect, useState } from "react";
import {
  Container,
  Paper,
  Grid,
  Toolbar,
  Box,
  IconButton,
} from "@mui/material";
import WeightChart from "../../components/weights/WeightChart";
import WeightHistory from "../../components/weights/WeightHistory";
import Title from "../../components/Title";
import Loading from "components/Loading";
import { Typography, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import api from "../../AxiosInstance";

export default function WeightLogPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [weights, setWeights] = useState([]);

  useEffect(() => {
    getAll();
  }, []);

  const getAll = () => {
    api.get(`/users/weight`).then((response) => {
      setIsLoading(false);
      setWeights(response.data);
      console.log("WEIGHTS!");
      console.log(weights);
    });
  };

  if (isLoading) {
    return Loading();
  }

  return (
    <React.Fragment>
      <Container maxWidth="md" sx={{ mt: 12 }}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Weight Log
        </Typography>
        {weights.length > 0 && (
          <Paper elevation={5}>{WeightChart(weights)}</Paper>
        )}
      </Container>
      <Container maxWidth="md" sx={{ mt: 5 }}>
        <Grid item xs={12}>
          <Paper elevation={5} sx={{ mb: 5 }}>
            <Toolbar>
              <Box display="flex" flexGrow={1}>
                <Title> Weight Log: </Title>
              </Box>
              <Tooltip title="Add weight entry">
                <IconButton
                  component={Link}
                  to="/new-weight"
                  color="primary"
                  edge="end"
                  aria-label="add"
                  size="large"
                >
                  <AddCircleOutlineOutlinedIcon fontSize="large" />
                </IconButton>
              </Tooltip>
            </Toolbar>
            {WeightHistory(weights, getAll)}
          </Paper>
        </Grid>
      </Container>
    </React.Fragment>
  );
}
