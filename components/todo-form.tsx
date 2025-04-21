'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';

interface TodoFormProps {
  onAddTodo: (title: string, description?: string) => void;
  className?: string;
}

export function TodoForm({ onAddTodo, className }: TodoFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAddTodo(title, description);
      setTitle('');
      setDescription('');
      setIsExpanded(false);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className={cn('space-y-3', className)}
    >
      <div className="flex gap-2">
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new task..."
          className="shadow-sm transition-all duration-200"
          onFocus={() => setIsExpanded(true)}
        />
        <Button 
          type="submit" 
          size="icon"
          disabled={!title.trim()}
          className="shrink-0 shadow-sm transition-all duration-200 hover:scale-105 active:scale-95"
        >
          <Plus className="h-4 w-4" />
          <span className="sr-only">Add task</span>
        </Button>
      </div>
      
      {isExpanded && (
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add details (optional)"
          className="min-h-[80px] resize-none shadow-sm transition-all duration-200"
        />
      )}
    </form>
  );
}