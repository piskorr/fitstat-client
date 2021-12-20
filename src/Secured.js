import React, { Component } from "react";
import Keycloak from "keycloak-js";
import App from "./App";

class Secured extends Component {
  constructor(props) {
    super(props);
    this.state = { keycloak: null, authenticated: false };
  }

  componentDidMount() {
    const keycloak = Keycloak("/keycloak.json");
    keycloak.init({ onLoad: "login-required" }).then((authenticated) => {
      this.setState({ keycloak: keycloak, authenticated: authenticated });
      if (authenticated) {
        window.accessToken = keycloak.token;
        window.refreshToken = keycloak.refreshToken;
        console.log(keycloak.token);
      }
    });
  }

  render() {
    if (this.state.keycloak) {
      if (this.state.authenticated) return <App />;
      else return <div>Uable to authenticate</div>;
    }
    return <div>{console.log("Connecting to authorization server...")}</div>;
  }
}
export default Secured;
