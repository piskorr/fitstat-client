import React, { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import UsersList from "../../components/admin/users/UsersList";
import api from "../../AxiosInstance";
import {
  Box,
  Container,
  Grid,
  IconButton,
  Paper,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import ActivitiesList from "../../components/admin/activities/ActivitiesList";
import { Link } from "react-router-dom";
import Title from "components/Title";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

export default function ActivitesPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    api.get(`/activities/all`).then((response) => {
      setIsLoading(false);
      setActivities(response.data);
    });
  }, []);

  const reload = () => {
    api.get(`/activities/all`).then((response) => {
      setActivities(response.data);
    });
  };

  if (isLoading) {
    return Loading();
  }

  return (
    <React.Fragment>
      <Container maxWidth="md" sx={{ mt: 5 }}>
        <Grid item xs={12}>
          <Paper elevation={5} sx={{ mb: 5 }}>
            <Toolbar>
              <Box display="flex" flexGrow={1}>
                <Title> Activities: </Title>
              </Box>
              <Tooltip title="Add new activity">
                <IconButton
                  component={Link}
                  to="/admin/new-activity"
                  color="primary"
                  edge="end"
                  aria-label="add"
                  size="large"
                >
                  <AddCircleOutlineOutlinedIcon fontSize="large" />
                </IconButton>
              </Tooltip>
            </Toolbar>
            <ActivitiesList activities={activities} callback={reload} />
          </Paper>
        </Grid>
      </Container>
    </React.Fragment>
  );
}
