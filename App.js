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
      refreshToken: "",
    };
  }

  auth_success(token) {
    this.setState({ isAuthenticated: true, refreshToken: token });
  }
  disconnect() {
    this.setState({ isAuthenticated: false });
  }

  _home() {
    if (!this.state.isAuthenticated) {
      return (
        <Login
          auth={this.auth_success.bind(this)}
          token={this.state.refreshToken}
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
