import ActivitiesList from "./ActivitiesList";
import PersistentDrawerLeft from "./Drawer_old";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

function Dashboard() {
  return (
    <Container maxWidth="lg" sx={{ mt: 12, mb: 40 }}>
      <PersistentDrawerLeft />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <ActivitiesList />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard;
