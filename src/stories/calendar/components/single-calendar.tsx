import { ReactNode, useState } from "react";
import { cn } from "../../helper";

import { MONTHS } from "../constants/constants";
import { useConfigContext } from "../provider/config-provider";
import {
  SingleContextType,
  SingleProvider,
  useSingleContext,
} from "../provider/single-provider";
import { SingleCalendarValue, SingleDayColorType } from "../types/types";
import { generateYearsArray, getMonthDays } from "../utils/utils";
import {
  CalendarChevron,
  CalendarDay,
  CalendarHeader,
  CalendarHeaderChooser,
  CalendarWeekday,
  ChevronDownBoldIcon,
} from "./calendar";

function SingleHeader() {
  const { minDate, maxDate } = useConfigContext();
  const { curMonth, setCurMonth } = useSingleContext();

  const year = curMonth.getFullYear();
  const years = generateYearsArray(
    (minDate as Date).getFullYear(),
    (maxDate as Date).getFullYear()
  );

  function handleYearChange(value: number) {
    setCurMonth((prev) => new Date(value, prev.getMonth(), 1));
  }

  function handleMonthChange(value: number) {
    setCurMonth((prev) => new Date(prev.getFullYear(), value, 1));
  }

  const handleSwitch = (method: "plus" | "minus", isDisabled: boolean) => {
    if (isDisabled) return;
    const newMonth =
      method === "plus" ? curMonth.getMonth() + 1 : curMonth.getMonth() - 1;
    const nextDate = new Date(year, newMonth, 1);
    if (nextDate.getFullYear() < (minDate as Date).getFullYear()) return;
    setCurMonth(nextDate);
  };

  const isDisabledMin =
    curMonth.getFullYear() === (minDate as Date).getFullYear() &&
    curMonth.getMonth() <= (minDate as Date).getMonth();
  const isDisabledMax =
    curMonth.getFullYear() === (maxDate as Date).getFullYear() &&
    curMonth.getMonth() >= (maxDate as Date).getMonth();

  return (
    <CalendarHeader className="h-10 pt-2 px-10">
      <CalendarChevron
        className={
          isDisabledMin ? "[&>*]:fill-stone-400" : "[&>*]:fill-primary-500"
        }
        onClick={() => handleSwitch("minus", isDisabledMin)}
        aria-label="previous month"
      />

      <div className=" w-fit flex flex-row gap-2 justify-center">
        {/* chooser for year */}
        <CalendarHeaderChooser
          disabled={false}
          selectItems={years}
          type="year"
          value={curMonth.getFullYear().toString()}
          placeholder={curMonth.getFullYear().toString()}
          icon={<ChevronDownBoldIcon color="#ED64A6" />}
          onValueChange={(value) => {
            handleYearChange(value);
          }}
          className="min-w-[100px]"
        />
        {/* chooser for month */}
        <CalendarHeaderChooser
          disabled={false}
          selectItems={MONTHS}
          type="month"
          value={curMonth.getMonth().toString()}
          placeholder={curMonth.getMonth().toString()}
          icon={<ChevronDownBoldIcon color="#ED64A6" />}
          onValueChange={(value) => {
            handleMonthChange(value);
          }}
          className="min-w-[60px]"
        />
      </div>
      <CalendarChevron
        className={cn(
          isDisabledMax ? "[&>*]:fill-stone-400" : "[&>*]:fill-primary-500",
          "rotate-180"
        )}
        onClick={() => handleSwitch("plus", isDisabledMax)}
        aria-label="next month"
      />
    </CalendarHeader>
  );
}
type SingleCalendarComponentProps = React.ComponentPropsWithoutRef<"div">;

function SingleCalendarComponent({
  className,
  ...props
}: SingleCalendarComponentProps) {
  const {
    minDate = new Date(2020, 1, 10),
    maxDate = new Date(),
    weekdays,
    selectText,
    dayColor,
  } = useConfigContext();

  const { value, curMonth, handleSelect } = useSingleContext();

  const DAY_COLOR = (dayColor as SingleDayColorType) || {
    idle: "text-slate-200",
    active: "text-white-500",
    activeBefore: "bg-primary-700/50  absolute z-[-1] size-10 rounded-full",
    disabled: "text-slate-500",
  };

  const year = curMonth.getFullYear();
  const month = curMonth.getMonth();
  const days = getMonthDays(year, month);

  return (
    <div
      className={cn(
        "desktop:w-[284px] laptop:w-[284px] min-w-[284px] w-full border rounded border-slate-500",
        className
      )}
      {...props}
    >
      <SingleHeader />
      <div className="pt-1 flex flex-wrap flex-row w-full justify-between ">
        <CalendarWeekday weekdays={weekdays} className="pb-1" />
        <div role="grid" className="flex flex-wrap flex-row w-full h-fit">
          {days.map((day) => {
            const key = day.toDateString();
            const date = day?.getDate();
            const dateLabel = `${year}/${month + 1}/${date}`;
            if (day && (day < minDate || day > maxDate)) {
              return (
                <CalendarDay
                  {...(date && { "aria-label": dateLabel })}
                  key={key}
                  className={DAY_COLOR.disabled}
                >
                  {date}
                </CalendarDay>
              );
            }
            if (day && day.getTime() === value?.getTime()) {
              return (
                <CalendarDay
                  key={key}
                  className={`${DAY_COLOR.active} flex flex-col items-center justify-center`}
                  onClick={() => handleSelect(day)}
                  aria-selected="true"
                  {...(date && { "aria-label": dateLabel })}
                >
                  <span className={DAY_COLOR.activeBefore} />
                  <span className={selectText && "h-5"}>{date}</span>
                  {selectText && (
                    <span className="w-full text-xs">{selectText}</span>
                  )}
                </CalendarDay>
              );
            }

            return (
              <CalendarDay
                key={key}
                className={DAY_COLOR.idle}
                onClick={() => day.getMonth() === month && handleSelect(day)}
                {...(date && { "aria-label": dateLabel })}
              >
                {day.getMonth() === month && date}
              </CalendarDay>
            );
          })}
        </div>
      </div>
    </div>
  );
}

type SingleCalendarProps = {
  value: SingleCalendarValue;
  onChange: (val: Date) => void;
  children: ReactNode;
};

function SingleCalendarRoot(props: SingleCalendarProps) {
  const { children, value, onChange } = props;
  const { defaultMonth } = useConfigContext();

  const [curMonth, setCurMonth] = useState<Date>(defaultMonth ?? new Date());
  function handleSelect(day: SingleCalendarValue) {
    if (!day) return;
    onChange(day);
  }
  const singleContext = {
    value,
    onValueChange: onChange,
    curMonth,
    setCurMonth,
    handleSelect,
  };

  return (
    <SingleProvider value={singleContext as SingleContextType}>
      {children}
    </SingleProvider>
  );
}

export { SingleCalendarComponent, SingleCalendarRoot, SingleHeader };
