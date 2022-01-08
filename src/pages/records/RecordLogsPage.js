import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {
  Button,
  Container,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Tooltip,
} from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import api from "../../AxiosInstance";
import RecordsAlbum from "../../components/records/RecordsAlbum";
import { Typography } from "@mui/material";
import Loading from "components/Loading";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import AllRecordsList from "components/records/AllRecordsList";

export default function RecordLogPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [activities, setActivities] = useState([]);
  const [activity, setActivity] = React.useState("");

  const handleActivityChange = (event) => {
    setActivity(event.target.value);
    if (event.target.value !== "") {
      var filtered = records.filter(function (record) {
        return record.activityEntity.id === event.target.value;
      });
      setFilteredRecords(filtered);
    } else {
      setFilteredRecords(records);
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  const getAll = () => {
    getActivities();
    getRecords();
  };

  const getActivities = () => {
    api.get("/activities/all").then((response) => {
      setActivities(response.data);
      console.log(response);
    });
  };

  const getRecords = () => {
    api.get("/records/current").then((response) => {
      setRecords(response.data);
      setFilteredRecords(response.data);
      setIsLoading(false);
      console.log(response);
    });
  };

  if (isLoading) {
    return Loading();
  }

  return (
    <React.Fragment>
      <Container maxWidth="md" sx={{ mt: 12, mb: 5 }}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Records
        </Typography>
        <Paper elevation={5}>
          <Toolbar>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <FormControl variant="standard" style={{ minWidth: 230 }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Activity
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={activity}
                  onChange={handleActivityChange}
                  color="primary"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {activities.map((row) => (
                    <MenuItem key={row.id} value={row.id}>
                      {row.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Tooltip title="Add new record">
                <IconButton
                  sx={{ mr: 1 }}
                  component={Link}
                  to="/new-record"
                  color="primary"
                  edge="end"
                  aria-label="add"
                  size="large"
                >
                  <AddCircleOutlineOutlinedIcon fontSize="large" />
                </IconButton>
              </Tooltip>
            </Grid>
          </Toolbar>
          <RecordsAlbum records={filteredRecords} />
          <Toolbar sx={{ mb: 3 }}>
              <AllRecordsList callback={getAll} />
            </Toolbar>
        </Paper>
      </Container>
    </React.Fragment>
  );
}
