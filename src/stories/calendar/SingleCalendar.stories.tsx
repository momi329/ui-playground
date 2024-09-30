/* eslint-disable react/jsx-no-undef */
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import {
  SingleCalendarComponent,
  SingleCalendarRoot,
} from "./components/single-calendar";
import { CalenderRoot } from "./provider/config-provider";

import type { SingleCalendarValue } from "./types/types";

const meta: Meta<typeof CalenderRoot> = {
  title: "components/SingleCalendar",
  component: CalenderRoot,
  args: {
    defaultMonth: new Date(2024, 2, 5),
    minDate: new Date(1924, 1, 1),
    maxDate: new Date(2024, 4, 22),
    selectText: "折扣",
    weekdays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    dayColor: {
      idle: "text-slate-200",
      active: "text-white-500",
      activeBefore: "bg-primary-700/50  absolute z-[-1] size-10 rounded-full",
      disabled: "text-slate-500",
    },
  },
  argTypes: {
    defaultMonth: {
      control: "date",
      description: "預設月份",
    },
    minDate: {
      control: "date",
      description: "最小日期",
    },
    maxDate: {
      control: "date",
      description: "最大日期",
    },
    selectText: {
      control: "text",
      description: "選擇按鈕的字",
    },
    weekdays: {
      control: "select",
      description: "星期",
      options: [
        ["日", "一", "二", "三", "四", "五", "六"],
        ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      ],
      defaultValue: ["日", "一", "二", "三", "四", "五", "六"],
    },
    dayColor: {
      control: "object",
      description: "日期樣式",
      defaultValue: {
        idle: "text-slate-200",
        active: "text-white-500",
        activeBefore: "bg-primary-700/50  absolute z-[-1] size-10 rounded-full",
        disabled: "text-slate-500",
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

export const SingleCalendarStory: Story = {
  render: function Component(args) {
    const { defaultMonth, minDate, maxDate, selectText, weekdays, dayColor } =
      args;
    const [value, setValue] = useState<SingleCalendarValue>();

    const handleChange = (val: SingleCalendarValue) => {
      setValue(val);
    };

    return (
      <div className="flex w-96 ">
        <CalenderRoot
          defaultMonth={defaultMonth}
          minDate={minDate}
          maxDate={maxDate}
          selectText={selectText}
          weekdays={weekdays}
          dayColor={dayColor}
        >
          <SingleCalendarRoot value={value} onChange={handleChange}>
            <SingleCalendarComponent />
          </SingleCalendarRoot>
        </CalenderRoot>
      </div>
    );
  },
};
