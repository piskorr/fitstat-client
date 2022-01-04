import React, { Component } from "react";
import { Navigate } from "react-router";
import Keycloak from "keycloak-js";
import Dashboard from "./components/layout/Dashboard";
import { Route, Routes } from "react-router-dom";
import ActivityEntriesPage from "./pages/activity_entries/ActivityEntriesPage";
import RecordLogsPage from "./pages/records/RecordLogsPage";
import { createTheme } from "@mui/material/styles";
import { MuiThemeProvider } from "@material-ui/core/styles";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import UsersChallengesPage from "./pages/users_challanges/UsersChallengesPage";
import WeightLogPage from "./pages/weights/WeightLogPage";
import UsersPage from "./pages/admin/UsersPage";
import NewWeightPage from "pages/weights/NewWeightPage";
import NewEntryPage from "pages/activity_entries/NewEntryPage";
import ActivitiesPage from "pages/admin/ActivitiesPage";
import NewActivityPage from "pages/admin/NewActivityPage";
import ChangePasswordPage from "pages/ChangePasswordPage";
import ChallengesPage from "pages/admin/ChallengesPage";
import NewChallengePage from "pages/admin/NewChallengePage";
import NewRecordPage from "pages/records/NewRecordPage";
import { UserContextProvider } from "./store/user-context";
import api from "AxiosInstance";

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

class AdminRoute extends Component {
  render() {
    const { component: Component, ...props } = this.props;

    return (
      <React.Fragment>
        <Route
          {...props}
          render={(props) =>
            this.state.isAdmin ? (
              <Component {...props} />
            ) : (
              <Navigate to="/404" />
            )
          }
        />
      </React.Fragment>
    );
  }
}

class Secured extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keycloak: null,
      authenticated: false,
      isAdmin: false,
    };
  }

  componentDidMount() {
    const keycloak = Keycloak("/keycloak.json");
    keycloak.init({ onLoad: "login-required" }).then((authenticated) => {
      this.setState({ keycloak: keycloak, authenticated: authenticated });
      if (authenticated) {
        // @ts-ignore
        window.accessToken = keycloak.token;
        // @ts-ignore
        window.refreshToken = keycloak.refreshToken;
        console.log(keycloak.token);
        this.getUser();
      }
    });
  }

  getUser() {
    api.get("/users/profile").then((response) => {
      if (response.data.role === "ADMIN") {
        this.setState({ isAdmin: true });
        console.log("ADMIN TRUE");
      }
    });
  }

  render() {
    if (this.state.keycloak) {
      if (this.state.authenticated) {
        return (
          <div>
            <UserContextProvider>
              {/* <MuiThemeProvider theme={theme}> */}
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Dashboard keycloak={this.state.keycloak} />
                <div style={{ marginTop: 80 }}>
                  <Routes>
                    <Route path="/" element={<ActivityEntriesPage />} />
                    <Route
                      path="/new-activity-entry"
                      element={<NewEntryPage />}
                    />
                    <Route path="/records" element={<RecordLogsPage />} />
                    <Route path="/new-record" element={<NewRecordPage />} />
                    <Route
                      path="/challenges"
                      element={<UsersChallengesPage />}
                    />
                    <Route path="/weights" element={<WeightLogPage />} />
                    <Route path="/new-weight" element={<NewWeightPage />} />
                    <Route
                      path="/change-password"
                      element={<ChangePasswordPage />}
                    />
                    //--------------ADMIN--------------//
                    {this.state.isAdmin && (
                      <React.Fragment>
                        <Route path="/admin/users" element={<UsersPage />} />
                        <Route
                          path="/admin/activities"
                          element={<ActivitiesPage />}
                        />
                        <Route
                          path="/admin/new-activity"
                          element={<NewActivityPage />}
                        />
                        <Route
                          path="/admin/challenges"
                          element={<ChallengesPage />}
                        />
                        <Route
                          path="/admin/new-challenge"
                          element={<NewChallengePage />}
                        />
                      </React.Fragment>
                    )}
                  </Routes>
                </div>
              </LocalizationProvider>
              {/* </MuiThemeProvider> */}
            </UserContextProvider>
          </div>
        );
      } else return <div>Uable to authenticate</div>;
    }
    return (
      <div>
        <React.Fragment></React.Fragment>
        {console.log("Connecting to authorization server...")}
      </div>
    );
  }
}
export default Secured;
