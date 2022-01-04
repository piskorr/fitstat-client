import React, { useEffect, useState } from "react";
import { Container, Paper } from "@mui/material";
import { Typography } from "@mui/material";
import ChallangeList from "../../components/users_challenges/UsersChallangesList";
import Loading from "components/Loading";
import api from "../../AxiosInstance";

export default function UsersChallengesPage() {
  const [isLoading, setLoading] = useState(true);
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    api.get(`/users/challenges`).then((response) => {
      setLoading(false);
      setChallenges(response.data);
    });
  }, []);

  if (isLoading) {
    return Loading();
  }

  return (
    <div>
      <Container maxWidth="md" sx={{ mt: 12 }}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Challanges:
        </Typography>
        <Paper elevation={5}>
          <ChallangeList challenges={challenges} />
        </Paper>
      </Container>
    </div>
  );
}
