import React from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  TouchableOpacity,
} from "react-native";
import { Image } from "react-native-web";
import { getImageFromID } from "../API/IMGUR_API";

class ImageItem extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}
  render() {
    return (
      <TouchableOpacity style={styles.main_container}>
        <ImageBackground
          style={styles.img_container}
          source={{
            uri: this.props.image.link,
          }}
        ></ImageBackground>
        {/*<Text> {this.props.image.link}</Text>*/}
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
