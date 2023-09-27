import { configureStore } from "@reduxjs/toolkit";
import RootsReducer from "./Reducers";

export default configureStore({
  reducer: RootsReducer,
});
