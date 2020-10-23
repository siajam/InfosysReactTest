import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  SimpleAdd,
  SimpleDelete,
  SimpleUpdate,
  selectTotoList,
} from "./TodoListSlice";

import styles from "./TodoList.module.css";

export function TodoListModule() {
  const dispatch = useDispatch();
  const TotoList = useSelector(selectTotoList);
  const [selectedCompletion, setSelectedCompletion] = useState(-1);
  var updateItemId = -1;
  let addInput;
  let editInput;
  let addCheckbox;
  let editCheckbox; 
  
  const dispatchAdd = (value) => {
    if (value.name != "") dispatch(SimpleAdd(value));
  };
  const dispatchUpdate = (value) => {
    if (value.id > 0 && value.name != "") dispatch(SimpleUpdate(value));
  };

  const SimpleEdit = (id) => {
    let item = TotoList.filter((item) => item.id == id)[0];
    updateItemId = id;
    editInput.value = item.name;
    editCheckbox.value = item.completion;
    editCheckbox.checked = item.completion;
  };

  const SimpleList = () => (
    <div>
      <div>
        <span>Add Item :</span>
        <input
          className={styles.textbox}
          type="text"
          ref={(el) => (addInput = el)}
        ></input>
        <input ref={(el) => (addCheckbox = el)} type="checkbox"></input>
        <button
          className={styles.button}
          onClick={() =>
            dispatchAdd({
              name: addInput.value,
              completion: addCheckbox.checked,
            })
          } 
        >
          <span>Add</span>
        </button>
      </div>
      <div>
        <span> Edit Item : </span>
        <input className={styles.textbox} ref={(el) => (editInput = el)} />
        <input ref={(el) => (editCheckbox = el)} type="checkbox"></input>
        <button
          className={styles.button}
          onClick={() =>
            dispatchUpdate({
              id: updateItemId,
              name: editInput.value,
              completion: editCheckbox.checked,
            })
          }>
          <span>Update</span>
        </button>
      </div>
      <select
        value={selectedCompletion}
        onChange={(e) => setSelectedCompletion(e.target.value)}
      >
        <option value="-1">All</option>
        <option value="0">UnCompleted</option>
        <option value="1">Completed</option>
      </select>
      <ul>
        {TotoList.map(function (item) {
          if (
            selectedCompletion == -1 ||
            item.completion == selectedCompletion
          ) {
            return (
              <li key={item.id}>
                <span>{item.name}</span>
                <input
                  value={item.completion}
                  checked={item.completion}
                  className={styles.textbox}
                  type="checkbox"
                ></input>
                <button
                  className={styles.button}
                  onClick={() => SimpleEdit(item.id)}
                >
                  <span> Edit</span>
                </button>

                <button
                  className={styles.button}
                  onClick={() => dispatch(SimpleDelete(item.id))}
                >
                  <span>Delete </span>
                </button>
              </li>
            );
          }
        })}
      </ul>
    </div>
  );

  return (
    <div>
      <SimpleList></SimpleList>
    </div>
  );
}
