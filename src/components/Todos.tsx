"use client";

import { useTodos } from "@/store/todos";
import { useSearchParams } from "next/navigation";

const Todos = () => {
  const { todos, handleCompleted, handleDelete } = useTodos();
  const searchParams = useSearchParams();
  const todosState = searchParams.get("todos");

  let filterTodos = todos;

  if (todosState === "active") {
    filterTodos = filterTodos.filter((todo) => !todo.completed);
  } else if (todosState === "completed") {
    filterTodos = filterTodos.filter((todo) => todo.completed);
  }

  return (
    <>
      <ul>
        {filterTodos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              name=""
              id={`todo${todo.id}`}
              checked={todo.completed}
              onChange={() => handleCompleted(todo.id)}
            />
            <label htmlFor={`todo${todo.id}`}>{todo.task}</label>
            {todo.completed && (
              <button type="button" onClick={() => handleDelete(todo.id)}>
                Delete
              </button>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Todos;
