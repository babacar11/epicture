import React from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  TouchableOpacity,
} from "react-native";
import { Image } from "react-native-web";

class ImageItem extends React.Component {
  constructor(props) {
    super(props);
  }
  _formatLink(image) {
    let arr = [".jpg", ".png", ".jpeg", ".gif"];

    if (arr.includes(image.link.toString())) {
      ("");
      let imageType = image.type.split("/")[1];
      image.link += "." + imageType;
    }
    return image.link;
  }
  render() {
    return (
      <TouchableOpacity style={styles.main_container}>
        <ImageBackground
          style={styles.img_container}
          source={{
            uri: this._formatLink(this.props.image),
          }}
        ></ImageBackground>
        <Text> {this.props.image.link}</Text>
      </TouchableOpacity>
    );
  }
}

export default ImageItem;

styles = StyleSheet.create({
  main_container: {
    flex: 1,
    flexDirection: "column",
    margin: 1,
  },
  img_container: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    height: 200,
  },
});
