import React from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  StatusBar,
  TextInput,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { generateNewAccessToken, getAllImages } from "../API/IMGUR_API";
import ImageItem from "./ImageItem";

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      images: [],
      results: [],
      user: {},
    };
    this.searchImageText = "";
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
  _searchTextInput(text) {
    this.searchImageText = text.toLowerCase();
  }
  _loadImages() {
    this.setState({ isLoading: true });
    console.log("Loading");

    // We load all images
    generateNewAccessToken()
      .then((userData) => {
        this.setState({ user: { ...userData } });
        var images = getAllImages(
          userData.access_token,
          userData.account_username
        )
          .then((imagesData) => {
            const result = imagesData.data.filter((item) => {
              if (item.name.includes(this.searchImageText)) {
                return item;
              }
            });
            console.log("Result", result);
            this.setState({
              images: imagesData.data,
              results: result,
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
    if (this.state.results.length == 0) {
      return <Text>No result yet</Text>;
    } else {
      return (
        <View style={styles.content}>
          <Text>Results</Text>

          <FlatList
            renderItem={({ item }) => <ImageItem image={item} />}
            numColumns={2}
            data={this.state.results}
            keyExtractor={(item) => item.id}
          />
        </View>
      );
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.main_container}>
        <StatusBar animated={true} backgroundColor="#292B5F" />
        <TextInput
          style={styles.textInput}
          placeholder="Nom de l'image"
          onChangeText={(text) => {
            this._searchTextInput(text);
          }}
          onSubmitEditing={() => {
            this._loadImages();
          }}
        />

        {this._displayLoading()}
        {this._displayResult()}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  textInput: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: "#000",
    borderWidth: 1,
    paddingLeft: 5,
  },
  content: {
    flex: 1,
    padding: 5,
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

export default Search;
