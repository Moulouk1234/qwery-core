'use client';

import * as React from 'react';

import { BookText, Plus, Sparkles, Type } from 'lucide-react';

import { Button } from '@qwery/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@qwery/ui/dropdown-menu';
import { cn } from '@qwery/ui/utils';

interface CellDividerProps {
  onAddCell: (type: 'query' | 'text' | 'prompt') => void;
  className?: string;
}

export function CellDivider({ onAddCell, className }: CellDividerProps) {
  return (
    <div
      className={cn(
        'group relative flex h-4 w-full items-center justify-center transition-all duration-300 my-1',
        className,
      )}
    >
      {/* Background line - only visible on hover, fades out at edges */}
      <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-border to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Buttons container - only visible on hover of the container */}
      <div className="flex items-center gap-2 relative z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0">
        <Button
          size="sm"
          variant="secondary"
          className="h-7 gap-1.5 px-3 rounded-full text-[11px] font-semibold bg-background border shadow-sm hover:bg-accent transition-all duration-200 active:scale-95 hover:shadow-md"
          onClick={() => onAddCell('query')}
        >
          <Plus className="h-3.5 w-3.5" />
          Code
        </Button>
        <Button
          size="sm"
          variant="secondary"
          className="h-7 gap-1.5 px-3 rounded-full text-[11px] font-semibold bg-background border shadow-sm hover:bg-accent transition-all duration-200 active:scale-95 hover:shadow-md"
          onClick={() => onAddCell('text')}
        >
          <Plus className="h-3.5 w-3.5" />
          Markdown
        </Button>
        <Button
          size="sm"
          variant="secondary"
          className="h-7 gap-1.5 px-3 rounded-full text-[11px] font-semibold bg-background border shadow-sm hover:bg-accent transition-all duration-200 active:scale-95 hover:shadow-md"
          onClick={() => onAddCell('prompt')}
        >
          <Sparkles className="h-3.5 w-3.5" />
          Prompt
        </Button>
      </div>
    </div>
  );
}
