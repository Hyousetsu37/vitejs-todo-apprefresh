import { v4 as uuid } from "uuid";

export function createTodo(description) {
  return {
    id: uuid(),
    description,
    completed: false,
    createdAt: new Date(),
  };
}
