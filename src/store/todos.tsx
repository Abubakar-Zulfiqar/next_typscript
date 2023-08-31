"use client";

import { createContext, ReactNode, useContext, useState } from "react";

export type Todo = {
  id: string;
  task: string;
  completed: boolean;
  createdAt: Date;
};

export type TodosContext = {
  todos: Todo[];
  handleAddTodo: (task: string) => void;
  handleCompleted: (id: string) => void;
  handleDelete: (id: string) => void;
};

export const todosContext = createContext<TodosContext | null>(null);

// Define a utility function for handling localStorage
const getLocalStorage = () => {
  if (typeof localStorage !== "undefined") {
    return localStorage;
  } else {
    // Create a simple in-memory storage for non-browser environments
    const data: Record<string, string> = {};
    return {
      getItem(key: string) {
        return data[key];
      },
      setItem(key: string, value: string) {
        data[key] = value;
      },
      removeItem(key: string) {
        delete data[key];
      },
    };
  }
};

export const TodosProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const storage = getLocalStorage();
    const newTodos = storage.getItem("todos") || "[]";
    return JSON.parse(newTodos) as Todo[];
  });

  const handleAddTodo = (task: string) => {
    setTodos((prev) => {
      const newTodos: Todo[] = [
        {
          id: Math.random().toString(),
          task,
          completed: false,
          createdAt: new Date(),
        },
        ...prev,
      ];
      const storage = getLocalStorage();
      storage.setItem("todos", JSON.stringify(newTodos));
      return newTodos;
    });
  };

  // if task is completed
  const handleCompleted = (id: string) => {
    setTodos((prev) => {
      const newTodos = prev.map((task) => {
        if (task.id === id) {
          return { ...task, completed: !task.completed };
        }
        return task;
      });
      const storage = getLocalStorage();
      storage.setItem("todos", JSON.stringify(newTodos));
      return newTodos;
    });
  };

  // if task is deleted
  const handleDelete = (id: string) => {
    setTodos((prev) => {
      const newTodos = prev.filter((task) => task.id !== id);
      const storage = getLocalStorage();
      storage.setItem("todos", JSON.stringify(newTodos));
      return newTodos;
    });
  };

  return (
    <todosContext.Provider
      value={{ todos, handleAddTodo, handleCompleted, handleDelete }}
    >
      {children}
    </todosContext.Provider>
  );
};

// context api
export const useTodos = () => {
  const todosContextValue = useContext(todosContext);
  if (!todosContextValue) {
    throw new Error("UseTodos used outside of Provider");
  }
  return todosContextValue;
};
