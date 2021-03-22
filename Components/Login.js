import React from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
} from "react-native";
import { WebView } from "react-native-webview";
import { CLIENT_ID } from "../API/config";
import Navigation from "../Navigation/Navigation";
import { Provider } from "react-redux";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showWelcomingScreen: true,
    };
  }
  _showData() {
    return (
      <WebView
        source={{
          uri:
            "https://api.imgur.com/oauth2/authorize?client_id=" +
            CLIENT_ID +
            "&response_type=token",
        }}
        // onError={ (err)=>{
        //     this.webView.reload();
        // } }
        // ref={ref => { this.webView = ref; }}
        originWhitelist={["https://*"]}
        onNavigationStateChange={this.handleWebViewNavigationStateChange}
      />
    );
  }

  handleWebViewNavigationStateChange(navstate) {
    console.log(navstate);
  }

  _loginBtnHandler() {}

  _welcomingScreen() {
    if (this.state.showWelcomingScreen) {
      var sourceImage = require("../Images/welcome.jpg");

      return (
        <SafeAreaView>
          <Image style={styles.img} source={sourceImage} />
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={this._loginBtnHandler}
          >
            <Text style={styles.loginTxt}>Log in</Text>
          </TouchableOpacity>
        </SafeAreaView>
      );
    } else {
      return this._showData();
    }
  }

  componentDidMount() {}

  render() {
    return (
      <SafeAreaView style={styles.main_container}>
        <StatusBar />
        {this._welcomingScreen()}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  img: {
    width: "100%",
  },
  loginBtn: {
    backgroundColor: "#292B5F",
    color: "#fff",
    height: "5%",
  },
  loginTxt: {
    color: "#fff",
    textAlign: "center",
  },
});

export default Login;
