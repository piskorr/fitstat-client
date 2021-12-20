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
  Tooltip,
  IconButton,
  Link,
} from "@mui/material";

import api from "../AxiosInstance";

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

function FirstCapitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function FullActivityList() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    api.get("/entries").then((response) => {
      setActivities(response.data);
    });
  }, []);

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
        <Paper sx={style}>
          <TableContainer sx={{ maxHeight: 500 }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Activity</TableCell>
                  <TableCell align="left">Date</TableCell>
                  <TableCell align="left">Duration</TableCell>
                  <TableCell align="left">Calories Burned</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {activities.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left">
                      {FirstCapitalize(row.activityName)}
                    </TableCell>
                    <TableCell align="left">
                      {new Date(row.activityDate).toUTCString()}
                    </TableCell>
                    <TableCell align="left">
                      {new Date(row.activityDuration * 1000)
                        .toISOString()
                        .substr(11, 8)}
                    </TableCell>
                    <TableCell align="left">{row.caloriesBurned}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Modal>
    </React.Fragment>
  );
}

