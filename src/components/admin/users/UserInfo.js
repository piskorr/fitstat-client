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
import Link from "@material-ui/core/Link";

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
  width: "30%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  color: "primary",
};

const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#006faa",
    },
    secondary: {
      main: "#f50055",
    },
  },
});

export default function UserInfo({ isOpen, user, handleClick }) {
  return (
    <Modal
      open={isOpen}
      onClose={handleClick}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <MuiThemeProvider theme={theme}>
        <Paper sx={style}>
          <Box
            p={5}
            sx={{
              spacing: 2,
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
              label="Username"
              margin="normal"
              id="usrname-input"
              fullWidth
              variant="standard"
              defaultValue={user.username}
            />
            <TextField
              disabled
              label="Email"
              margin="normal"
              id="email-input"
              fullWidth
              variant="standard"
              defaultValue={user.email}
            />
            <TextField
              disabled
              label="Role"
              margin="normal"
              id="role-input"
              fullWidth
              variant="standard"
              defaultValue={user.role}
            />
            <TextField
              disabled
              label="First name"
              margin="normal"
              id="fname-input"
              fullWidth
              variant="standard"
              defaultValue={user.firstName}
            />
            <TextField
              disabled
              label="Last name"
              margin="normal"
              id="lname-input"
              fullWidth
              variant="standard"
              defaultValue={user.lastName}
            />
            <Grid item xs={12} sx={{ mb: 4 }}>
              <Link href="/change-password">Set ADMIN role</Link>
            </Grid>
          </Box>
        </Paper>
      </MuiThemeProvider>
    </Modal>
  );
}
