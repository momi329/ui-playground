import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Merge Tailwind ClassNames
export type { ClassValue } from "clsx";
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
