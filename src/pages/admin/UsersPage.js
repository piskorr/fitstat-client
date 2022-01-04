import React, { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import UsersList from "../../components/admin/users/UsersList";
import api from "../../AxiosInstance";
import { Container, Grid, Paper, Typography } from "@mui/material";

export default function UsersPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get(`/users/all`).then((response) => {
      setIsLoading(false);
      setUsers(response.data);
      console.log("USERS!");
      console.log(users);
    });
  }, []);

  if (isLoading) {
    return Loading();
  }

  return (
    <React.Fragment>
      <Container maxWidth="md" sx={{ mt: 5 }}>
        <Grid item xs={12}>
          <Paper elevation={5}>
            <UsersList users={users} callback={null} />
          </Paper>
        </Grid>
      </Container>
    </React.Fragment>
  );
}
