import type { Meta, StoryObj } from "@storybook/react";
import { useEffect, useState } from "react";
import { Slider } from "./components/slider";
import { SliderInfo } from "./components/sliderInfo";
import { SliderInput } from "./components/sliderInput";

const meta: Meta<typeof Slider.Root> = {
  title: "components/Slider",
  component: Slider.Root,
  parameters: {
    backgrounds: {
      default: "black",
      values: [{ name: "black", value: "#0a0a0a" }],
    },
  },
};

export default meta;
type BasicSliderStory = StoryObj<typeof Slider.Root>;

type SliderStoryArgs = {
  min: number;
  max: number;
  step: number;
};

export const SliderStory: BasicSliderStory = {
  args: {
    min: 100,
    max: 200,
    step: 100,
  },
  render: (args: SliderStoryArgs) => {
    const { min, max, step } = args;
    const [minValue, setMinValue] = useState<number>(min);
    const [maxValue, setMaxValue] = useState<number>(max);

    const [errMsg, setErrMsg] = useState<string>("");

    const sliderStates = {
      minValue,
      setMinValue,
      maxValue,
      setMaxValue,
    };

    useEffect(() => {
      if (min < max) {
        setMinValue(min);
        setMaxValue(max);
        setErrMsg("");
      } else {
        setErrMsg("⚠️ 基礎設定 min應小於max 壞給你看😤 ⚠️");
      }
    }, [min, max, step]);

    return (
      <div className="flex gap-2 flex-col mx-auto">
        <SliderInfo
          minValue={minValue}
          maxValue={maxValue}
          step={step}
          errMsg={errMsg}
        />
        <Slider.Root
          min={min}
          max={max}
          step={step}
          {...sliderStates}
          className="w-64"
        >
          <Slider.Rail>
            <Slider.InnerRail />
          </Slider.Rail>
          <Slider.Input tag="less" />
          <Slider.Input tag="more" />
        </Slider.Root>
      </div>
    );
  },
};

export const SliderInputStory: BasicSliderStory = {
  args: {
    min: 100,
    max: 500,
    step: 10,
  },
  render: (args: SliderStoryArgs) => {
    const { min, max, step } = args;
    const [minValue, setMinValue] = useState<number>(min);
    const [maxValue, setMaxValue] = useState<number>(max);
    const [inputValue, setInputValue] = useState<Record<"min" | "max", number>>(
      {
        min: min,
        max: max,
      }
    );
    const [errMsg, setErrMsg] = useState<string>("");
    useEffect(() => {
      if (min < max) {
        setMinValue(min);
        setMaxValue(max);
        setInputValue({
          min: min,
          max: max,
        });
        setErrMsg("");
      } else {
        setErrMsg("⚠️ 基礎設定 min應小於max 壞給你看😤 ⚠️");
      }
    }, [min, max, step]);

    const sliderStates = {
      minValue,
      setMinValue,
      maxValue,
      setMaxValue,
      value: inputValue,
      setValue: setInputValue,
    };
    return (
      <div className="flex gap-2 flex-col mx-auto items-center">
        <SliderInfo
          minValue={minValue}
          maxValue={maxValue}
          step={step}
          errMsg={errMsg}
        />
        <div className="w-64 flex flex-col gap-2 items-center">
          <Slider.Root
            className=" w-[calc(100%-18px)] h-4 pt-2 mb-2"
            min={min}
            max={max}
            step={step}
            {...sliderStates}
          >
            <Slider.Input tag="less" />
            <Slider.Input tag="more" />
            <Slider.Rail>
              <Slider.InnerRail className="bg-primary-500" />
            </Slider.Rail>
          </Slider.Root>

          <SliderInput.Root
            {...sliderStates}
            min={min}
            max={max}
            step={step}
            className="flex justify-between w-full ml-2"
          >
            <div>
              <SliderInput.Label type="min">最低</SliderInput.Label>
              <SliderInput.Wrapper>
                <SliderInput.Input type="min" />
              </SliderInput.Wrapper>
            </div>
            <div className="translate-y-[10px] text-[#bbbbbb]">-</div>
            <div>
              <SliderInput.Label type="max">最高</SliderInput.Label>
              <SliderInput.Wrapper>
                <SliderInput.Input type="max" />
              </SliderInput.Wrapper>
            </div>
          </SliderInput.Root>
        </div>
      </div>
    );
  },
};
