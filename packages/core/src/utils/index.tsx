/* eslint-disable no-unused-vars */
import clsx from 'clsx';
import React from 'react';
import { twMerge } from 'tailwind-merge';

import type { ClassValue } from 'clsx';

/**
 * Combines class names using `clsx` and merges Tailwind CSS classes using `twMerge`.
 * This function is useful for conditionally joining class names together and ensuring
 * that Tailwind utility classes are merged correctly, avoiding duplicate or conflicting classes.
 *
 * @param classes - Class names to combine. Can include strings, arrays, or objects.
 * @returns The combined class string with Tailwind classes merged.
 */
const cn = (...classes: ClassValue[]): string => twMerge(clsx(...classes));

function isNotNull<T>(value: T | null): value is T {
  return value !== null;
}

export { cn, isNotNull };
