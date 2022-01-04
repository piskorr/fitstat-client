import React, { Component, useRef, useState, useEffect } from "react";
import ActivitiesList from "../../components/activity_entries/ActivityEntriesList";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Container, IconButton, Tooltip } from "@mui/material";
import Title from "../../components/Title";
import Toolbar from "@mui/material/Toolbar";
import NewActivityEntryForm from "../../components/activity_entries/NewActivityEntryForm";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import BarChartComponent from "../../components/activity_entries/Chart";
import FullActivityList from "../../components/activity_entries/AllActivityEntriesList";
import Loading from "components/Loading";
import api from "../../AxiosInstance";

export default function ActivityEntriesPage() {
  const [isEntriesLoading, setIsEntriesLoading] = useState(true);
  const [isCaloriesLoading, setIsCaloriesLoading] = useState(true);
  const [entries, setEntries] = useState([]);
  const [calories, setCalories] = useState([]);

  useEffect(() => {
    getAll();
  }, []);

  const getAll = () =>{
    getTodaysActivities();
    getCalories();
  }

  const getTodaysActivities = () => {
    api.get(`/entries/today`).then((response) => {
      setEntries(response.data);
      setIsEntriesLoading(false);
    });
  };

  const getCalories = () => {
    api.get(`/entries/calories`).then((response) => {
      setCalories(response.data);
      setIsCaloriesLoading(false);
    });
  };

  if (isEntriesLoading || isCaloriesLoading) {
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
          Your Activities
        </Typography>
        <Paper elevation={5}>
          <Toolbar>
            <Title> Weekly summary:</Title>
          </Toolbar>
          {BarChartComponent(calories)}
        </Paper>
      </Container>
      <Container maxWidth="md" sx={{ mt: 5 }}>
        <Grid item xs={12}>
          <Paper elevation={5}>
            <Toolbar>
              <Box display="flex" flexGrow={1}>
                <Title> Today's activities: </Title>
              </Box>
              <Tooltip title="Add activity entry">
                <IconButton
                  component={Link}
                  to="/new-activity-entry"
                  color="primary"
                  edge="end"
                  aria-label="add"
                  size="large"
                >
                  <AddCircleOutlineOutlinedIcon fontSize="large" />
                </IconButton>
              </Tooltip>
            </Toolbar>
            <ActivitiesList activities={entries} callback={getAll}/>
            <Toolbar sx={{ mb: 3 }}>
              <FullActivityList callback={getAll} />
            </Toolbar>
          </Paper>
        </Grid>
      </Container>
    </React.Fragment>
  );
}
