import { Dispatch, SetStateAction, MutableRefObject } from "react";
/* -------------------------------------------------------------------------------------------------
 * SliderRoot
 * --- --------------------------------------------------------------------------------------------*/
export type SliderRootElement = React.ElementRef<"div">;
export type SliderRootProps = React.ComponentPropsWithoutRef<"div"> & {
  min: number;
  max: number;
  step: number;
  minValue: number;
  maxValue: number;
  setMinValue: Dispatch<SetStateAction<number>>;
  setMaxValue: Dispatch<SetStateAction<number>>;
  allowEqualMinMax?: boolean;
};

export type SliderContextType = SliderRootProps & {
  sliderWidth: number; // 容器寬度
  setSliderWidth: Dispatch<SetStateAction<number>>;
  sliderPosition: number; // 左側寬度
  setSliderPosition: Dispatch<SetStateAction<number>>;
  isDragging: "less" | "more" | null; // 是否拖拉中
  setIsDragging: Dispatch<SetStateAction<"less" | "more" | null>>;
  // 計算步數
  totalSteps: number;
  minPosition: number;
  maxPosition: number;
  // refs
  sliderRef: MutableRefObject<HTMLDivElement | null>;
  maxThumbRef: MutableRefObject<HTMLDivElement | null>;
  minThumbRef: MutableRefObject<HTMLDivElement | null>;
  // fns
  handleMouseDown: (
    e: React.MouseEvent<HTMLDivElement>,
    type: "less" | "more"
  ) => void;
  handleDrag: (e: MouseEvent) => void;
  handleClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  handleTouch: (
    e: React.TouchEvent<HTMLDivElement>,
    type: "less" | "more"
  ) => void;
};

/* -------------------------------------------------------------------------------------------------
 * InputRange
 * -----------------------------------------------------------------------------------------------*/

export type InputRangeElement = React.ElementRef<"div">;
export type InputRangeProps = React.ComponentPropsWithoutRef<"div"> & {
  tag: "less" | "more";
};

/* -------------------------------------------------------------------------------------------------
 * Rail
 * -----------------------------------------------------------------------------------------------*/

export type RailProps = React.ComponentPropsWithoutRef<"div">;

/* -------------------------------------------------------------------------------------------------
 * InnerRail
 * -----------------------------------------------------------------------------------------------*/
export type InnerRailElement = React.ElementRef<"div">;
export type InnerRailProps = React.ComponentPropsWithoutRef<"div">;
