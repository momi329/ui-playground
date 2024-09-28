/* eslint-disable react/display-name */
import { forwardRef, ReactNode } from "react";
import { useConfigContext } from "../provider/config-provider";
import { CalendarDay, CalendarDayHoverBg } from "./calendar";

import { cn } from "../../helper";
import { getMonthDays } from "../utils/utils";

import { useRangeContext } from "../provider/range-provider";

type RangeCalendarItemElement = React.ElementRef<"div">;

type RangeCalendarComponentProps = React.ComponentPropsWithoutRef<"div"> & {
  header?: ReactNode;
  curMonth: Date;
  monthKey?: string;
};

export const RangeCalendarItem = forwardRef<
  RangeCalendarItemElement,
  RangeCalendarComponentProps
>(({ curMonth, header, className, monthKey }, ref) => {
  const { minDate, maxDate, startText, endText } = useConfigContext();
  const { dayColor, value, handleSelect, curPosition } = useRangeContext();
  const year = curMonth.getFullYear();
  const month = curMonth.getMonth();
  const days = getMonthDays(year, month);

  return (
    <div
      data-month={`${year}-${month}`}
      className={cn(
        "min-w-[284px]  w-full  border-slate-500 rounded border",
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
            const key = `${monthKey}-${day.toDateString()}`;
            //目前日期
            const date = day?.getDate();
            //是否是當前月份
            const isCurMonth =
              day.getFullYear() === year && day.getMonth() === month;
            //是否在有效日期內
            const isValid =
              day && minDate && maxDate && day > minDate && day < maxDate;
            //是否在開始日期之前
            const isBeforeStart =
              isCurMonth && value.start && day < value.start;
            //是否在結束日期之後
            const isAfterEnd = value.end && day > value.end;
            //是否是開始日期
            const isStart =
              isCurMonth && day && day.getTime() === value.start?.getTime();
            //是否是結束日期
            const isEnd =
              isCurMonth && day && day.getTime() === value.end?.getTime();
            //是否結束選取
            const isSelectDone = value.end && value.start;
            //是否是同一天
            const isTheSameDay =
              value.start?.getTime() === value.end?.getTime() && isStart;
            //是否在選取範圍內
            const isInRange =
              isCurMonth &&
              day &&
              value?.start &&
              value?.end &&
              day > value.start &&
              day < value.end;
            //是否超出範圍
            const outOfRange =
              isCurMonth &&
              (!isValid ||
                (!isSelectDone && curPosition !== "start" && isBeforeStart) ||
                (!isSelectDone && curPosition !== "end" && isAfterEnd) ||
                (isSelectDone && curPosition === "end" && isBeforeStart));

            if (outOfRange) {
              return (
                <CalendarDay key={key} className={dayColor?.disabled}>
                  {date}
                </CalendarDay>
              );
            }

            if (isStart) {
              return (
                <CalendarDay
                  key={key}
                  className={`${dayColor?.isRangeStart} flex flex-col justify-center `}
                  onClick={() => handleSelect && handleSelect(day)}
                >
                  {value.end && !isTheSameDay && (
                    <span
                      className={cn(
                        `${dayColor?.isRangeBefore} left-1/2`,
                        "isRangeBefore"
                      )}
                    />
                  )}
                  <span className={startText && "h-[16px]"}>{date}</span>
                  {startText && (
                    <span className="w-full text-xs mt-1">{startText}</span>
                  )}
                  <span className={dayColor?.isRangeAfter} />
                </CalendarDay>
              );
            }

            if (isEnd) {
              return (
                <CalendarDay
                  key={key}
                  className={`${dayColor?.isRangeEnd} flex flex-col justify-center `}
                  onClick={() => handleSelect && handleSelect(day)}
                >
                  {value.start && !isTheSameDay && (
                    <span
                      className={cn(
                        `${dayColor?.isRangeBefore}  right-1/2`,
                        "isRangeBefore"
                      )}
                    />
                  )}
                  <span className={endText && "h-[16px]"}>{date}</span>
                  {endText && (
                    <span className="w-full text-xs mt-1">{endText}</span>
                  )}
                  <span
                    className={cn(dayColor?.isRangeAfter, " isRangeAfter")}
                  />
                </CalendarDay>
              );
            }

            if (isInRange) {
              // in range
              return (
                <CalendarDay
                  key={key}
                  className={dayColor?.isRange || ""}
                  onClick={() => handleSelect && handleSelect(day)}
                >
                  {date}
                  <CalendarDayHoverBg />
                </CalendarDay>
              );
            }

            return (
              <CalendarDay
                key={key}
                className={dayColor?.idle || ""}
                onClick={() => isCurMonth && handleSelect && handleSelect(day)}
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
