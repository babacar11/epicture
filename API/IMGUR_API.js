import {
  CLIENT_ID,
  CLIENT_SECRET,
  REFRESH_TOKEN,
  ACCOUNT_USERNAME,
} from "./config";
import axios from "axios";
import FsStream from "react-native-fs-stream";
export async function generateNewAccessToken() {
  var bodyFormData = new FormData();

  bodyFormData.append("refresh_token", REFRESH_TOKEN);
  bodyFormData.append("client_id", CLIENT_ID);
  bodyFormData.append("client_secret", CLIENT_SECRET);
  bodyFormData.append("grant_type", "refresh_token");
  bodyFormData.append("response_type", "token");

  const data = await axios
    .post("https://api.imgur.com/oauth2/token", bodyFormData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((resp) => {
      return resp.data;
    })
    .catch((err) => {
      console.log("Axios key err", err);
    });

  return data;
}

export async function getAllImages(token, account_username) {
  let imagesArr = await axios({
    method: "get",
    url: `https://api.imgur.com/3/account/${account_username}/images`,
    responseType: "json",
    headers: {
      Authorization: "Bearer " + token,
      "Content-type": "application/json",
    },
  })
    .then((resp) => {
      return resp.data;
    })
    .catch((err) => {
      // console.log(err);
    });
  return imagesArr;
}

export async function getFavoriteImage(token, account_username) {
  const favoriteImageData = await axios({
    method: "get",
    url: `https://api.imgur.com/3/account/${account_username}/favorites`,
    responseType: "json",
    headers: {
      Authorization: "Bearer " + token,
      "Content-type": "application/json",
    },
  }).then((resp) => {
    return resp.data;
  });

  return favoriteImageData;
}
//
export async function getImageFromID(token, account_username, imageID) {
  const imageData = await axios({
    method: "get",
    url: `https://api.imgur.com/3/account/${account_username}/image/${imageID}`,
    responseType: "json",
    headers: {
      Authorization: "Bearer " + token,
      "Content-type": "application/json",
    },
  })
    .then((resp) => {
      return resp.data.data.link;
    })
    .catch((err) => {
      console.log("Error", err);
    });

  return imageData;
}

export async function uploadImage(
  imageURI,
  imageType,
  imageName,
  imageTitle,
  imageDescription
) {
  var bodyFormData = new FormData();

  bodyFormData.append("image", imageURI);
  bodyFormData.append("album", null);
  bodyFormData.append("type", imageType);
  bodyFormData.append("name", imageName);
  bodyFormData.append("title", imageTitle);
  bodyFormData.append("description", imageDescription);

  var token = "de48853f14f4b2d79213d9e432ba30862df9a7af";
  const data = await axios
    .post("https://api.mgur.com/3/upload", bodyFormData, {
      headers: {
        // Authorization: "Bearer " + token,
        "Client-ID": CLIENT_ID,
        "Content-Type": "multipart/form-data",
      },
    })
    .then((resp) => {
      console.log("Success", resp);
      return resp.data;
    })
    .catch((err) => {
      console.log("Sorry fail to upload the file", err);
    });

  // return data;
}
