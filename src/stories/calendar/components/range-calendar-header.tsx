import { cn } from "../../helper";
import { useConfigContext } from "../provider/config-provider";
import { CalendarChevron, CalendarHeader } from "./calendar";

type RangeCalendarHeaderProps = {
  direction: "left" | "right";
  curMonth: Date;
  handleSwitch: (direction: "left" | "right", isDisabled: boolean) => void;
};

// 有PC版與M版的header 此component放在 RangeCalendarItem中

export function RangeCalendarHeader({
  direction,
  curMonth,
  handleSwitch,
}: RangeCalendarHeaderProps) {
  const { minDate, maxDate } = useConfigContext();
  const isDisabledMin = curMonth.getTime() < (minDate as Date).getTime();
  const isDisabledMax = curMonth.getTime() > (maxDate as Date).getTime() - 1;

  return (
    <CalendarHeader className="p-1 min-h-8 relative">
      {direction === "left" && (
        <CalendarChevron
          className={cn(
            isDisabledMin ? "[&>*]:fill-stone-400" : "[&>*]:fill-primary-500",
            "absolute left-8 top-[calc(50%-11px)] size-5"
          )}
          onClick={() => handleSwitch(direction, isDisabledMin)}
        />
      )}

      <div className="m-auto">
        <span>{curMonth.getFullYear()} 年</span>
        <span>{curMonth.getMonth() + 1} 月</span>
      </div>
      {direction === "right" && (
        <CalendarChevron
          className={cn(
            isDisabledMax ? "[&>*]:fill-stone-400" : "[&>*]:fill-primary-500",
            "rotate-180 absolute right-8 top-[calc(50%-11px)] size-5"
          )}
          onClick={() => handleSwitch(direction, isDisabledMax)}
        />
      )}
    </CalendarHeader>
  );
}

export function RangeCalendarMHeader({ curMonth }: { curMonth: Date }) {
  return (
    <CalendarHeader className="p-1 min-h-8  border-b border-b-slate-500 sticky top-0 bg-black z-10">
      <div className="m-auto h5-regular text-slate-300 flex items-center">
        <span>{curMonth.getFullYear()} 年 </span>
        <span>{curMonth.getMonth() + 1} 月 </span>
        <CalendarChevron className="[&>*]:fill-slate-400 rotate-[270deg]" />
      </div>
    </CalendarHeader>
  );
}
