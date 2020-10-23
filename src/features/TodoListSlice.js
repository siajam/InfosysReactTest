import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  value: [
    {
      id: 1,
      name: "sample completed",
      completion: false,
    },
    {
      id: 2,
      name: "sample un completed",
      completion: true,
    },
  ],
};
export const todoListSlice = createSlice({
  name: "todoList",
  initialState,
  reducers: {
    SimpleAdd: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      let max = 0;
      state.value.forEach((character) => {
        if (character.id > max) {
          max = character.id;
        }
      });

      var newList = state.value.concat({
        id: max + 1,
        name: action.payload.name,
        completion: action.payload.completion,
      });

      state.value = newList.sort((a, b) => a.id - b.id);
    },
    SimpleDelete: (state, action) => {
      var newList = state.value.filter((item) => item.id !== action.payload);
      state.value = newList.sort((a, b) => a.id - b.id);
    },
    SimpleUpdate: (state, action) => {
      if (action.id == 0 || action.name == "") return;

      var updnewList = state.value.concat();
      updnewList = updnewList.filter((item) => item.id !== action.payload.id);
      updnewList = updnewList.concat({
        id: action.payload.id,
        name: action.payload.name,
        completion: action.payload.completion,
      });
      state.value = updnewList.sort((a, b) => a.id - b.id);
    },
  },
});

export const { SimpleAdd, SimpleDelete, SimpleUpdate } = todoListSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.todoList.value)`
export const selectTotoList = (state) => state.todoList.value;

export default todoListSlice.reducer;
