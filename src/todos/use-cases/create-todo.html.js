export const createTodoHTML = (todo) => {
  if (!todo) throw new Error("todo object is required");
  const html = `<div class="view">
      <input class="toggle" type="checkbox" ${todo.completed && "checked"}>
      <label> ${todo.description} </label>
      <button class="destroy"></button>
  </div>
  <input class="edit" value="Create a TodoMVC template">
`;
  const liElement = document.createElement("li");
  liElement.innerHTML = html;
  liElement.setAttribute("data-id", todo.id);
  if (todo.completed) {
    liElement.classList.add(`completed`);
  }

  return liElement;
};
