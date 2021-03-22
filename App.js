import React from "react";
import { Provider } from "react-redux";
import Store from "./Store/configureStore";
import Navigation from "./Navigation/Navigation";
import Login from "./Components/Login";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: true,
      token: "",
    };
  }

  _home() {
    if (!this.state.isAuthenticated) {
      return (
        <Login
          token={this.state.token}
          isAauthenticated={this.state.isAuthenticated}
        />
      );
    } else {
      return <Navigation />;
    }
  }

  render() {
    return <Provider store={Store}>{this._home()}</Provider>;
  }
}
