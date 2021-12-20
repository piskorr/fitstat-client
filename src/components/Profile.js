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
import { Box } from "@mui/system";

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

const Profile = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <React.Fragment>
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
                    id="filled-helperText"
                    label="Email"
                    defaultValue={user.email}
                    variant="filled"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    disabled
                    id="filled-helperText"
                    label="Login"
                    defaultValue={user.login}
                    variant="filled"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    id="filled-helperText"
                    label="First Name"
                    defaultValue={user.fname}
                    variant="filled"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="filled-helperText"
                    label="Last Name"
                    defaultValue={user.lname}
                    variant="filled"
                  />
                </Grid>
                <Grid item xs={12} sx={{ mb: 4 }}>
                  <TextField
                    id="filled-helperText"
                    label="Weight"
                    defaultValue={user.weight}
                    variant="filled"
                  />
                </Grid>
              </Grid>
            </Paper>
            <Grid
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
              >
                Update profile
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Modal>
    </React.Fragment>
  );
};

export default Profile;
