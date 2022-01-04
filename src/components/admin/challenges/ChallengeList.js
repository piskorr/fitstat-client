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
import ChallengeInfo from "./ChallengeInfo";

export default function ChallengesList({ challenges, callback }) {
  const [isInfoOpen, setInfoOpen] = React.useState(false);
  const [challenge, setChallenge] = React.useState();
  const [isLoading, setLoading] = React.useState(true);
  const handleInfoOpen = () => {
    setInfoOpen(!isInfoOpen);
    setLoading(true);
  };

  const handleDelete = async (event, id) => {
    console.log(id);
    await api.delete(`/challenges/${id}`).then((response) => {
      console.log(response);
      callback();
    });
  };

  const handleInfo = (event, id) => {
    console.log(id);
    handleInfoOpen();
    api.get(`/challenges/${id}`).then((response) => {
      setChallenge(response.data);
      setLoading(false);
      console.log(response);
    });
  };

  const ModalComponent = ({ isOpen, challenge, handleClick }) => {
    if (isLoading) {
      return <div></div>;
    }

    return (
      <React.Fragment>
        {isOpen && (
          <ChallengeInfo
            isOpen={isOpen}
            handleClick={handleClick}
            challenge={challenge}
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
              <TableCell align="left">Activity name</TableCell>
              <TableCell align="left">Time (hh:mm)</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {challenges.map((row) => (
              <TableRow
                hover
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">{row.activityName}</TableCell>
                <TableCell align="left">
                  {new Date(row.challengeTime * 1000)
                    .toISOString()
                    .substr(11, 5)}
                </TableCell>
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
        challenge={challenge}
        handleClick={handleInfoOpen}
      />
    </React.Fragment>
  );
}
