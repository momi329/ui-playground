import { ComponentPropsWithoutRef, ReactNode, useEffect, useRef } from "react";
import { cn } from "../../helper";

import { Drawer } from "../../drawer/drawer";
import { useConfigContext } from "../provider/config-provider";
import { useRangeContext } from "../provider/range-provider";
import { getMonthRangeArray, transDateIntoString } from "../utils/utils";
import { CalendarChevron, CalendarWeekday } from "./calendar";
import { RangeCalendarMHeader } from "./range-calendar-header";
import { RangeCalendarItem } from "./range-calendar-item";

type RangeCalendarInputProps = ComponentPropsWithoutRef<"div">;

function RangeCalendarInput({ className, ...props }: RangeCalendarInputProps) {
  const { value, setChangingPosition } = useRangeContext();
  return (
    <div className={cn("", className)} {...props}>
      <div className=" flex flex-row gap-2 laptop:flex m-1 w-fit mb-3">
        <label className="relative">
          <span className="absolute top-[calc(50%-12px)] text-pink-300 left-2">
            START
          </span>
          <input
            type="text"
            className="bg-transparent w-[200px] h-8 border border-pink-300 rounded pl-16 text-pink-500"
            value={transDateIntoString(value.start || new Date())}
            onFocus={() => setChangingPosition("start")}
            readOnly
          />
        </label>
        <label className="relative">
          <span className="absolute top-[calc(50%-12px)] text-pink-300 left-2">
            END
          </span>
          <input
            type="text"
            className="bg-transparent w-[200px] h-8 border border-pink-300 rounded pl-16 text-pink-500"
            value={transDateIntoString(value.end || new Date())}
            onFocus={() => setChangingPosition("end")}
            readOnly
          />
        </label>
      </div>
    </div>
  );
}

type RangeCalendarMDrawerHeaderProps = ComponentPropsWithoutRef<"div">;

function RangeCalendarMDrawerHeader({
  className,
  ...props
}: RangeCalendarMDrawerHeaderProps) {
  const { value, changingPosition, setChangingPosition } = useRangeContext();

  return (
    <div
      className={cn(
        "pt-2 m-0 text-[17px] font-medium h-14 flex flex-row justify-center border-b border-slate-500",
        className
      )}
      {...props}
    >
      <button
        type="button"
        className={cn(
          "border-b-2 w-24 flex flex-col justify-center text-center box-border",
          {
            "border-b-[2px] border-b-primary-500":
              changingPosition && changingPosition === "start",
            "border-b-2 border-white-500":
              changingPosition && changingPosition === "end",
          }
        )}
        onClick={() => setChangingPosition("start")}
      >
        <div className="h5-regular text-slate-400 w-full">去程日期</div>
        <div className="text-primary-500 h4-regular pb-1 h-6 w-full">
          {value.start &&
            `${value.start.getMonth() + 1}月${value.start?.getDate()}日 `}
        </div>
      </button>

      <button
        type="button"
        className={cn(
          "border-b-2 w-24 flex flex-col justify-center text-center box-border",
          {
            "border-b-[2px] border-b-primary-500":
              changingPosition && changingPosition === "end",
            "border-b-2 border-white-500":
              changingPosition && changingPosition === "start",
          }
        )}
        onFocus={() => setChangingPosition("end")}
      >
        <div className="h5-regular text-slate-400 w-full">回程日期</div>
        <div className="text-primary-500 h4-regular pb-1  h-6 w-full">
          {value.end &&
            `${value.end.getMonth() + 1}月${value.end?.getDate()}日 `}
        </div>
      </button>
    </div>
  );
}

type RangeCalendarMDrawerProps = { inputControl: ReactNode };

function RangeCalendarMDrawer({ inputControl }: RangeCalendarMDrawerProps) {
  const { minDate, maxDate } = useConfigContext();

  const { value, open, setOpen, handleSelect, curPosition } = useRangeContext();

  const monthRefs = useRef<HTMLDivElement[]>([]);

  const monthArr = minDate && maxDate && getMonthRangeArray(minDate, maxDate);

  const RangeCalendarComponentProps = {
    value,
    handleSelect,
    curPosition,
  };

  useEffect(() => {
    if (!open || !value.start) return;
    const month = `${value.start.getFullYear()}-${value?.start.getMonth()}`;
    // radix dialog 導致 useEffect 和 ref 掛載 DOM 的順序有點問題，暫時用此方式處理
    setTimeout(() => {
      const targetEl = monthRefs.current.find(
        (monthEl) => monthEl.dataset.month === month
      );
      if (targetEl) targetEl.scrollIntoView();
    }, 0);
  }, [open]);

  if (!monthArr) return null;

  return (
    <Drawer.Root open={open} onOpenChange={setOpen}>
      <Drawer.Trigger asChild>
        <div className="size-fit">{inputControl}</div>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay color="black" />
        <Drawer.Title className="hidden">Title</Drawer.Title>
        <Drawer.Description className="hidden">Description</Drawer.Description>
        <Drawer.Content
          className="bg-black p-0"
          open={open}
          slideDirection="right"
          duration="700"
        >
          <RangeCalendarMDrawerHeader />

          <div className="h-8 flex flex-row pr-[18px]">
            <CalendarWeekday className="text-sm h-full border-0 flex items-center justify-center " />
          </div>
          <div className="flex flex-col overflow-scroll h-[calc(100vh-170px)] relative">
            {monthArr.map((item, index) => {
              const key = item.getFullYear() + "-" + item.getMonth();
              return (
                <RangeCalendarItem
                  key={key}
                  monthKey={key}
                  ref={(ref) => {
                    monthRefs.current[index] = ref as HTMLDivElement;
                  }}
                  className="border-b"
                  curMonth={item}
                  header={<RangeCalendarMHeader curMonth={item} />}
                  {...RangeCalendarComponentProps}
                />
              );
            })}
          </div>

          <div className="flex items-center mx-4 mt-2">
            <Drawer.Close asChild>
              <button
                type="button"
                className="bg-primary-500 size-full h-8 rounded-md text-white-500 "
              >
                確定
              </button>
            </Drawer.Close>
          </div>
          <Drawer.Close asChild>
            <div className="absolute top-1 left-2 cursor-pointer">
              <CalendarChevron
                width={30}
                height={50}
                className="[&>*]:fill-primary-500"
              />
            </div>
          </Drawer.Close>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

export { RangeCalendarMDrawer, RangeCalendarMDrawerHeader, RangeCalendarInput };
