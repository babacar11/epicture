import React from "react";
import { Provider } from "react-redux";
import Store from "./Store/configureStore";
import Navigation from "./Navigation/Navigation";
import Login from "./Components/Login";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      token: "",
    };
  }

  auth_success() {
    this.setState({ isAuthenticated: true });
  }
  disconnect() {
    this.setState({ isAuthenticated: false });
  }

  _home() {
    if (!this.state.isAuthenticated) {
      return (
        <Login
          auth={this.auth_success.bind(this)}
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
