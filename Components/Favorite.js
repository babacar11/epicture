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
  getImageFromID,
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
        var images = getFavoriteImage(
          userData.access_token,
          userData.account_username
        )
          .then((imagesData) => {
            imagesData.data.forEach((image) => {
              getImageFromID(
                userData.access_token,
                userData.account_username,
                image.cover
              )
                .then((link) => {
                  image.link = link;
                })
                .finally(() => {
                  this.setState({
                    user: userData,
                    images: imagesData.data,
                    isLoading: false,
                  });
                });
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
        <StatusBar animated={true} backgroundColor="#292B5F" />
        {this._displayLoading()}
        <Text>Favorite</Text>
        {this._displayResult()}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    padding: 5,
  },
  infoResultText: {
    color: "#ccc",
    textAlign: "center",
  },
});

export default Favorite;
