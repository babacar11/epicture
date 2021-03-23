import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Image,
  Text,
  View,
  ImageBackground,
  Button,
  StatusBar,
  ActivityIndicator,
  FlatList,
  TextInput,
} from "react-native";
import { WebView } from "react-native-webview";
import { generateNewAccessToken, getAllImages } from "../API/IMGUR_API";
import { CLIENT_ID } from "../API/config";
import axios from "axios";
import ImageItem from "./ImageItem";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      data: null,
      user: {},
      images: [],
    };
  }

  _loadImages() {
    this.setState({ isLoading: true });

    // We load all images
    generateNewAccessToken()
      .then((userData) => {
        var images = getAllImages(
          userData.access_token,
          userData.account_username
        )
          .then((imagesData) => {
            this.setState({
              user: userData,
              images: imagesData.data,
              isLoading: false,
            });
          })
          .catch((err) => {
            console.log("Error Loading images", err);
          });
      })

      .catch((err) => {
        console.log("Sorry");
      });
  }

  componentDidMount() {
    this._loadImages();
  }
  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }
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

  handleWebViewNavigationStateChange = (newNavState) => {
    const { url } = newNavState;
    console.log(url);
  };

  render() {
    return (
      <SafeAreaView style={styles.main_container}>
        <StatusBar animated={true} backgroundColor="#292B5F" />
        {/*    TODO Search Bar*/}

        {this._displayLoading()}
        <View style={styles.content}>
          <FlatList
            renderItem={({ item }) => <ImageItem image={item} />}
            numColumns={2}
            data={this.state.images}
            keyExtractor={(item) => item.id}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  content: {
    flex: 1,
    padding: 5,
  },
  textInput: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: "#000",
    borderWidth: 1,
    paddingLeft: 5,
  },

  loading_container: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Home;
