'use client';

import { useTodoStore } from '@/lib/todo-store';
import { TodoForm } from '@/components/todo-form';
import { TodoList } from '@/components/todo-list';
import { CheckCircle } from 'lucide-react';

export default function Home() {
  const {
    todos,
    allTodos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
  } = useTodoStore();

  return (
    <main className="flex min-h-screen flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <CheckCircle className="h-12 w-12 text-primary" />
          </div>
          <h1 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl">
            Todo List
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            A simple way to keep track of your tasks
          </p>
        </div>

        <div className="mt-8 space-y-6">
          <TodoForm onAddTodo={addTodo} />
          
          <TodoList
            todos={todos}
            allTodos={allTodos}
            filter={filter}
            onFilterChange={setFilter}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        </div>
      </div>
    </main>
  );
}