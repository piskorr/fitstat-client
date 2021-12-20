import React, { Component, useRef, useState } from "react";
import ActivitiesList from "../components/ActivitiesList";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Container } from "@mui/material";
import Title from "../components/Title";
import Toolbar from "@mui/material/Toolbar";
import NewActivityEntryForm from "../components/NewActivityEntryForm";
import { Box } from "@mui/system";
import { Link } from "@mui/material";
import BarChartComponent from "../components/Chart";
import FullActivityList from "../components/AllActivityList";
import api from "../AxiosInstance";

class ActivityPage extends Component {
  state = {
    entries: [],
    calories: [],
  };

  componentDidMount() {
    this.getTodaysActivities();
    this.getCalories();
  }

  getTodaysActivities = async () => {
    let data = await api.get(`/entries/today`).then(({ data }) => data);
    console.log(data);
    this.setState({ entries: data });
  };

  getCalories = async () => {
    let data = await api.get(`/entries/calories`).then(({ data }) => data);
    console.log(data);
    this.setState({ calories: data });
  };

  render() {
    return (
      <div>
        <Container maxWidth="md" sx={{ mt: 12 }}>
          <Paper elevation={5}>
            <Toolbar>
              <Title> Weekly Summary:</Title>
            </Toolbar>
            {BarChartComponent(this.state.calories)}
          </Paper>
        </Container>
        <Container maxWidth="md" sx={{ mt: 5 }}>
          <Grid item xs={12}>
            <Paper elevation={5}>
              <Toolbar>
                <Box display="flex" flexGrow={1}>
                  <Title> Today's activities: </Title>
                </Box>
                <NewActivityEntryForm />
              </Toolbar>
              {ActivitiesList(this.state.entries)}
              <Toolbar sx={{ mb: 3 }}>
                <FullActivityList />
              </Toolbar>
            </Paper>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default ActivityPage;
