'use client';

import { useState } from 'react';
import { Todo, FilterType } from '@/lib/types';
import { TodoItem } from '@/components/todo-item';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface TodoListProps {
  todos: Todo[];
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  allTodos: Todo[];
}

export function TodoList({
  todos,
  filter,
  onFilterChange,
  onToggle,
  onDelete,
  allTodos,
}: TodoListProps) {
  const active = allTodos.filter((todo) => !todo.completed).length;
  const completed = allTodos.filter((todo) => todo.completed).length;

  return (
    <div className="flex flex-col space-y-4">
      <Tabs
        defaultValue="all"
        value={filter}
        onValueChange={(value) => onFilterChange(value as FilterType)}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all" className="relative">
            All
            <span className="ml-1 text-xs text-muted-foreground">
              ({allTodos.length})
            </span>
          </TabsTrigger>
          <TabsTrigger value="active">
            Active
            <span className="ml-1 text-xs text-muted-foreground">
              ({active})
            </span>
          </TabsTrigger>
          <TabsTrigger value="completed">
            Completed
            <span className="ml-1 text-xs text-muted-foreground">
              ({completed})
            </span>
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {todos.length === 0 ? (
        <div className="flex h-60 flex-col items-center justify-center rounded-md border border-dashed p-8 text-center">
          <p className="text-muted-foreground">
            {filter === 'all'
              ? 'No tasks yet. Add your first task above!'
              : filter === 'active'
              ? 'No active tasks. All caught up!'
              : 'No completed tasks yet.'}
          </p>
        </div>
      ) : (
        <ScrollArea className="h-[400px] rounded-md pr-3">
          <div className="space-y-3">
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={onToggle}
                onDelete={onDelete}
              />
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
}