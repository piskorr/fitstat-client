import * as React from "react";
import { Modal, Toolbar, Typography } from "@mui/material";
import { Paper } from "@mui/material";
import { Tooltip } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { TextField } from "@mui/material";
import Grid from "@mui/material/Grid";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import Button from "@mui/material/Button";
import Link from "@material-ui/core/Link";
import { borderColor, Box } from "@mui/system";
import { createTheme } from "@mui/material/styles";
import { MuiThemeProvider } from "@material-ui/core/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#d9d9d9",
    },
  },
});

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
};

function createUser(login, email, fname, lname, weight) {
  return { login, email, fname, lname, weight };
}

const user = createUser("userx1", "userx1@mail.com", "John", "Doe", 90.5);

const Profile = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <React.Fragment>
      <MuiThemeProvider theme={theme}>
        <Tooltip title="Your Profile">
          <IconButton
            edge="end"
            aria-label="add"
            size="large"
            onClick={handleOpen}
          >
            <AccountCircleIcon fontSize="large" style={{ fill: "#ffffff" }} />
          </IconButton>
        </Tooltip>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Paper sx={style}>
            <Grid>
              <Paper sx={{ mb: 5 }}>
                <Toolbar sx={{ justifyContent: "center" }}>
                  <Typography
                    component="h1"
                    variant="16"
                    color="primary"
                    gutterBottom
                  >
                    Your profile
                  </Typography>
                </Toolbar>
              </Paper>
              <Paper>
                <Grid
                  container
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="flex-start"
                  spacing={{ xs: 2, md: 3 }}
                >
                  <Grid item xs={12}>
                    <TextField
                      disabled
                      id="profmail"
                      label="Email"
                      defaultValue={props.email}
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      disabled
                      id="proflogin"
                      label="Login"
                      defaultValue={props.username}
                      variant="standard"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      disabled
                      id="proffname"
                      label="First Name"
                      defaultValue={props.firstName}
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12} sx={{ mb: 4 }}>
                    <TextField
                      disabled
                      id="proflname"
                      label="Last Name"
                      defaultValue={props.lastName}
                      variant="standard"
                    />
                  </Grid>
                  <Grid item xs={12} sx={{ mb: 4 }}>
                    <Link href="/change-password">Change password</Link>
                  </Grid>
                </Grid>
              </Paper>
              {/* <Grid
                sx={{ mt: 3 }}
                container
                direction="row"
                justifyContent="flex-end"
                alignItems="flex-end"
              >
                <Button
                  variant="contained"
                  onClick={handleClose}
                  endIcon={<CheckCircleRoundedIcon />}
                ></Button>
              </Grid> */}
            </Grid>
          </Paper>
        </Modal>
      </MuiThemeProvider>
    </React.Fragment>
  );
};

export default Profile;
