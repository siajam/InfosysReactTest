import { configureStore } from "@reduxjs/toolkit";

import todoListReducer from "../features/TodoListSlice";

export default configureStore({
  reducer: {
    todoList: todoListReducer,
  },
});
