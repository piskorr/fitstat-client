import React, { useEffect, useState } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Modal,
  Paper,
  Toolbar,
  IconButton,
  Link,
  InputLabel,
  Grid,
  FormControl,
  Select,
  MenuItem,
  Container,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import api from "../../AxiosInstance";

const style = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  verticalAlign: "middle",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function AllRecordsList({ callback }) {
  const [isLoading, setIsLoading] = useState(true);
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [activities, setActivities] = useState([]);
  const [activity, setActivity] = React.useState("");
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    getAll();
  }, []);

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    callback();
  };

  const handleDelete = async (event, id) => {
    console.log(id);
    let res = await api.delete(`/records/${id}`);
    console.log(res);
    getAll();
    callback();
  };

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
    return <React.Fragment></React.Fragment>;
  }

  return (
    <React.Fragment>
      <Link color="primary" href="#" onClick={handleOpen} sx={{ mt: 3 }}>
        See full history
      </Link>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Container maxWidth="md" sx={{ mt: 12, mb: 5 }}>
          <Paper sx={style}>
            <Container>
              <Toolbar>
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
              </Toolbar>

              <TableContainer sx={{ maxHeight: 500 }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">Activity</TableCell>
                      <TableCell align="left">Date</TableCell>
                      <TableCell align="left">Type</TableCell>
                      <TableCell align="left">Value</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {records.map((row) => (
                      <TableRow
                        key={row.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="left">
                          {row.activityEntity.name}
                        </TableCell>
                        <TableCell align="left">{row.recordDate}</TableCell>
                        <TableCell align="left">{row.unit.unit}</TableCell>
                        <TableCell align="left">{row.value}</TableCell>
                        <TableCell>
                          <IconButton
                            onClick={(event) => handleDelete(event, row.id)}
                          >
                            <DeleteOutlineIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Container>
          </Paper>
        </Container>
      </Modal>
    </React.Fragment>
  );
}
