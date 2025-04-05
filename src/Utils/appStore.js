import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import ConnectionReducer from "./connectionSlice";
import Connections from "../Components/Connections";

// added slice into the store
const appStore = configureStore({
    reducer: {
      user: userReducer,
      feed: feedReducer,
      connections: ConnectionReducer,
    },
  });
  
  export default appStore;