import {
  CLIENT_ID,
  CLIENT_SECRET,
  REFRESH_TOKEN,
  ACCOUNT_USERNAME,
} from "./config";
import axios from "axios";

export async function generateNewAccessToken() {
  var bodyFormData = new FormData();

  bodyFormData.append("refresh_token", REFRESH_TOKEN);
  bodyFormData.append("client_id", CLIENT_ID);
  bodyFormData.append("client_secret", CLIENT_SECRET);
  bodyFormData.append("grant_type", "refresh_token");
  bodyFormData.append("response_type", "token");

  // const data = await fetch("https://api.imgur.com/oauth2/token", {
  //   method: "POST",
  //   headers: new Headers({
  //     "Content-Type": "multipart/form-data",
  //     Accept: "application/json",
  //   }),
  //   body: bodyFormData,
  // })
  //   .then((resp) => {
  //     return resp.formData();
  //   })
  //   .catch((err) => {
  //     console.log("Sorry problem");
  //   });

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
  // const imagesArr = await fetch(
  //   `https://api.imgur.com/3/account/${account_username}/images`,
  //   {
  //     method: "GET",
  //     headers: new Headers({
  //       Authorization: "Bearer " + token,
  //       "Content-type": "application/json",
  //       Accept: "application/json",
  //       "Accept-Ranges": "bytes",
  //       Connection: "keep-alive",
  //     }),
  //   }
  // )
  //   .then((resp) => {
  //     console.log("Images All", resp.data);
  //     return resp;
  //   })
  //   .catch((err) => {
  //     console.log("Can't fetch Images");
  //   });
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
      console.log("Token", resp.data);
      return resp.data;
    })
    .catch((err) => {
      console.log();
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
// export async function getImageFromID(token, account_username, imageID) {
//   const imageData = await axios({
//     method: "get",
//     url: `https://api.imgur.com/3/account/${account_username}/image/${imageID}`,
//     responseType: "json",
//     headers: {
//       Authorization: "Bearer " + token,
//       "Content-type": "application/json",
//     },
//   }).then((resp) => {
//     // return resp.data;
//     console.log("Request ID", resp);
//   });
//
//   return imageData;
// }
