/* eslint-disable react/jsx-no-undef */
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { CalendarWeekday } from "./components/calendar";
import { RangeCalendarRoot } from "./components/range-calendar";
import { RangeCalendarHeader } from "./components/range-calendar-header";
import { RangeCalendarItem } from "./components/range-calendar-item";
import {
  RangeCalendarInput,
  RangeCalendarMDrawer,
} from "./components/range-calendar-m";

import { CalenderRoot } from "./provider/config-provider";

import type { RangeCalendarValue, RangePosition } from "./types/types";
import { omitTimeFromDate } from "./utils/utils";

const meta: Meta<typeof CalenderRoot> = {
  title: "components/RangeCalendar",
  component: CalenderRoot,
  args: {
    minDate: new Date(2024, 0, 1),
    maxDate: new Date(2025, 0, 25),
    startText: "去程",
    endText: "回程",
    weekdays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    dayColor: {
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
    },
  },
  argTypes: {
    minDate: {
      control: "date",
      description: "最小日期",
    },
    maxDate: {
      control: "date",
      description: "最大日期",
    },
    weekdays: {
      control: "select",
      description: "星期",
      options: [
        ["日", "一", "二", "三", "四", "五", "六"],
        ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      ],
    },
    startText: {
      control: "text",
      description: "選擇去程按鈕的字",
    },
    endText: {
      control: "text",
      description: "選擇回程按鈕的字",
    },
    dayColor: {
      control: "object",
      description: "日期樣式",
      defaultValue: {
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
      },
    },
  },
  tags: ["autodocs"],
  parameters: {
    backgrounds: {
      default: "black",
      values: [{ name: "black", value: "#0a0a0a" }],
    },
  },
};

export default meta;
type Story = StoryObj<typeof CalenderRoot>;

export const RangeCalendarStory: Story = {
  render: function Component(args) {
    const { minDate, maxDate, weekdays, startText, endText, dayColor } = args;
    const [open, setOpen] = useState(false); // 控制M版開啟
    const [value, setValue] = useState<RangeCalendarValue>({
      start: undefined,
      end: undefined,
    }); // 日期值

    const [curMonth, setCurMonth] = useState<Date>(
      omitTimeFromDate(new Date())
    ); // 月曆預設的月份

    // 紀錄目前選到開始還是結束
    const [changingPosition, setChangingPosition] =
      useState<RangePosition>("start");

    // 更新選到的值
    const handleChange = (val: RangeCalendarValue) => {
      const updated = { ...val };
      if (value.start && value.end && changingPosition === "start") {
        updated.end = undefined;
      }

      if (changingPosition === "start") setChangingPosition("end");
      if (changingPosition === "end") setChangingPosition("start");
      setValue(updated);
    };
    // 控制月曆預設的月份
    function handleSwitchCurMonth(
      direction: "left" | "right",
      isDisabled: boolean
    ) {
      if (isDisabled) return;
      if (direction === "left") {
        setCurMonth(
          (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
        );
      } else {
        setCurMonth(
          (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
        );
      }
    }

    const rangeProps = {
      value,
      onValueChange: (val: RangeCalendarValue) => handleChange(val),
      curMonth,
      setCurMonth,
      changingPosition,
      setChangingPosition,
      open,
      setOpen,
    };

    return (
      <>
        <CalenderRoot
          minDate={minDate}
          maxDate={maxDate}
          startText={startText}
          endText={endText}
          weekdays={weekdays}
          dayColor={dayColor}
        >
          <RangeCalendarRoot {...rangeProps}>
            <RangeCalendarInput className="hidden desktop:flex laptop:flex" />
            <div className="hidden desktop:flex laptop:flex">
              <RangeCalendarItem
                className="w-[284px] border "
                curMonth={curMonth}
                header={
                  <>
                    <RangeCalendarHeader
                      handleSwitch={(direction, isDisabled) =>
                        handleSwitchCurMonth(direction, isDisabled)
                      }
                      direction="left"
                      curMonth={curMonth}
                    />
                    <CalendarWeekday />
                  </>
                }
              />
              <RangeCalendarItem
                className="w-[284px] border "
                curMonth={
                  new Date(curMonth.getFullYear(), curMonth.getMonth() + 1, 1)
                }
                header={
                  <>
                    <RangeCalendarHeader
                      direction="right"
                      handleSwitch={(direction, isDisabled) =>
                        handleSwitchCurMonth(direction, isDisabled)
                      }
                      curMonth={
                        new Date(
                          curMonth.getFullYear(),
                          curMonth.getMonth() + 1,
                          1
                        )
                      }
                    />
                    <CalendarWeekday />
                  </>
                }
              />
            </div>
            <div className="flex desktop:hidden laptop:hidden">
              <RangeCalendarMDrawer inputControl={<RangeCalendarInput />} />
            </div>
          </RangeCalendarRoot>
        </CalenderRoot>
      </>
    );
  },
};
