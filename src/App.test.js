import reducer, {
  initialState,
  SimpleAdd,
  SimpleDelete,
  SimpleUpdate,
  selectTotoList,
} from "./features/TodoListSlice";

describe("auth slice", () => {
  describe("reducer, actions and selectors", () => {
    it("should return the initial state on first run", () => {
      // Arrange
      const nextState = initialState;

      // Act
      const result = reducer(undefined, {});

      // Assert
      expect(result).toEqual(nextState);
    });

    it("Add one record. excpect resdult 3", () => {
      // Arrange
      const data = {
        id: 1,
        name: "test 1",
        completion: false,
      };

      // Act
      const nextState = reducer(initialState, SimpleAdd(data));

      // Assert

      const rootState = { todoList: nextState };
      expect(selectTotoList(rootState)).toHaveLength(3);
    });

    it("Delete one record. expect result 1", () => {
      // Arrange

      // Act
      const nextState = reducer(initialState, SimpleDelete(1));

      // Assert
      const rootState = { todoList: nextState };
      expect(selectTotoList(rootState)).toHaveLength(1);
    });

    it("Edit intitialState. expect result 1", () => {
      // Arrange
      const data = {
        id: 1,
        name: "edited name",
        completion: true,
      };
      // Act
      const nextState = reducer(initialState, SimpleUpdate(data));

      // Assert
      const rootState = { todoList: nextState };
      expect(selectTotoList(rootState)).toHaveLength(2);
    });
  });
});
