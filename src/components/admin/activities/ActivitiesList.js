import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import InfoIcon from "@mui/icons-material/Info";
import { IconButton, Tooltip } from "@mui/material";
import api from "../../../AxiosInstance";
import ActivityInfo from "./ActivityInfo";

export default function ActivitiesList({ activities, callback }) {
  const [isInfoOpen, setInfoOpen] = React.useState(false);
  const [activity, setActivity] = React.useState();
  const [isLoading, setLoading] = React.useState(true);
  const handleInfoOpen = () => {
    setInfoOpen(!isInfoOpen);
    setLoading(true);
  };

  const handleDelete = async (event, id) => {
    console.log(id);
    let res = await api.delete(`/activities/${id}`);
    console.log(res);
    callback();
  };

  const handleInfo = (event, id) => {
    console.log(id);
    handleInfoOpen();
    api.get(`/activities/${id}`).then((response) => {
      setActivity(response.data);
      setLoading(false);
      console.log(activity);
    });
  };

  const ModalComponent = ({ isOpen, activity, handleClick }) => {
    if (isLoading) {
      return <div></div>;
    }

    return (
      <React.Fragment>
        {isOpen && (
          <ActivityInfo
            isOpen={isOpen}
            handleClick={handleClick}
            activity={activity}
          />
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
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">MET</TableCell>
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
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="left">{row.met}</TableCell>
                <TableCell align="right">
                  <Tooltip title="Delete">
                    <IconButton
                      onClick={(event) => handleDelete(event, row.id)}
                    >
                      <DeleteOutlineIcon />
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
        activity={activity}
        handleClick={handleInfoOpen}
      />
    </React.Fragment>
  );
}
