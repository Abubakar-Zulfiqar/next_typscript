"use client";

import { FormEvent, useState } from "react";

import { useTodos } from "@/store/todos";

const AddTodo = () => {
  const [todo, setTodo] = useState("");

  const { handleAddTodo } = useTodos();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleAddTodo(todo);
    setTodo("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name=""
        id=""
        placeholder="Write your todo"
        value={todo}
        onChange={(event) => setTodo(event.target.value)}
      />
      <button type="submit">ADD</button>
    </form>
  );
};

export default AddTodo;
