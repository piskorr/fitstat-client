import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
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
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DirectionsRunSharpIcon from "@mui/icons-material/DirectionsRunSharp";
import EmojiEventsSharpIcon from "@mui/icons-material/EmojiEventsSharp";
import AssignmentSharpIcon from "@mui/icons-material/AssignmentSharp";
import AddchartSharpIcon from "@mui/icons-material/AddchartSharp";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
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

export default function PersistentDrawerLeft() {
  const theme = useTheme();
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
      <AppBar position="fixed" open={open}>
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

          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            FITSTAT
          </Typography>

          <IconButton color="inherit">
            <AccountCircleIcon fontSize="large" />
          </IconButton>

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
        open={open}
      >
        <DrawerHeader>
          <Typography variant="h6" noWrap component="div"></Typography>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon fontSize="large" />
          </IconButton>
        </DrawerHeader>

        <List>
          <ListItem button key="Activities">
            <ListItemIcon>
              <DirectionsRunSharpIcon />
            </ListItemIcon>
            <ListItemText primary="Ativities" />
          </ListItem>
          <ListItem button key="Challenges">
            <ListItemIcon>
              <EmojiEventsSharpIcon />
            </ListItemIcon>
            <ListItemText primary="Challenges" />
          </ListItem>
          <ListItem button key="Records">
            <ListItemIcon>
              <AssignmentSharpIcon />
            </ListItemIcon>
            <ListItemText primary="Records" />
          </ListItem>
          <ListItem button key="Weight">
            <ListItemIcon>
              <AddchartSharpIcon />
            </ListItemIcon>
            <ListItemText primary="Weight Log" />
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}
