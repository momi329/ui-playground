/* eslint-disable react/display-name */
import * as BaseSelect from "@radix-ui/react-select";

import { forwardRef } from "react";
import { cn } from "../helper";

type SelectRootProps = React.ComponentPropsWithoutRef<typeof BaseSelect.Root>;

const whenOpenChange = (open: boolean) => {
  // issue: https://github.com/radix-ui/primitives/issues/1925
  // (暫時解)修正原生 radix-ui select 設計模式: 點擊開啟下拉選單時, 以光箱形式呈現選單, 會移除 scrollbar, 造成非專案範圍內的元件 (e.g. header) 橫移
  if (open) {
    document.body.style.setProperty("overflow-y", "visible", "important");
    document.body.style.setProperty("margin-right", "0", "important");
  } else {
    document.body.style.removeProperty("overflow-y");
    document.body.style.removeProperty("margin-right");
  }
};

function SelectRoot(props: SelectRootProps) {
  return <BaseSelect.Root onOpenChange={whenOpenChange} {...props} />;
}

const SelectGroup = BaseSelect.Group;
const SelectValue = BaseSelect.Value;

type SelectTriggerProps = React.ComponentPropsWithoutRef<
  typeof BaseSelect.Trigger
> & {
  hasBorder?: boolean;
  color?: "red" | "white";
};
type SelectRootElement = React.ElementRef<typeof BaseSelect.Trigger>;
const selectTriggerBaseStyles =
  "p-1 flex w-22 h-6 items-center justify-between rounded  focus:outline-none";
const selectTriggerBorderStyles = "border border-stone-400 ";
const selectTriggerColorStyles = {
  red: "bg-red-500 text-white-500",
  white: "bg-white-500 text-black-500",
};
const SelectTrigger = forwardRef<SelectRootElement, SelectTriggerProps>(
  (
    { className, children, hasBorder = true, color = "white", ...props },
    ref
  ) => {
    const SelectTriggerStyle = `${selectTriggerBaseStyles} ${
      hasBorder && selectTriggerBorderStyles
    } ${selectTriggerColorStyles[color]}`;
    return (
      <BaseSelect.Trigger
        ref={ref}
        {...props}
        className={cn(SelectTriggerStyle, className)}
      >
        {children}
      </BaseSelect.Trigger>
    );
  }
);

type SelectContentProps = React.ComponentPropsWithoutRef<
  typeof BaseSelect.SelectContent
> & {
  position?: string;
};
type SelectContentElement = React.ElementRef<typeof BaseSelect.SelectContent>;
const selectContentBaseStyles =
  "relative z-50 max-h-40 w-22 overflow-hidden border border-stone-400 text-center rounded shadow";
const selectContentViewportBaseStyles = " w-full ";

const SelectContent = forwardRef<SelectContentElement, SelectContentProps>(
  ({ children, className, position = "popper", ...props }, ref) => (
    <BaseSelect.Portal>
      <BaseSelect.Content
        ref={ref}
        className={cn(`${selectContentBaseStyles}`, className)}
        position={position}
        {...props}
      >
        <BaseSelect.Viewport
          className={cn(
            position === "popper" && `${selectContentViewportBaseStyles}`,
            className
          )}
        >
          {children}
        </BaseSelect.Viewport>
      </BaseSelect.Content>
    </BaseSelect.Portal>
  )
);

type SelectLabelProps = React.ComponentPropsWithoutRef<
  typeof BaseSelect.Label
> & {
  icon?: React.ReactNode;
};
type SelectLabelElement = React.ElementRef<typeof BaseSelect.Label>;
const selectLabelBaseStyles = "text-sm font-semibold text-slate-400";
const SelectLabel = forwardRef<SelectLabelElement, SelectLabelProps>(
  ({ className, children, ...props }, ref) => (
    <BaseSelect.Label
      ref={ref}
      className={cn(`${selectLabelBaseStyles}`, className)}
      {...props}
    >
      {children}
    </BaseSelect.Label>
  )
);

type SelectItemProps = React.ComponentPropsWithoutRef<
  typeof BaseSelect.Item
> & {
  icon?: React.ReactNode;
};
type SelectItemElement = React.ElementRef<typeof BaseSelect.Item>;
const selectItemBaseStyles =
  "relative cursor-pointer text-sm flex w-full outline-none hover:bg-neutral-400 hover:text-black-500 rounded p-2 items-center h-6 w-auto justify-start";
const SelectItem = forwardRef<SelectItemElement, SelectItemProps>(
  ({ className, children, ...props }, ref) => (
    <BaseSelect.Item
      ref={ref}
      className={cn(`${selectItemBaseStyles}`, className)}
      {...props}
    >
      <BaseSelect.ItemText>{children}</BaseSelect.ItemText>
    </BaseSelect.Item>
  )
);

type SelectSeparatorProps = React.ComponentPropsWithoutRef<
  typeof BaseSelect.Separator
> & {
  icon?: React.ReactNode;
};
type SelectSeparatorElement = React.ElementRef<typeof BaseSelect.Separator>;
const selectSeparatorBaseStyles = "-mx-1 my-1 h-px bg-muted";
const SelectSeparator = forwardRef<
  SelectSeparatorElement,
  SelectSeparatorProps
>(({ className, ...props }, ref) => (
  <BaseSelect.Separator
    ref={ref}
    className={cn(`${selectSeparatorBaseStyles}`, className)}
    {...props}
  />
));

const Select = {
  Root: SelectRoot,
  Group: SelectGroup,
  Value: SelectValue,
  Trigger: SelectTrigger,
  Content: SelectContent,
  Label: SelectLabel,
  Item: SelectItem,
  Separator: SelectSeparator,
};

export {
  Select,
  SelectRoot,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
};
