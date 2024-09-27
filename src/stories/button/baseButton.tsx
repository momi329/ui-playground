/* eslint-disable react/display-name */
"use client";

import { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";

type ButtonElement = React.ElementRef<"button">;
type ButtonProps = React.ComponentPropsWithoutRef<"button"> & {
  asChild?: boolean;
};

const BaseButton = forwardRef<ButtonElement, ButtonProps>(
  ({ asChild = false, children, className, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={className} ref={ref} {...props}>
        {children}
      </Comp>
    );
  }
);

export { BaseButton };
