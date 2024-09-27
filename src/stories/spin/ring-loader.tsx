/* eslint-disable react/display-name */
"use client";

import { forwardRef } from "react";
import { cn } from "../helper/cn";

type Size = "sm" | "md" | "lg";
type Color =
  | "red"
  | "black"
  | "blue"
  | "orange"
  | "stone"
  | "neutral"
  | "white"
  | "slate";
type DotElement = React.ElementRef<"div">;
type DotProps = React.ComponentPropsWithoutRef<"div"> & {
  size?: Size | "md";
  color?: Color | "red";
};

const ringLoaderSizeStyles = {
  sm: "w-4 h-4",
  md: "w-7 h-7",
  lg: "w-10 h-10",
};
const ringLoaderColorStyles = {
  red: "border-red-500/[0.2] border-t-red-500 border-b-red-500",
  black: "border-black-500/[0.2] border-t-black-500 border-b-black-500",
  blue: "border-blue-500/[0.2] border-t-blue-500 border-b-blue-500",
  orange: "border-orange-500/[0.2] border-t-orange-500 border-b-orange-500",
  stone: "border-stone-500/[0.2] border-t-stone-500 border-b-stone-500",
  neutral: "border-neutral-500/[0.2] border-t-neutral-500 border-b-neutral-500",
  white: "border-white-500/[0.2] border-t-white-500 border-b-white-500",
  slate: "border-slate-500/[0.2] border-t-slate-500 border-b-slate-500",
};
const baseStyle = "border-[2px]  rounded-full animate-spin";

const RingLoader = forwardRef<DotElement, DotProps>(
  ({ size = "md", color = "red", className, ...props }, ref) => {
    const ringSize = ringLoaderSizeStyles[size];
    const ringColor = ringLoaderColorStyles[color];
    const ringStyle = `${baseStyle} ${ringSize} ${ringColor}`;
    return <div className={cn(ringStyle, className)} ref={ref} {...props} />;
  }
);

export { RingLoader };
