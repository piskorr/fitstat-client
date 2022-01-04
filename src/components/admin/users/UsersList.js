import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import InfoIcon from "@mui/icons-material/Info";
import { IconButton, Tooltip } from "@mui/material";
import api from "../../../AxiosInstance";
import UserInfo from "./UserInfo";

export default function UsersList({ users, callback }) {
  const [isInfoOpen, setInfoOpen] = React.useState(false);
  const [user, setUser] = React.useState();
  const [isLoading, setLoading] = React.useState(true);
  const handleInfoOpen = () => {
    setInfoOpen(!isInfoOpen);
    setLoading(true);
  };

  const handleDelete = async (event, id) => {
    console.log(id);
    // let res = await api.delete(`/entries/${id}`);
    // console.log(res);
  };

  const handleInfo = async (event, id) => {
    console.log(id);
    handleInfoOpen();
    api.get(`/users/${id}`).then((response) => {
      setUser(response.data);
      setLoading(false);
      console.log(response);
    });
  };

  const ModalComponent = ({ isOpen, user, handleClick }) => {
    if (isLoading) {
      return <div></div>;
    }

    return (
      <React.Fragment>
        {isOpen && (
          <UserInfo isOpen={isOpen} handleClick={handleClick} user={user} />
        )}
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Username</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((row) => (
              <TableRow
                hover
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">{row.username}</TableCell>
                <TableCell align="left">{row.email}</TableCell>
                <TableCell align="right">
                  <Tooltip title="Delete">
                    <IconButton
                      onClick={(event) => handleDelete(event, row.id)}
                    >
                      <DoDisturbIcon />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Info">
                    <IconButton onClick={(event) => handleInfo(event, row.id)}>
                      <InfoIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ModalComponent
        isOpen={isInfoOpen}
        user={user}
        handleClick={handleInfoOpen}
      />
    </React.Fragment>
  );
}
