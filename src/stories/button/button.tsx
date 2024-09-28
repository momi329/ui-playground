/* eslint-disable react/display-name */
"use client";

import { forwardRef } from "react";

import { cn } from "../helper";
import { BaseButton } from "./baseButton";

type Color = "red" | "slate" | "stone" | "black" | "blue" | "orange";
type Size = "xs" | "sm" | "md" | "lg" | "xl";
type Variant = "fill" | "outline" | "ghost";
type Radius = "default" | "full";

type ButtonElement = React.ElementRef<typeof BaseButton>;
type ButtonProps = React.ComponentPropsWithoutRef<typeof BaseButton> & {
  color?: Color | "red";
  size?: Size | "sm";
  variant?: Variant | "fill";
  radius?: Radius | "default";
};

const buttonBaseStyle = "inline-flex items-center justify-center";

const buttonSizeStyles = {
  xs: "h-7 py-2 px-3",
  sm: "h-8 py-3 px-2",
  md: "h-9 py-3 px-7",
  lg: "h-10 py-3 px-7 ",
  xl: "h-11 py-4 px-7",
};

const buttonColorStyles = {
  red: {
    fill: "bg-red-500 text-white-500 enabled:hover:bg-red-400 enabled:active:bg-red-600 disabled:bg-stone-300 disabled:text-slate-200 disabled:pointer-events-none",
    outline:
      "bg-white-500 border border-red-500 text-red-500 enabled:hover:bg-red-500 enabled:hover:text-white-500 enabled:active:bg-red-600 enabled:active:text-white-500 disabled:border-stone-300 disabled:text-slate-200 disabled:pointer-events-none",
    ghost:
      "bg-transparent text-red-500 enabled:hover:bg-red-400 enabled:active:bg-red-500 enabled:active:text-white-500",
  },
  slate: {
    fill: "bg-slate-500 text-white-500 enabled:hover:bg-slate-400 enabled:active:bg-slate-600 disabled:bg-stone-300 disabled:text-slate-200 disabled:pointer-events-none",
    outline:
      "bg-white-500 border border-slate-500 text-slate-500 enabled:hover:bg-slate-400 enabled:hover:text-white-500 enabled:active:bg-slate-500 enabled:active:text-white-500 disabled:border-stone-300 disabled:text-slate-200 disabled:pointer-events-none",
    ghost:
      "bg-transparent text-slate-500 enabled:hover:bg-slate-400 enabled:active:bg-slate-500 enabled:active:text-white-500",
  },
  stone: {
    fill: "bg-stone-400 text-white-500 enabled:hover:bg-slate-400 enabled:active:bg-slate-600 disabled:bg-stone-300 disabled:text-slate-200 disabled:pointer-events-none",
    outline:
      "bg-white-500 border border-stone-400 text-slate-500 enabled:hover:bg-neutral-400 enabled:active:bg-stone-300 disabled:bg-stone-300 disabled:border-stone-400 disabled:text-slate-200 disabled:pointer-events-none",
    ghost:
      "bg-transparent text-slate-500 enabled:hover:bg-slate-400 enabled:active:bg-slate-500 enabled:active:text-white-500",
  },
  black: {
    fill: "bg-black-500 text-white-500 enabled:hover:bg-black-400 enabled:active:bg-black-600 disabled:bg-stone-300 disabled:text-slate-200 disabled:pointer-events-none",
    outline:
      "bg-white-500 border border-black-500 text-black-500 enabled:hover:bg-black-400 enabled:active:bg-black-500 enabled:active:text-white-500 disabled:border-stone-300 disabled:text-slate-200 disabled:pointer-events-none",
    ghost:
      "bg-transparent text-black-500 enabled:hover:bg-black-400 enabled:active:bg-black-500 enabled:active:text-white-500",
  },
  blue: {
    fill: "bg-blue-500 text-white-500 enabled:hover:bg-blue-400 enabled:active:bg-blue-600 disabled:bg-stone-300 disabled:text-slate-200 disabled:pointer-events-none",
    outline:
      "bg-white-500 border border-blue-500 text-blue-500 enabled:hover:bg-blue-400 enabled:hover:text-white-500 enabled:active:bg-blue-500 enabled:active:text-white-500 disabled:border-stone-300 disabled:text-slate-200 disabled:pointer-events-none",
    ghost:
      "bg-transparent text-blue-500 enabled:hover:bg-blue-400 enabled:active:bg-blue-500 enabled:active:text-white-500",
  },
  orange: {
    fill: "bg-orange-500 text-white-500 enabled:hover:bg-orange-400 enabled:active:bg-orange-600 disabled:bg-stone-300 disabled:text-slate-200 disabled:pointer-events-none",
    outline:
      "bg-white-500 border border-orange-500 text-orange-500 enabled:hover:bg-orange-400 enabled:hover:text-white-500 enabled:active:bg-orange-500 enabled:active:text-white-500 disabled:border-stone-300 disabled:text-slate-200 disabled:pointer-events-none",
    ghost:
      "bg-transparent text-orange-500 enabled:hover:bg-orange-400 enabled:active:bg-orange-500 enabled:active:text-white-500",
  },
};

const buttonRadiusStyle = {
  default: "rounded",
  full: "rounded-full",
};

const Button = forwardRef<ButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      color = "red",
      variant = "fill",
      radius = "default",
      size = "sm",
      ...props
    },
    ref
  ) => {
    const buttonStyles = `${buttonBaseStyle} ${buttonSizeStyles[size]} ${buttonColorStyles[color][variant]} ${buttonRadiusStyle[radius]}`;
    return (
      <BaseButton className={cn(buttonStyles, className)} ref={ref} {...props}>
        {children}
      </BaseButton>
    );
  }
);

export { Button };
