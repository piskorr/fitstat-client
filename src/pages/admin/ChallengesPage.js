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
import ChallengesList from "components/admin/challenges/ChallengeList";

export default function ChallengesPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    getAll();
  }, []);

  const getAll = () => {
    api.get(`/challenges/all`).then((response) => {
      setIsLoading(false);
      setChallenges(response.data);
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
                <Title> Challenges: </Title>
              </Box>
              <Tooltip title="Add new challenge">
                <IconButton
                  component={Link}
                  to="/admin/new-challenge"
                  color="primary"
                  edge="end"
                  aria-label="add"
                  size="large"
                >
                  <AddCircleOutlineOutlinedIcon fontSize="large" />
                </IconButton>
              </Tooltip>
            </Toolbar>
            <ChallengesList challenges={challenges} callback={getAll} />
          </Paper>
        </Grid>
      </Container>
    </React.Fragment>
  );
}
