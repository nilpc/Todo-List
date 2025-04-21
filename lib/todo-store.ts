'use client';

import { Todo, FilterType } from './types';
import { useState, useEffect } from 'react';

export const useTodoStore = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
  const [isLoaded, setIsLoaded] = useState(false);

  // Load todos from localStorage on initial render
  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      try {
        const parsedTodos = JSON.parse(storedTodos);
        // Convert string dates back to Date objects
        const formattedTodos = parsedTodos.map((todo: any) => ({
          ...todo,
          createdAt: new Date(todo.createdAt),
        }));
        setTodos(formattedTodos);
      } catch (error) {
        console.error('Failed to parse todos from localStorage', error);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos, isLoaded]);

  // Add a new todo
  const addTodo = (title: string, description?: string) => {
    if (!title.trim()) return;
    
    const newTodo: Todo = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description?.trim(),
      completed: false,
      createdAt: new Date(),
    };

    setTodos([newTodo, ...todos]);
  };

  // Toggle todo completion status
  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Delete a todo
  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Get filtered todos based on current filter
  const getFilteredTodos = () => {
    switch (filter) {
      case 'active':
        return todos.filter((todo) => !todo.completed);
      case 'completed':
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  };

  return {
    todos: getFilteredTodos(),
    allTodos: todos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
  };
};