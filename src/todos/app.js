import todoStore, { Filters } from "../store/todo.store";
import html from "./app.html?raw";
import { renderPending, renderTodos } from "./use-cases";

const elementIDs = {
  TodoList: ".todo-list",
  NewTodoInput: "#new-todo-input",
  ClearCompleted: ".clear-completed",
  TodoFilters: ".filtro",
  PendingCountLabel: "#pending-count",
};

/**
 * @param {String} elementId
 */
export const App = (elementId) => {
  const displayTodos = () => {
    const todos = todoStore.getTodos(todoStore.getCurrentFilter());
    renderTodos(elementIDs.TodoList, todos);
    updatePendingCount();
  };

  const updatePendingCount = () => {
    renderPending(elementIDs.PendingCountLabel);
  };

  //App function is called
  (() => {
    const app = document.createElement("div");
    app.innerHTML = html;
    document.querySelector(elementId).append(app);
    displayTodos();
  })();

  //HTML References
  const newDescriptionInput = document.querySelector(elementIDs.NewTodoInput);
  const todoListUL = document.querySelector(elementIDs.TodoList);
  const clearButton = document.querySelector(elementIDs.ClearCompleted);
  const filtersILs = document.querySelectorAll(elementIDs.TodoFilters);

  //Listeners
  newDescriptionInput.addEventListener("keyup", (event) => {
    if (event.keyCode !== 13) return;
    if (event.target.value.trim().length === 0) return;
    todoStore.addTodo(event.target.value);
    displayTodos();
    event.target.value = "";
  });
  todoListUL.addEventListener("click", (event) => {
    const element = event.target.closest("[data-id]");
    const elementNeededId = element.getAttribute("data-id");
    todoStore.toggleTodo(elementNeededId);
    if (event.target.className === "destroy") {
      todoStore.deleteTodo(elementNeededId);
    }
    displayTodos();
  });
  clearButton.addEventListener("click", () => {
    todoStore.deleteCompleted();
    displayTodos();
  });
  filtersILs.forEach((element) => {
    element.addEventListener("click", (element) => {
      filtersILs.forEach((el) => {
        el.classList.remove("selected");
      });
      element.target.classList.add("selected");
      switch (element.target.text) {
        case "Todos":
          todoStore.setFilter(Filters.All);
          break;
        case "Completados":
          todoStore.setFilter(Filters.Completed);
          break;
        case "Pendientes":
          todoStore.setFilter(Filters.Pending);
          break;
      }
      displayTodos();
    });
  });
};
