'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface StatusProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
}

const Status = React.forwardRef<HTMLDivElement, StatusProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium transition-all',
          'border border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
          className
        )}
        {...props}
      />
    );
  }
);
Status.displayName = 'Status';

interface StatusIndicatorProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  pulse?: boolean;
}

const StatusIndicator = React.forwardRef<HTMLSpanElement, StatusIndicatorProps>(
  ({ className, variant = 'default', pulse = true, ...props }, ref) => {
    const variantStyles = {
      default: 'bg-gray-500',
      success: 'bg-green-500',
      warning: 'bg-yellow-500',
      error: 'bg-red-500',
      info: 'bg-blue-500',
    };

    return (
      <span className="relative flex h-2.5 w-2.5" ref={ref} {...props}>
        {pulse && (
          <span
            className={cn(
              'absolute inline-flex h-full w-full animate-ping rounded-full opacity-75',
              variantStyles[variant]
            )}
          />
        )}
        <span
          className={cn(
            'relative inline-flex h-2.5 w-2.5 rounded-full',
            variantStyles[variant],
            className
          )}
        />
      </span>
    );
  }
);
StatusIndicator.displayName = 'StatusIndicator';

interface StatusLabelProps extends React.HTMLAttributes<HTMLSpanElement> {}

const StatusLabel = React.forwardRef<HTMLSpanElement, StatusLabelProps>(
  ({ className, ...props }, ref) => {
    return <span ref={ref} className={cn('text-sm font-medium', className)} {...props} />;
  }
);
StatusLabel.displayName = 'StatusLabel';

export { Status, StatusIndicator, StatusLabel };
