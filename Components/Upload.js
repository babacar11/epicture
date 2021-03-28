import React from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
} from "react-native";

import { uploadImage } from "../API/IMGUR_API";

// import { Lau } from "react-native-image-picker";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
class Upload extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imageToUpload: null,
    };
  }
  _btnLoadImageFromLibraryHandler = () => {
    launchImageLibrary(
      { mediaType: "photo", includeBase64: true },
      (response) => {
        if (response.didCancel) {
          console.log("L'utilisateur a annulé");
        } else if (response.error) {
          console.log("Erreur : ", response.error);
        } else {
          console.log("Photo : ", response.uri);
          let requireSource = { ...response };
          console.log("Image INfo", requireSource);
          this.setState({
            imageToUpload: requireSource,
          });
        }
      }
    );
  };

  _btnLoadImageFromCameraHandler = () => {
    launchCamera({}, (response) => {
      if (response.didCancel) {
        console.log("L'utilisateur a annulé");
      } else if (response.error) {
        console.log("Erreur : ", response.error);
      } else {
        console.log("Photo : ", response.uri);
        let requireSource = { ...response };

        this.setState({
          imageToUpload: requireSource,
        });
      }
    });
  };

  _cancelUploadHandler = () => {
    this.setState({ imageToUpload: null });
  };

  _btnUploadImageHandler = () => {
    console.log("Upload: ", this.state.imageToUpload);
    let image = { ...this.state.imageToUpload };

    uploadImage(
      image,
      image.type,
      image.fileName,
      image.fileName,
      image.fileName
    )
      .then((resp) => {
        console.log("Success: ", resp);
      })
      .catch((err) => {
        console.log("Erreur in uploading", err);
      });
  };

  _display() {
    if (this.state.imageToUpload == null) {
      return (
        <View style={styles.content}>
          <TouchableOpacity
            style={styles.btnLoadImageLibrary}
            onPress={this._btnLoadImageFromLibraryHandler}
          >
            <Text style={styles.btnText}>Load an Image</Text>
          </TouchableOpacity>
          {/* TODO Verifiez le probléme de la camera*/}
          {/*<TouchableOpacity*/}
          {/*  style={styles.btnLoadCamera}*/}
          {/*  onPress={this._btnLoadImageFromCameraHandler}*/}
          {/*>*/}
          {/*  <Text style={styles.btnText}>Take a picture from Camera</Text>*/}
          {/*</TouchableOpacity>*/}
        </View>
      );
    } else {
      return (
        <View style={styles.content}>
          <Image
            style={styles.img}
            source={{ uri: this.state.imageToUpload.uri }}
          />
          <TouchableOpacity
            style={styles.btnUpload}
            onPress={this._btnUploadImageHandler}
          >
            <Text style={styles.btnText}>Upload file</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnCancelUpload}
            onPress={this._cancelUploadHandler}
          >
            <Text style={styles.btnText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.main_container}>
        {this._display()}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  btnText: {
    color: "white",
  },
  btnUpload: {
    backgroundColor: "green",
    width: "50%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  },
  btnLoadImageLibrary: {
    backgroundColor: "green",
    width: "50%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  },
  btnLoadCamera: {
    backgroundColor: "gray",
    width: "50%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    marginTop: 10,
  },
  btnCancelUpload: {
    backgroundColor: "crimson",
    width: "50%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    marginTop: 10,
  },

  img: {
    width: 100,
    height: 100,
  },
});

export default Upload;
