/* eslint-disable react/display-name */
"use client";

import * as DrawerPrimitive from "@radix-ui/react-dialog";
import { forwardRef } from "react";
import { cn } from "../helper";

type DrawerRootProps = React.ComponentPropsWithoutRef<
  typeof DrawerPrimitive.Root
>;
function DrawerRoot(props: DrawerRootProps) {
  return <DrawerPrimitive.Root {...props} />;
}

type DrawerTriggerElement = React.ElementRef<typeof DrawerPrimitive.Trigger>;
type DrawerTriggerProps = React.ComponentPropsWithoutRef<
  typeof DrawerPrimitive.Trigger
>;
const DrawerTrigger = forwardRef<DrawerTriggerElement, DrawerTriggerProps>(
  ({ ...props }, ref) => <DrawerPrimitive.Trigger {...props} ref={ref} />
);

type DrawerPortalProps = React.ComponentPropsWithoutRef<
  typeof DrawerPrimitive.Portal
>;
function DrawerPortal(props: DrawerPortalProps) {
  return <DrawerPrimitive.Portal {...props} />;
}

type Color = "transparent" | "black" | "slate";
type DrawerOverlayElement = React.ElementRef<typeof DrawerPrimitive.Overlay>;
type DrawerOverlayProps = React.ComponentPropsWithoutRef<
  typeof DrawerPrimitive.Overlay
> & {
  color?: Color | "black";
};

const drawerOverlayBaseStyles = "fixed inset-0";
const drawerOverlayColorStyles = {
  transparent: "bg-transparent",
  black: "bg-black-500/[0.2]",
  slate: "bg-slate-500",
};
const DrawerOverlay = forwardRef<DrawerOverlayElement, DrawerOverlayProps>(
  ({ className, color = "black", ...props }, ref) => {
    const drawerOverlayStyles = `${drawerOverlayBaseStyles} ${drawerOverlayColorStyles[color]}`;
    return (
      <DrawerPrimitive.Overlay
        className={cn(drawerOverlayStyles, className)}
        {...props}
        ref={ref}
      />
    );
  }
);

type DrawerContentElement = React.ElementRef<typeof DrawerPrimitive.Content>;
type DrawerContentProps = React.ComponentPropsWithoutRef<
  typeof DrawerPrimitive.Content
> & {
  open?: boolean;
  slideDirection?: "left" | "right" | "top" | "bottom"; // 動畫方嚮
  slideWidth?: "full" | "half" | "three4th";
  duration?:
    | "100"
    | "200"
    | "300"
    | "400"
    | "500"
    | "600"
    | "700"
    | "800"
    | "900"
    | "1000";
};

const DrawerContent = forwardRef<DrawerContentElement, DrawerContentProps>(
  (
    {
      className,
      open,
      slideDirection = "right",
      slideWidth = "full",
      duration = "300",
      ...props
    },
    ref
  ) => {
    // 根據方向和開關狀態選擇動畫
    const animationStyle =
      slideDirection &&
      {
        right: open
          ? `animate-slideInRight${duration}`
          : `animate-slideOutRight${duration}`,
        left: open
          ? `animate-slideInLeft${duration}`
          : `animate-slideOutLeft${duration}`,
        top: open
          ? `animate-slideInTop${duration}`
          : `animate-slideOutTop${duration}`,
        bottom: open
          ? `animate-slideInBottom${duration}`
          : `animate-slideOutBottom${duration}`,
      }[slideDirection];

    const getWidthClass = (
      direction: DrawerContentProps["slideDirection"],
      width: DrawerContentProps["slideWidth"]
    ) => {
      const classes = {
        right: {
          full: "top-0 w-full right-0",
          half: "top-0 w-1/2 right-0",
          three4th: "top-0 w-3/4 right-0",
        },
        left: {
          full: "top-0 w-full left-0",
          half: "top-0 w-1/2 left-0",
          three4th: "top-0 w-3/4 left-0",
        },
        top: {
          full: "top-0 h-full left-0",
          half: "top-0 h-1/2 left-0",
          three4th: "top-0 h-3/4 left-0",
        },
        bottom: {
          full: "bottom-0 h-full left-0",
          half: "bottom-0 h-1/2 left-0",
          three4th: "bottom-0 h-3/4 left-0",
        },
      };
      return direction && width ? classes[direction]?.[width] : "";
    };

    const widthClass = getWidthClass(slideDirection, slideWidth);

    const DrawerContentStyle = cn(
      "bg-white fixed h-full w-full p-5 z-50",
      {
        [animationStyle]: true,
      },
      widthClass,
      className
    );

    return (
      <DrawerPrimitive.Content
        className={DrawerContentStyle}
        {...props}
        ref={ref}
      />
    );
  }
);

type DrawerCloseElement = React.ElementRef<typeof DrawerPrimitive.Close>;
type DrawerCloseProps = React.ComponentPropsWithoutRef<
  typeof DrawerPrimitive.Close
>;
const DrawerClose = forwardRef<DrawerCloseElement, DrawerCloseProps>(
  ({ ...props }, ref) => <DrawerPrimitive.Close {...props} ref={ref} />
);

type DrawerTitleElement = React.ElementRef<typeof DrawerPrimitive.Title>;
type DrawerTitleProps = React.ComponentPropsWithoutRef<
  typeof DrawerPrimitive.Title
>;
const DrawerTitle = forwardRef<DrawerTitleElement, DrawerTitleProps>(
  ({ ...props }, ref) => <DrawerPrimitive.Title {...props} ref={ref} />
);

type DrawerDescriptionElement = React.ElementRef<
  typeof DrawerPrimitive.Description
>;
type DrawerDescriptionProps = React.ComponentPropsWithoutRef<
  typeof DrawerPrimitive.Description
>;
const DrawerDescription = forwardRef<
  DrawerDescriptionElement,
  DrawerDescriptionProps
>(({ ...props }, ref) => <DrawerPrimitive.Description {...props} ref={ref} />);

const Drawer = {
  Root: DrawerRoot,
  Trigger: DrawerTrigger,
  Portal: DrawerPortal,
  Overlay: DrawerOverlay,
  Content: DrawerContent,
  Close: DrawerClose,
  Title: DrawerTitle,
  Description: DrawerDescription,
};

export {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerOverlay,
  DrawerPortal,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
};
