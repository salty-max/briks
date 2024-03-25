import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

import type { ClassValue } from 'clsx';

const PREFIX = 'bk-';

function prefixTailwindClassnames(classNames: ClassValue): string {
  if (typeof classNames !== 'string') {
    return '';
  }

  return classNames
    .split(' ')
    .map(className => {
      // Handle classes like -mt-2
      if (className.startsWith('-')) {
        const [variant, rest] = className.split(/(?<=^-.*?)-/);
        return `${PREFIX}${variant}${rest}`;
      }
      // Handle classes like hover:classname, dark:hover:classname, etc.
      if (className.includes(':')) {
        const pseudoClasses = className.split(':');
        const baseClass = pseudoClasses.pop()!;
        const prefixedBaseClass = `${PREFIX}${baseClass}`;
        const prefixedPseudoClasses = pseudoClasses.map(pc => `${pc}:${prefixedBaseClass}`);
        return (
          prefixedPseudoClasses.join(' ') +
          (prefixedPseudoClasses.length > 0 ? ' ' : '') +
          prefixedBaseClass
        );
      }
      // Prefix regular class names
      if (!className.startsWith(PREFIX)) {
        return `${PREFIX}${className}`;
      }
      // Return unchanged if already prefixed

      return className;
    })
    .join(' ');
}

function cn(...classes: ClassValue[]): string {
  return twMerge(clsx(...classes));
}

export { cn, prefixTailwindClassnames };
