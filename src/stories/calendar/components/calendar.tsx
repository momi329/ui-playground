/* eslint-disable react/display-name */
import { ReactElement, forwardRef, useCallback } from "react";

import { cn } from "../../helper";
import { Select } from "../../select";
import { weekChn } from "../constants/constants";

// ========================================================================
//                               Calendar Day
// ========================================================================

type CalendarDayElement = React.ElementRef<"div">;
type CalendarDayProps = React.ComponentPropsWithoutRef<"div">;

const CalendarDay = forwardRef<CalendarDayElement, CalendarDayProps>(
  ({ children, className, ...props }, ref) => {
    const baseStyle =
      "group grow body-regular cursor-pointer desktop:size-9 laptop:size-9 desktop:min-size-9  laptop:min-size-9 min-size-[45px] w-[14%] text-center  h-[45px] flex items-center  justify-center rounded-full relative";

    return (
      <div
        role="cell"
        className={cn(baseStyle, className)}
        {...props}
        ref={ref}
      >
        {children}
      </div>
    );
  }
);

type CalendarDayHoverBgElement = React.ElementRef<"span">;
type CalendarDayHoverBgProps = React.ComponentPropsWithoutRef<"span">;
const CalendarDayHoverBg = forwardRef<
  CalendarDayHoverBgElement,
  CalendarDayHoverBgProps
>(({ className, ...props }, ref) => (
  <span
    className={cn(
      "size-full absolute group-hover:bg-primary-300/50  group-hover:desktop:size-9 group-hover:laptop:size-9 group-hover:size-[45px] group-hover:z-[-1] group-hover:absolute group-hover:rounded-full",
      className
    )}
    ref={ref}
    {...props}
  />
));
// ========================================================================
//                                 Chevron
// ========================================================================

type ChevronDownBoldIconProps = React.ComponentPropsWithoutRef<"svg"> & {
  size?: number;
};
export const ChevronDownBoldIcon = forwardRef<
  SVGSVGElement,
  ChevronDownBoldIconProps
>(({ color = "currentColor", size = 16, ...props }, forwardedRef) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
    ref={forwardedRef}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.99789 8.79678L4.42228 5.22L3.22 6.42189L7.39675 10.6C7.72872 10.9321 8.26706 10.9321 8.59903 10.6L12.7758 6.42189L11.5735 5.22L7.99789 8.79678Z"
      fill={color}
    />
  </svg>
));

// ========================================================================
//                                 Chevron
// ========================================================================

type CalendarChevronProps = React.ComponentPropsWithoutRef<"svg"> & {
  size?: number;
};
const CalendarChevron = forwardRef<SVGSVGElement, CalendarChevronProps>(
  ({ className, size = 20, ...props }, ref) => {
    const defaultStyle = "cursor-pointer inline";
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        ref={ref}
        {...props}
        className={cn(defaultStyle, className)}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.20322 7.99789L10.78 4.42228L9.57811 3.22L5.4 7.39675C5.06792 7.72872 5.06792 8.26706 5.4 8.59903L9.57811 12.7758L10.78 11.5735L7.20322 7.99789Z"
        />
      </svg>
    );
  }
);

// ========================================================================
//                                WeekDay
// ========================================================================

type CalendarWeekdayElement = React.ElementRef<"div">;
type CalendarWeekdayProps = React.ComponentPropsWithoutRef<"div"> & {
  weekdays?: [string, string, string, string, string, string, string];
};

const CalendarWeekday = forwardRef<
  CalendarWeekdayElement,
  CalendarWeekdayProps
>(({ className, weekdays = weekChn, ...props }, ref) => {
  const baseStyle =
    "border-b border-b-slate-500 min-w-10 w-[14%] text-center text-sm text-slate-300 grow pb-1 justify-between";
  return (
    <>
      {weekdays.map((weekday) => (
        <div
          key={weekday}
          className={cn(baseStyle, className)}
          {...props}
          ref={ref}
        >
          {weekday}
        </div>
      ))}
    </>
  );
});

// ========================================================================
//                       Calendar Header Chooser
// ========================================================================

type CalendarHeaderElement = React.ElementRef<"div">;
type CalendarHeaderProps = React.ComponentPropsWithoutRef<"div"> & {
  className?: string;
};
const CalendarHeader = forwardRef<CalendarHeaderElement, CalendarHeaderProps>(
  ({ children, className, ...props }, ref) => {
    const baseHeaderStyle =
      "w-full flex flex-row w-full items-center justify-between h-6 px-10";
    return (
      <div className={cn(baseHeaderStyle, className)} {...props} ref={ref}>
        {children}
      </div>
    );
  }
);

// ========================================================================
//                       Calendar Header Chooser
// ========================================================================

type CalendarHeaderChooserProps = React.ComponentPropsWithoutRef<"div"> & {
  placeholder: string;
  icon?: ReactElement;
  selectItems: string[];
  disabled: boolean;
  onValueChange: (value: number) => void;
  value: string;
  type: "month" | "year";
};

function CalendarHeaderChooser({
  className,
  type,
  placeholder,
  icon = <ChevronDownBoldIcon color="#222" />,
  selectItems,
  disabled,
  value,
  onValueChange,
}: CalendarHeaderChooserProps) {
  const handleChange = useCallback((val: string) => {
    onValueChange(Number(val));
  }, []);
  console.log({ type, value, selectItems });
  return (
    <div data-type={type}>
      <Select.Root
        onValueChange={handleChange}
        disabled={disabled}
        value={value}
      >
        <Select.Trigger
          data-state="open"
          className={cn(
            "h-7 pl-3 py-1 min-w-[calc(100%+10px)] bg-transparent text-primary-300 flex gap-1 border-opacity-30 select-trigger",
            { disabled: "border-0" },
            className
          )}
        >
          <Select.Value placeholder={placeholder} />
          {!disabled && icon}
        </Select.Trigger>
        <Select.Content className="relative flex flex-row items-center w-full h-fit select-content border-opacity-30">
          <Select.Group className="w-full h-40  select-group ">
            {selectItems.map((item, i) => (
              <Select.Item
                value={type === "month" ? `${i}` : item}
                key={item}
                className="rounded-none p-5 w-full bg-primary-700 bg-opacity-50 text-white-500 hover:bg-primary-700 hover:bg-opacity-50"
              >
                {item}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </div>
  );
}

const Calendar = {
  Header: CalendarHeader,
  HeaderChooser: CalendarHeaderChooser,
  Weekday: CalendarWeekday,
  Chevron: CalendarChevron,
  BoldChevron: ChevronDownBoldIcon,
  Day: CalendarDay,
  DayHover: CalendarDayHoverBg,
};

export {
  Calendar,
  CalendarChevron,
  CalendarDay,
  CalendarDayHoverBg,
  CalendarHeader,
  CalendarHeaderChooser,
  CalendarWeekday,
};
