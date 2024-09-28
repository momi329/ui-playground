import { Dispatch, SetStateAction } from "react";
import { cn } from "../../helper";

import { RangeProvider } from "../provider/range-provider";
import {
  RangeCalendarValue,
  RangeDayColorType,
  RangePosition,
} from "../types/types";

type CalendarProps = React.ComponentPropsWithoutRef<"div"> & {
  value: RangeCalendarValue;
  onValueChange: (val: RangeCalendarValue) => void;
  changingPosition: RangePosition;
  dayColor?: RangeDayColorType;
  setChangingPosition?: Dispatch<SetStateAction<RangePosition>>;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

function RangeCalendarRoot(props: CalendarProps) {
  const {
    dayColor,
    children,
    value,
    onValueChange,
    changingPosition,
    setChangingPosition,
    open,
    setOpen,
    className,
  } = props;

  function getPosition() {
    if (changingPosition) return changingPosition;
    if (value.start && !value.end) return "end";
    return "start";
  }

  function handleSelect(day: Date) {
    const updated = { ...value };
    const position = getPosition();
    if (position === "start") updated.start = day;
    if (position === "end") updated.end = day;
    onValueChange(updated);
  }

  const DAY_COLOR = {
    idle: "text-slate-200",
    active: `text-white-500`,
    disabled: "text-slate-500",
    isRangeStart: `rounded-none text-white-500`,
    isRangeBefore:
      "bg-primary-700 bg-opacity-25 z-[-3] absolute w-1/2 h-full bg-opacity-25 ",
    isRangeAfter:
      "bg-primary-700 desktop:size-10 laptop:size-10  size-[45px] rounded-full absolute z-[-2]",
    isRangeEnd: `rounded-none text-white-500 `,
    isRange: `bg-primary-700 bg-opacity-25 rounded-none `,
  };

  const RangeProviderValue = {
    value,
    onValueChange,
    handleSelect,
    curPosition: getPosition(),
    dayColor: dayColor ?? DAY_COLOR,
    changingPosition,
    setChangingPosition,
    open,
    setOpen,
  };

  return (
    <RangeProvider value={RangeProviderValue}>
      <div className={cn(className, "flex-row gap-2")}>{children}</div>
    </RangeProvider>
  );
}

export { RangeCalendarRoot };
