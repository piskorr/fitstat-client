import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function FirstCapitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function RecordAlbum({ records }) {
  const ValueComponent = ({ unit, value }) => {
    if (unit.id === 3) {
      return (
        <React.Fragment>
          <Typography>
            Time: {new Date(value * 1000).toISOString().substr(11, 8)}
          </Typography>
        </React.Fragment>
      );
    }
    if (unit.id === 2) {
      return (
        <React.Fragment>
          <Typography>Repetitions: {value} times</Typography>
        </React.Fragment>
      );
    }
    if (unit.id === 1) {
      return (
        <React.Fragment>
          <Typography>Distance: {value / 1000} km</Typography>
        </React.Fragment>
      );
    }
    return null;
  };

  return (
    <main>
      <Container sx={{ py: 8 }} maxWidth="md">
        <Grid container spacing={4}>
          {records.map((card) => (
            <Grid item key={card.id} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {FirstCapitalize(card.activityEntity.name)}
                  </Typography>
                  <Typography>Date: {card.recordDate}</Typography>
                  <ValueComponent unit={card.unit} value={card.value} />
                </CardContent>
                <CardActions>
                  <Button size="small">Delete</Button>
                  <Button size="small">Edit</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </main>
  );
}
