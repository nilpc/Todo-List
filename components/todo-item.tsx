'use client';

import { useState } from 'react';
import { Todo } from '@/lib/types';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Trash } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);
    // Small delay to allow animation to complete
    setTimeout(() => {
      onDelete(todo.id);
    }, 200);
  };

  return (
    <Card
      className={cn(
        'overflow-hidden border-l-4 transition-all duration-300 ease-in-out',
        todo.completed ? 'border-l-green-500 bg-green-50 dark:bg-green-900/20' : 'border-l-blue-500',
        isDeleting && 'translate-x-full opacity-0'
      )}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Checkbox
            checked={todo.completed}
            onCheckedChange={() => onToggle(todo.id)}
            className="mt-1"
          />
          <div className="flex-1 space-y-1">
            <h3 
              className={cn(
                "font-medium leading-tight transition-all",
                todo.completed && "line-through text-muted-foreground"
              )}
            >
              {todo.title}
            </h3>
            {todo.description && (
              <p 
                className={cn(
                  "text-sm text-muted-foreground",
                  todo.completed && "line-through opacity-70"
                )}
              >
                {todo.description}
              </p>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t px-4 py-2.5 text-xs text-muted-foreground">
        <time dateTime={todo.createdAt.toISOString()}>
          {format(todo.createdAt, 'MMM d, yyyy')}
        </time>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={handleDelete}
          className="h-7 w-7 text-destructive hover:bg-destructive/10 hover:text-destructive"
        >
          <Trash className="h-4 w-4" />
          <span className="sr-only">Delete</span>
        </Button>
      </CardFooter>
    </Card>
  );
}