import Dashboard from "./components/layout/Dashboard";
import { Route, Routes } from "react-router-dom";
import ActivitiesPage from "./pages/ActivitiesPage";
import RecordLogsPage from "./pages/RecordLogsPage";
import { createTheme } from "@mui/material/styles";
import { MuiThemeProvider } from "@material-ui/core/styles";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import ChallangesPage from "./pages/ChallengesPage";
import WeightLogPage from "./pages/WeightLogPage";

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

function App() {
  return (
    <div>
      {/* <MuiThemeProvider theme={theme}> */}
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Dashboard />
        <div style={{ marginTop: 80 }}>
          <Routes>
            <Route exact path="/" element={<ActivitiesPage />} />
            <Route exact path="/records" element={<RecordLogsPage />} />
            <Route exact path="/challenges" element={<ChallangesPage />} />
            <Route exact path="/weights" element={<WeightLogPage />} />
          </Routes>
        </div>
      </LocalizationProvider>
      {/* </MuiThemeProvider> */}
    </div>
  );
}

export default App;
