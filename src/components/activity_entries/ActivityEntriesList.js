import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { IconButton } from "@mui/material";
import api from "../../AxiosInstance";

function FirstCapitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function ActivitiesList({activities, callback}) {

  const handleDelete = async (event, id) =>{
      console.log(id);
       await api.delete(`/entries/${id}`).then((response) => {
        console.log(response);
      });      
      callback();
  }

  return (
    <TableContainer sx={{ maxHeight: 500 }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Activity</TableCell>
            <TableCell align="left">Time</TableCell>
            <TableCell align="left">Duration</TableCell>
            <TableCell align="left">Calories Burned</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {activities.map((row) => (
            <TableRow
              hover
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="left">
                {FirstCapitalize(row.activityName)}
              </TableCell>
              <TableCell align="left">
                {new Date(row.activityDate).toLocaleTimeString()}
              </TableCell>
              <TableCell align="left">
                {new Date(row.activityDuration * 1000)
                  .toISOString()
                  .substr(11, 8)}
              </TableCell>
              <TableCell align="left">{row.caloriesBurned}</TableCell>
              <TableCell>
                <IconButton onClick={(event) => handleDelete(event, row.id)}>
                  <DeleteOutlineIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ActivitiesList;
