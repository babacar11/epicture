import React from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  StatusBar,
  ActivityIndicator,
  FlatList,
} from "react-native";
import {
  generateNewAccessToken,
  getFavoriteImage,
  // getImageFromID,
} from "../API/IMGUR_API";
import ImageItem from "./ImageItem";

class Favorite extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      images: [],
      user: {},
    };
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
  _loadImages() {
    this.setState({ isLoading: true });

    // We load all images
    generateNewAccessToken()
      .then((userData) => {
        this.setState({ user: { ...userData } });
        var images = getFavoriteImage(
          userData.access_token,
          userData.account_username
        )
          .then((imagesData) => {
            this.setState({
              images: imagesData.data,
              isLoading: false,
            });
          })
          .catch((err) => {
            console.log("Error Loading images");
          });
      })

      .catch((err) => {
        console.log("Sorry");
      });
  }
  _displayResult() {
    if (this.state.images.length == 0) {
      return <Text style={styles.infoResultText}>No Favorite yet</Text>;
    } else {
      return (
        <View style={styles.content}>
          <Text>Favorite</Text>

          <FlatList
            renderItem={({ item }) => <ImageItem image={item} />}
            numColumns={2}
            data={this.state.images}
            keyExtractor={(item) => item.id}
          />
        </View>
      );
    }
  }

  componentDidMount() {
    this._loadImages();
  }

  render() {
    return (
      <SafeAreaView style={styles.main_container}>
        {this._displayLoading()}
        {this._displayResult()}
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
  infoResultText: {
    color: "#ccc",
    textAlign: "center",
  },
});

export default Favorite;
