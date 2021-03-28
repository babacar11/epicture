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
        // onError={(err) => {
        //   console.log(err);
        // }}
        // ref={ref => { this.webView = ref; }}
        originWhitelist={["https://*"]}
        onNavigationStateChange={this.handleWebViewNavigationStateChange}
        cacheEnabled={false}
        cacheMode={"LOAD_NO_CACHE"}
        thirdPartyCookiesEnabled={false}
        sharedCookiesEnabled={false}
        onRenderProcessGone={(web) => {
          console.log("Process Gone", web);
        }}
      />
    );
  }

  _formatToken(url) {}
  handleWebViewNavigationStateChange = (navstate) => {
    let { url } = navstate;
    console.log(navstate);
    if (navstate.url.includes("refresh_token")) {
      const arr = url.split("&");

      this.props.auth();
      console.log(navstate.url);
    }
  };

  _loginBtnHandler() {
    this.setState({ showWelcomingScreen: false });
  }

  _welcomingScreen() {
    if (this.state.showWelcomingScreen) {
      var sourceImage = require("../Images/welcome.jpg");

      return (
        <View style={styles.content}>
          <Image style={styles.img} source={sourceImage} />
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={this._loginBtnHandler.bind(this)}
          >
            <Text style={styles.loginTxt}>Log in</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return this._showData();
    }
  }

  componentDidMount() {
    const clearAppData = async function () {
      // try {
      //   const keys = await AsyncStorage.getAllKeys();
      //   await AsyncStorage.multiRemove(keys);
      // } catch (error) {
      //   console.error("Error clearing app data.");
      // }
      // CookieManager.clearAll(true).then((res) => {
      //   console.log("LoginScreen CookieManager.clearAll =>", res);
      // });
    };
  }

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
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: "100%",
  },
  loginBtn: {
    backgroundColor: "#292B5F",
    color: "#fff",
    width: 200,
    marginTop: 30,
    padding: 10,
  },
  loginTxt: {
    color: "#fff",
    textAlign: "center",
  },
});

export default Login;
