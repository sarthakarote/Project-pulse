import { forwardRef } from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export const Card = forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={twMerge(
      clsx(
        'rounded-xl border border-slate-200 bg-white text-slate-950 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-50',
        className
      )
    )}
    {...props}
  />
));
Card.displayName = 'Card';

export const CardHeader = forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={twMerge(clsx('flex flex-col space-y-1.5 p-6', className))}
    {...props}
  />
));
CardHeader.displayName = 'CardHeader';

export const CardTitle = forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={twMerge(
      clsx('font-semibold leading-none tracking-tight', className)
    )}
    {...props}
  />
));
CardTitle.displayName = 'CardTitle';

export const CardDescription = forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={twMerge(clsx('text-sm text-slate-500 dark:text-slate-400', className))}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

export const CardContent = forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={twMerge(clsx('p-6 pt-0', className))} {...props} />
));
CardContent.displayName = 'CardContent';

export const CardFooter = forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={twMerge(clsx('flex items-center p-6 pt-0', className))}
    {...props}
  />
));
CardFooter.displayName = 'CardFooter';
