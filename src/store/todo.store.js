import { createTodo } from "../todos/models/todo.models";

export const Filters = {
  All: "All",
  Completed: "Completed",
  Pending: "Pending",
};

const state = {
  todos: [
    createTodo("Piedra del alma"),
    createTodo("Piedra del infinito"),
    createTodo("Piedra del realidad"),
    createTodo("Piedra del tiempo"),
    {
      id: "1b2516fc-5f41-46e2-b639-cc07b57d9d30",
      description: "Piedra del poder",
      completed: false,
      createdAt:
        "Tue Feb 13 2024 14:16:56 GMT-0500 (hora estándar de Colombia)",
    },
  ],
  filter: Filters.All,
};

const initStore = () => {
  loadStore();
  console.log("InitStore 🥑");
};

const getTodos = (filter = Filters.All) => {
  switch (filter) {
    case Filters.All:
      return [...state.todos];
    case Filters.Completed:
      return [...state.todos.filter((element) => element.completed)];
    case Filters.Pending:
      return [...state.todos.filter((element) => !element.completed)];
    default:
      throw new Error(`Option ${filter} not valid`);
  }
};

const loadStore = () => {
  if (!localStorage.getItem("todos")) return;
  const { todos = [], filter = Filters.All } = JSON.parse(
    localStorage.getItem("todos")
  );
  state.todos = todos;
  state.filter = filter;
};

const saveStateToLocalStorage = () => {
  const saveItem = JSON.stringify(state);
  localStorage.setItem("todos", saveItem);
};

/**
 * @param {String} description
 */
const addTodo = (description) => {
  if (!description) {
    throw new Error("Not implemented");
  } else {
    state.todos.push(createTodo(description));
  }
  saveStateToLocalStorage();
};
/**
 *Toggles the todo completion property of the todo with the todoId given between completed and pending
 * @param {String} todoId
 */
const toggleTodo = (todoId) => {
  state.todos = state.todos.map((todo) => {
    if (todo.id === todoId) {
      todo.completed = !todo.completed;
    }
    return todo;
  });
  saveStateToLocalStorage();
};
/**
 *Deletes the todo with the todoId given.
 * @param {String} todoId
 */
const deleteTodo = (todoId) => {
  state.todos = state.todos.filter((element) => element.id !== todoId);
  saveStateToLocalStorage();
};
/**
 *Deletes the todo with the completion property set to 'Completed'.
 *
 */
const deleteCompleted = () => {
  state.todos = state.todos.filter((element) => !element.completed);
  saveStateToLocalStorage();
};
/**
 *Sets the filter property of the store to the one given, if none is passed it will be set to 'All'.
 *@param {Filters} newFilter
 */
const setFilter = (newFilter = Filters.All) => {
  state.filter = newFilter;
};
/**
 *Returns the current value of the filter property of the Store.
 */
const getCurrentFilter = () => {
  return state.filter;
};

export default {
  addTodo,
  deleteCompleted,
  deleteTodo,
  getCurrentFilter,
  getTodos,
  initStore,
  loadStore,
  setFilter,
  toggleTodo,
};
