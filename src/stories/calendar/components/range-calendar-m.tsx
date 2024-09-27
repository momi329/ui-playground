import { ReactNode, useRef, useEffect, ComponentPropsWithoutRef } from "react";
import { cn } from "../../helper";

import { Drawer } from "../../drawer";
import { CalendarWeekday, CalendarChevron } from "../calendar";
import { useConfigContext } from "../provider/config-provider";
import { useRangeContext } from "../provider/range-provider";
import { transDateIntoString, getMonthRangeArray } from "../utils/utils";
import { RangeCalendarMHeader } from "./range-calendar-header";
import { RangeCalendarItem } from "./range-calendar-item";

type RangeMCalendarInputProps = ComponentPropsWithoutRef<'div'>
function RangeMCalendarInput({ className, ...props }: RangeMCalendarInputProps) {
  const { value, setChangingPosition } = useRangeContext()
  return (
    <div className={cn('', className)} {...props}>
      <label className="relative">
        <span className="absolute top-0 left-2 ">START</span>
        <input
          type="text"
          className="w-45 h-8 border border-slate-200 rounded pl-13 text-slate-200"
          value={transDateIntoString(value.start)}
          onFocus={() => setChangingPosition('start')}
          readOnly
        />
      </label>
      <label className="relative">
        <span className="absolute top-0 left-2 ">END</span>
        <input
          type="text"
          className="w-45 h-8 border border-slate-200 rounded pl-13 text-slate-200"
          value={transDateIntoString(value.end)}
          onFocus={() => setChangingPosition('end')}
          readOnly
        />
      </label>
    </div>
  )
}

type RangeCalendarMDrawerHeaderProps = ComponentPropsWithoutRef<'div'>

function RangeCalendarMDrawerHeader({ className, ...props }: RangeCalendarMDrawerHeaderProps) {
  const { value, changingPosition, setChangingPosition } = useRangeContext()

  return (
    <div className={cn("pt-2 m-0 text-[17px] font-medium h-14 flex flex-row justify-center border-b border-b-neutral-200", className)}
      {...props}
    >
      <button
        type="button"
        className={cn(
          'border-b-2 w-24 flex flex-col justify-center text-center box-border',
          {
            'border-b-[2px] border-b-primary-500':
              changingPosition && changingPosition === 'start',
            'border-b-2 border-white-500':
              changingPosition && changingPosition === 'end'
          }
        )}
        onClick={() => setChangingPosition('start')}
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
          'border-b-2 w-24 flex flex-col justify-center text-center box-border',
          {
            'border-b-[2px] border-b-primary-500':
              changingPosition && changingPosition === 'end',
            'border-b-2 border-white-500':
              changingPosition && changingPosition === 'start'
          }
        )}
        onFocus={() => setChangingPosition('end')}
      >
        <div className="h5-regular text-slate-400 w-full">回程日期</div>
        <div className="text-primary-500 h4-regular pb-1  h-6 w-full">
          {value.end &&
            `${value.end.getMonth() + 1}月${value.end?.getDate()}日 `}
        </div>
      </button>
    </div>
  )
}

type RangeCalendarMDrawerProps = { inputControl: ReactNode }


function RangeCalendarMDrawer({
  inputControl
}: RangeCalendarMDrawerProps) {
  const { minDate, maxDate } = useConfigContext();
  const {
    value,
    open,
    setOpen,
    handleSelect,
    curPosition } = useRangeContext()

  const monthRefs = useRef<HTMLDivElement[]>([]);

  const monthArr = getMonthRangeArray(minDate, maxDate);

  const RangeCalendarComponentProps = {
    value,
    handleSelect,
    curPosition
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


  return (
    <Drawer.Root open={open} onOpenChange={setOpen}>
      <Drawer.Trigger asChild>
        <div className='size-fit'>
          {inputControl}
        </div>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay color="black" />
        <Drawer.Content
          className="bg-white-500 p-0"
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
              const key = item.toDateString()
              return (
                <RangeCalendarItem
                  key={key}
                  ref={(ref) => {
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    monthRefs.current[index] = ref;
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



export { RangeCalendarMDrawer, RangeCalendarMDrawerHeader, RangeMCalendarInput };
