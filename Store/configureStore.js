import { createStore } from "redux";
import favoriteReducer from "./Reducers/favoriteReducer";

export default createStore(favoriteReducer);