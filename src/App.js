// import Dashboard from "./components/layout/Dashboard";
// import { Route, Routes } from "react-router-dom";
// import ActivitiesPage from "./pages/ActivityEntriesPage";
// import RecordLogsPage from "./pages/RecordLogsPage";
// import { createTheme } from "@mui/material/styles";
// import { MuiThemeProvider } from "@material-ui/core/styles";
// import AdapterDateFns from "@mui/lab/AdapterDateFns";
// import LocalizationProvider from "@mui/lab/LocalizationProvider";
// import ChallangesPage from "./pages/ChallengesPage";
// import WeightLogPage from "./pages/WeightLogPage";
// import UsersPage from "./pages/UsersPage";
// import NewWeightPage from "pages/NewWeightPage";
// import NewEntryPage from "pages/NewWeightPage";

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: "#1976d2",
//     },
//     secondary: {
//       main: "#d9d9d9",
//     },
//   },
// });

// function App() {
//   return (
//     <div>
//       {/* <MuiThemeProvider theme={theme}> */}
//       <LocalizationProvider dateAdapter={AdapterDateFns}>
//         <Dashboard />
//         <div style={{ marginTop: 80 }}>
//           <Routes>
//             <Route exact path="/" element={<ActivitiesPage />} />
//             <Route exact path="/records" element={<RecordLogsPage />} />
//             <Route exact path="/challenges" element={<ChallangesPage />} />
//             <Route exact path="/weights" element={<WeightLogPage />} />
//             <Route exact path="/users" element={<UsersPage />} />
//             <Route exact path="/new-weight" element={<NewWeightPage />} />
//             <Route
//               exact
//               path="/new-activity-entry"
//               element={<NewEntryPage />}
//             />
//             <Route exact path="/new-activity" element={<NewWeightPage />} />
//           </Routes>
//         </div>
//       </LocalizationProvider>
//       {/* </MuiThemeProvider> */}
//     </div>
//   );
// }

// export default App;
