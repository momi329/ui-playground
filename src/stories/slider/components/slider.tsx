/* eslint-disable react/display-name */
"use client";

import {
  useContext,
  forwardRef,
  createContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { cn } from "../../helper";

import {
  SliderRootElement,
  SliderRootProps,
  SliderContextType,
  InputRangeElement,
  InputRangeProps,
  RailProps,
  InnerRailElement,
  InnerRailProps,
} from "../types/slider-types";

/* -------------------------------------------------------------------------------------------------
 * SliderRoot
 * --- --------------------------------------------------------------------------------------------*/
export const SliderContext = createContext<SliderContextType>({} as SliderContextType);
const SliderRoot = forwardRef<SliderRootElement, SliderRootProps>(
  (
    {
      children,
      className,
      min,
      max,
      step,
      minValue,
      setMinValue,
      maxValue,
      setMaxValue,
      allowEqualMinMax,
      ...props
    },
    ref
  ) => {
    const BaseSliderStyle =
      "slider-root h-[6px] cursor-pointer relative flex items-center m-auto";

    const [sliderWidth, setSliderWidth] = useState<number>(0);
    const [sliderPosition, setSliderPosition] = useState<number>(0);
    const [isDragging, setIsDragging] = useState<"less" | "more" | null>(null);

    const totalSteps = (max - min) / step;
    const widthPerStep = sliderWidth / totalSteps;
    const minPosition = widthPerStep * ((minValue - min) / step);
    const maxPosition = widthPerStep * ((maxValue - min) / step);

    const sliderRef = useRef<HTMLDivElement>(null);
    const maxThumbRef = useRef<HTMLDivElement>(null);
    const minThumbRef = useRef<HTMLDivElement>(null);

    const handleMouseDown = (
      e: React.MouseEvent<HTMLDivElement>,
      type: "less" | "more"
    ) => {
      e.preventDefault();
      setIsDragging(type);
    };

    const handleClick = useMemo(() => {
      return (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const newPosition = Math.floor(e.pageX);

        if (newPosition <= 0) return;

        let value =
          Math.floor((newPosition - sliderPosition) / widthPerStep) * step + min;
        if (value <= min) value = min;
        if (value >= max) value = max;

        const toMinValue = Math.abs(minValue - value);
        const toMaxValue = Math.abs(maxValue - value);

        if (toMaxValue > toMinValue) {
          setMinValue(value);
        } else {
          setMaxValue(value);
        }
      };
    }, [sliderPosition, widthPerStep, step, min, max, minValue, maxValue, setMinValue, setMaxValue]);

    const getSliderRect = useMemo(() => {
      return () => {
        if (sliderRef.current) {
          const rect = sliderRef.current.getBoundingClientRect();
          const position = rect.left;
          setSliderWidth(rect.width);
          setSliderPosition(position);
          return { position };
        }
      };
    }, [setSliderWidth, setSliderPosition]);

    const handleTouch = useMemo(() => {
      return (
        e: React.TouchEvent<HTMLDivElement>,
        type: "less" | "more"
      ) => {
        const sliderRect = getSliderRect();
        if (!sliderRect) return;
        const { position } = sliderRect;
        const newPosition = Math.floor(
          e.changedTouches?.[0]?.clientX ?? 0
        );

        if (newPosition <= 0) return;
        let value =
          Math.floor((newPosition - position) / widthPerStep) * step + min;
        if (type === "less") {
          if (value >= maxValue) value = maxValue - 1 * step;
          if (value <= min) value = min;
          setMinValue(value);
        } else if (type === "more") {
          if (value <= minValue) value = minValue + 1 * step;
          if (value >= max) value = max;
          setMaxValue(value);
        }
        setIsDragging(type);
      };
    }, [getSliderRect, widthPerStep, step, min, max, maxValue, minValue, setMinValue, setMaxValue, setIsDragging]);
    
    const handleDrag = useMemo(() => {
      return (e: MouseEvent) => {
        const sliderRect = getSliderRect();
        if (!sliderRect) return;
        const { position } = sliderRect;
        if (!isDragging) return;
        const newPosition = Math.floor(e.pageX);
        if (newPosition <= position) return;
        let value =
          Math.floor((newPosition - position) / widthPerStep) * step + min;
        if (isDragging === "less") {
          if (value >= maxValue) value = maxValue - step;
          if (value < min) value = min;
          setMinValue(value);
        } else {
          if (value <= minValue) value = minValue + step;
          if (value > max) value = max;
          setMaxValue(value);
        }
      };
    }, [getSliderRect, isDragging, widthPerStep, step, min, max, maxValue, minValue, setMinValue, setMaxValue]);
    useEffect(() => {
      getSliderRect();
    }, []);

    useEffect(() => {
      const handleMouseMove = (e: MouseEvent) => handleDrag(e);
      const handleMouseUp = () => setIsDragging(null);

      if (isDragging) {
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
      }

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }, [isDragging, minValue, maxValue, handleDrag]);

    const value = useMemo(
      () => ({
        // states
        minValue,
        setMinValue,
        maxValue,
        setMaxValue,
        // settings
        min,
        max,
        step,
        allowEqualMinMax,
        sliderWidth, // 容器寬度
        setSliderWidth,
        sliderPosition, // 左側寬度
        setSliderPosition,
        isDragging, // 是否拖拉中
        setIsDragging,
        // 計算步數 寬度
        totalSteps,
        minPosition,
        maxPosition,
        // refs
        sliderRef,
        maxThumbRef,
        minThumbRef,
        // fns
        handleMouseDown,
        handleDrag,
        handleClick,
        handleTouch,
      }),
      [minValue, setMinValue, maxValue, setMaxValue, min, max, step, allowEqualMinMax, sliderWidth, sliderPosition, isDragging, totalSteps, minPosition, maxPosition, handleDrag, handleClick, handleTouch]
    );

    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    return (
      <SliderContext.Provider value={value}>
        <div
          className={cn(BaseSliderStyle, className)}
          ref={ref}
          role="button"
          tabIndex={0}
          onClick={(e) => handleClick(e)}
          onKeyDown={() => {}}
          {...props}
        >
          {children}
        </div>
      </SliderContext.Provider>
    );
  }
);

/* -------------------------------------------------------------------------------------------------
 * InputRange
 * -----------------------------------------------------------------------------------------------*/
const InputRange = forwardRef<InputRangeElement, InputRangeProps>(
  ({ className, tag, ...props }, ref) => {
    const {
      minPosition,
      maxPosition,
      handleTouch,
      handleMouseDown,
      minThumbRef,
      maxThumbRef,
    } = useContext(SliderContext);

    const BaseInputRangeStyle = `slider-input absolute size-[18px] rounded-full border border-slate-200 
        z-20 bg-white-500 duration-200`;

    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div
        ref={tag === "less" ? minThumbRef : maxThumbRef ?? ref}
        onMouseDown={(e) => handleMouseDown(e, tag)}
        className={cn(BaseInputRangeStyle, className)}
        style={{
          left: tag === "less" ? minPosition - 8 : maxPosition - 8,
        }}
        onTouchMove={(e) => {
          handleTouch(e, tag);
        }}
        {...props}
      />
    );
  }
);
/* -------------------------------------------------------------------------------------------------
 * Rail
 * -----------------------------------------------------------------------------------------------*/
function Rail({ children, className, ...props }: RailProps) {
  const BaseRailStyle =
    "absolute w-full w-[calc(100%+16px)] bg-[#bebebe] h-[6px] rounded-2xl cursor-pointer";
  const { sliderRef } = useContext(SliderContext);

  return (
    <div className={cn(BaseRailStyle, className)} ref={sliderRef} {...props}>
      {children}
    </div>
  );
}
/* -------------------------------------------------------------------------------------------------
 * InnerRail
 * -----------------------------------------------------------------------------------------------*/
const InnerRail = forwardRef<InnerRailElement, InnerRailProps>(
  ({ className, ...props }, ref) => {
    const InnerRailStyle = "absolute top-0 h-full duration-200 bg-primary-500";
    const { minPosition, maxPosition } = useContext(SliderContext);
    return (
      <div
        className={cn(InnerRailStyle, className)}
        style={{
          left: minPosition,
          width: maxPosition - minPosition,
        }}
        ref={ref}
        {...props}
      />
    );
  }
);

const Slider = {
  Root: SliderRoot,
  Input: InputRange,
  Rail,
  InnerRail,
};
export { Slider, SliderRoot, InputRange, Rail, InnerRail };
