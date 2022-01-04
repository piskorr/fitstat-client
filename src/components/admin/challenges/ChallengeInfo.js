import React from "react";
import {
  AppBar,
  Container,
  Grid,
  Modal,
  Toolbar,
  Typography,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { Box, TextField } from "@material-ui/core";
import { Paper } from "@mui/material";
import { Tooltip } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import DateTimePicker from "@mui/lab/DateTimePicker";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Title from "../../Title";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import Button from "@mui/material/Button";

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
  width: "20%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  color: "primary",
};

export default function ChallengeInfo({ isOpen, challenge, handleClick }) {
  return (
    <Modal
      open={isOpen}
      onClose={handleClick}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Paper style={style}>
        <Box
          p={5}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Toolbar>
            <Title> Details</Title>
          </Toolbar>
          <TextField
            disabled
            label="Name"
            margin="normal"
            id="name-input"
            fullWidth
            variant="standard"
            defaultValue={challenge.activityName}
          />
          <TextField
            disabled
            label="Description"
            margin="normal"
            id="name-input"
            fullWidth
            variant="standard"
            multiline
            rows={4}
            defaultValue={challenge.description}
          />
          <TextField
            disabled
            label="Time"
            margin="normal"
            id="value-input"
            fullWidth
            variant="standard"
            defaultValue={new Date(challenge.challengeTime * 1000)
              .toISOString()
              .substr(11, 8)}
          />
        </Box>
      </Paper>
    </Modal>
  );
}
