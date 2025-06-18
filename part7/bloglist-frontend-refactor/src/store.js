import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from "./reducers/notificationReducer.js";
import blogReducer from "./reducers/blogReducer.js";
import userReducer from "./reducers/userReducer.js"
import userListReducer from "./reducers/userListReducer.js";

const store = configureStore({
  reducer : {
    notification: notificationReducer,
    blogs: blogReducer,
    user: userReducer,
    userList: userListReducer
  }
})

export default store