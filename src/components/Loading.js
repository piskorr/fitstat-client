import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";

export default function Loading() {
  return (
    <React.Fragment>
      <Grid
        container
        spacing={0}
        direction="row"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
        
      >
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Loading..
        </Typography>
        <CircularProgress size={"40px"} />
      </Grid>
    </React.Fragment>
  );
}
