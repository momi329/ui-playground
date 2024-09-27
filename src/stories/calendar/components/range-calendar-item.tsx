/* eslint-disable react/display-name */
import { forwardRef, ReactNode } from "react";
import { CalendarDay, CalendarDayHoverBg } from "../calendar";
import { useConfigContext } from "../provider/config-provider";

import { getMonthDays } from "../utils/utils";
import { cn } from "../../helper";

import { useRangeContext } from "../provider/range-provider";

type RangeCalendarItemElement = React.ElementRef<"div">;

type RangeCalendarComponentProps = React.ComponentPropsWithoutRef<"div"> & {
  header?: ReactNode;
  curMonth: Date;
};

export const RangeCalendarItem = forwardRef<
  RangeCalendarItemElement,
  RangeCalendarComponentProps
>(({ curMonth, header, className }, ref) => {
  const { minDate, maxDate, startText, endText } = useConfigContext();
  const { dayColor, value, handleSelect, curPosition } = useRangeContext();
  const year = curMonth.getFullYear();
  const month = curMonth.getMonth();
  const days = getMonthDays(year, month);

  return (
    <div
      data-month={`${year}-${month}`}
      className={cn(
        "min-w-[284px]  w-full  border-stone-300 rounded border",
        className
      )}
      ref={ref}
    >
      <div className="pt-1 flex flex-wrap flex-row w-full justify-between ">
        {/* header放的區域 */}
        {header}
        {/* day */}
        <div className="flex flex-wrap flex-row w-full justify-between  desktop:min-w-8 laptop:min-w-8 min-w-[45px]">
          {days.map((day) => {
            const key = day.toDateString();
            const date = day?.getDate();
            const isCurMonth =
              day.getFullYear() === year && day.getMonth() === month;
            const isValid = day && day > minDate && day < maxDate;
            const isBeforeStart =
              isCurMonth && value.start && day < value.start;
            const isAfterEnd = value.end && day > value.end;
            const isStart =
              isCurMonth && day && day.getTime() === value.start?.getTime();
            const isEnd =
              isCurMonth && day && day.getTime() === value.end?.getTime();
            const isSelectDone = value.end && value.start;
            const isTheSameDay =
              value.start?.getTime() === value.end?.getTime() && isStart;
            if (
              isCurMonth &&
              (!isValid ||
                (!isSelectDone && curPosition !== "start" && isBeforeStart) ||
                (!isSelectDone && curPosition !== "end" && isAfterEnd) ||
                (isSelectDone && curPosition === "end" && isBeforeStart))
            ) {
              // out of range
              return (
                <CalendarDay key={key} className={dayColor.disabled}>
                  {date}
                </CalendarDay>
              );
            }

            if (isStart) {
              return (
                <CalendarDay
                  key={key}
                  className={`${dayColor.isRangeStart} flex flex-col justify-center `}
                  onClick={() => handleSelect(day)}
                >
                  {value.end && !isTheSameDay && (
                    <span
                      className={cn(
                        `${dayColor.isRangeBefore} left-1/2`,
                        "isRangeBefore"
                      )}
                    />
                  )}
                  <span className={startText && "h-[16px]"}>{date}</span>
                  {startText && (
                    <span className="w-full text-xs mt-1">{startText}</span>
                  )}
                  <span className={dayColor.isRangeAfter} />
                </CalendarDay>
              );
            }

            if (isEnd) {
              return (
                <CalendarDay
                  key={key}
                  className={`${dayColor.isRangeEnd} flex flex-col justify-center `}
                  onClick={() => handleSelect(day)}
                >
                  {value.start && !isTheSameDay && (
                    <span
                      className={cn(
                        `${dayColor.isRangeBefore}  right-1/2`,
                        "isRangeBefore"
                      )}
                    />
                  )}
                  <span className={endText && "h-[16px]"}>{date}</span>
                  {endText && (
                    <span className="w-full text-xs mt-1">{endText}</span>
                  )}
                  <span
                    className={cn(dayColor.isRangeAfter, " isRangeAfter")}
                  />
                </CalendarDay>
              );
            }

            if (day && day > value.start && day < value.end) {
              // in range
              return (
                <CalendarDay
                  key={key}
                  className={dayColor.isRange}
                  onClick={() => handleSelect(day)}
                >
                  {date}
                  <CalendarDayHoverBg />
                </CalendarDay>
              );
            }

            return (
              <CalendarDay
                key={key}
                className={dayColor.idle}
                onClick={() => isCurMonth && handleSelect(day)}
              >
                {isCurMonth && date}
                {isCurMonth && <CalendarDayHoverBg />}
              </CalendarDay>
            );
          })}
        </div>
      </div>
    </div>
  );
});
