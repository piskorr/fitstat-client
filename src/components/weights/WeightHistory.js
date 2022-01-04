import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import api from "../../AxiosInstance";
import { IconButton } from "@mui/material";

function WeightHistory(props, callback) {
  const handleDelete = async (event, id) => {
    console.log(id);
    let res = await api.delete(`/users/weight/${id}`);
    console.log(res);
    callback();
  };

  return (
    <TableContainer sx={{ maxHeight: 500 }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Date</TableCell>
            <TableCell align="left">Weight (kg)</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="left">
                {" "}
                {new Date(row.date).toDateString()}
              </TableCell>
              <TableCell align="left">{row.weight}</TableCell>
              <TableCell align="right">
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

export default WeightHistory;
