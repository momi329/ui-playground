/* eslint-disable react/jsx-no-undef */
import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { CalendarWeekday } from "./components/calendar";
import { RangeCalendarRoot } from "./components/range-calendar";
import { RangeCalendarHeader } from "./components/range-calendar-header";
import { RangeCalendarItem } from "./components/range-calendar-item";
import {
  RangeCalendarMDrawer,
  RangeMCalendarInput,
} from "./components/range-calendar-m";
import {
  SingleCalendarComponent,
  SingleCalendarRoot,
} from "./components/single-calendar";
import { CalenderRoot } from "./provider/config-provider";
import {
  RangeCalendarValue,
  RangePosition,
  SingleCalendarValue,
} from "./types/types";
import { omitTimeFromDate, transDateIntoString } from "./utils/utils";

const meta: Meta<typeof CalenderRoot> = {
  title: "components/Calendar",
  component: CalenderRoot,
  args: {},
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof CalenderRoot>;

function Doc() {
  return (
    <div className=" m-1 size-fit">
      <label className="p-1 bg-blue-400 rounded text-white-500 h5-bold">
        <a href="https://separate-tempo-553.notion.site/Calendar-ui-library-f43fe92592934d6fad7000e82ecacd41">
          🚀點我看文件
        </a>
        <input type="text" id="notion-link" readOnly className="hidden" />
      </label>
    </div>
  );
}

type DisplayItem = { title: string; value: string; dataAttr?: string };

function ConfigDisplay({ displayData }: { displayData: DisplayItem[] }) {
  return (
    <div className=" gap-1 m-2 w-1/3 max-w-[300px] text-slate-200 ">
      {displayData.map((item) => {
        const key = item.title + item.value;
        return (
          <div
            className="flex justify-between border-b border-slate-200"
            key={key}
          >
            <div className="">{item.title}</div>{" "}
            <div {...{ [`data-${item.dataAttr}`]: item.value }}>
              {item.value}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export const SingleCalendarStory: Story = {
  render: function Component() {
    const [value, setValue] = useState<SingleCalendarValue>();
    const handleChange = (val: SingleCalendarValue) => {
      setValue(val);
    };
    const configSettings = {
      defaultMonth: new Date(2024, 2, 5),
      minDate: new Date(1924, 1, 1),
      maxDate: new Date(2024, 4, 22),
      selectText: "折扣",
    };
    const singleProps = {
      value,
      onChange: (val: Date) => handleChange(val),
    };
    return (
      <div className="flex w-96 ">
        <CalenderRoot value={configSettings}>
          <SingleCalendarRoot {...singleProps} {...singleProps}>
            <SingleCalendarComponent />
          </SingleCalendarRoot>
        </CalenderRoot>
        <div>
          <Doc />
        </div>
      </div>
    );
  },
};

export const RangeCalendarStory: Story = {
  render: function Component() {
    const [open, setOpen] = useState(false); // 控制M版開啟
    const [value, setValue] = useState<RangeCalendarValue>({
      start: undefined,
      end: undefined,
    }); // 日期值

    const configSettings = {
      minDate: new Date(2024, 0, 1),
      maxDate: new Date(2025, 0, 25),
      startText: "去程",
      endText: "回程",
    };

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
    const displayData = [
      {
        title: "minDate",
        value: transDateIntoString(configSettings.minDate),
      },
      {
        title: "maxDate",
        value: transDateIntoString(configSettings.maxDate),
      },
      {
        title: "去程/回程",
        value: `${transDateIntoString(
          value.start || new Date()
        )} ${transDateIntoString(value.end || new Date())}`,
      },
    ];
    return (
      <>
        <div className="hidden desktop:block laptop:block m-1 ">
          <label className="relative">
            <span className="absolute top-0 left-2 ">START</span>
            <input
              type="text"
              className="w-45 h-8 border border-slate-200 rounded pl-13 text-slate-200"
              value={transDateIntoString(value.start || new Date())}
              onFocus={() => setChangingPosition("start")}
              readOnly
            />
          </label>
          <label className="relative">
            <span className="absolute top-0 left-2 ">END</span>
            <input
              type="text"
              className="w-45 h-8 border border-slate-200 rounded pl-13 text-slate-200"
              value={transDateIntoString(value.end || new Date())}
              onFocus={() => setChangingPosition("end")}
              readOnly
            />
          </label>
        </div>
        <CalenderRoot value={configSettings}>
          <RangeCalendarRoot {...rangeProps}>
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
              <RangeCalendarMDrawer inputControl={<RangeMCalendarInput />} />
            </div>
          </RangeCalendarRoot>
        </CalenderRoot>
        <div className="mt-3">
          <Doc />
          <ConfigDisplay displayData={displayData} />
        </div>
      </>
    );
  },
};
