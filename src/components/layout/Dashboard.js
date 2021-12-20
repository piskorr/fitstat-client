import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import DirectionsRunSharpIcon from "@mui/icons-material/DirectionsRunSharp";
import EmojiEventsSharpIcon from "@mui/icons-material/EmojiEventsSharp";
import AssignmentSharpIcon from "@mui/icons-material/AssignmentSharp";
import AddchartSharpIcon from "@mui/icons-material/AddchartSharp";
import ListItemLink from "../ListItemLink";
import Logo from "../../resources/logo.png";
import Profile from "../Profile";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  // color: `#1976d2`,
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

function DashboardContent() {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" open={open} color="primary">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>

            <Box
              component="img"
              sx={{
                height: 48,
              }}
              alt="logo."
              src={Logo}
            />
            <Typography sx={{ flexGrow: 1 }} />
            <Profile />

          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          anchor="left"
          onBackdropClick={handleDrawerClose}
          open={open}
        >
          <DrawerHeader>
            <Typography variant="h6" noWrap component="div"></Typography>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon fontSize="large" />
            </IconButton>
          </DrawerHeader>

          <List>
            <ListItemLink
              to="/"
              primary="Activities"
              icon={<DirectionsRunSharpIcon />}
            />
            <ListItemLink
              to="/challenges"
              primary="Challenges"
              icon={<EmojiEventsSharpIcon />}
            />
            <ListItemLink
              to="/records"
              primary="Records"
              icon={<AssignmentSharpIcon />}
            />
            <ListItemLink
              to="/weights"
              primary="Weight Log"
              icon={<AddchartSharpIcon />}
            />
          </List>
        </Drawer>
      </Box>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
