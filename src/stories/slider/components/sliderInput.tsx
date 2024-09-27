/* eslint-disable react/display-name */
import {
  createContext,
  Dispatch,
  forwardRef,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
} from "react";

import { cn } from "../../helper";

/* -------------------------------------------------------------------------------------------------
 * SliderInputRoot
 * --- --------------------------------------------------------------------------------------------*/
type SliderInputRootElement = React.ElementRef<"div">;
type SliderInputRootProps = React.ComponentPropsWithoutRef<"div"> & {
  minValue: number;
  setMinValue: Dispatch<SetStateAction<number>>;
  maxValue: number;
  setMaxValue: Dispatch<SetStateAction<number>>;
  value: Record<"min" | "max", number>;
  setValue: Dispatch<SetStateAction<Record<"min" | "max", number>>>;
  min: number;
  max: number;
  step: number;
};
type ContextType = SliderInputRootProps;

const SliderInputContext = createContext<ContextType>({} as ContextType);

const SliderInputRoot = forwardRef<
  SliderInputRootElement,
  SliderInputRootProps
>(
  (
    {
      children,
      className,
      minValue,
      maxValue,
      setMinValue,
      setMaxValue,
      value,
      setValue,
      min,
      max,
      step,
      ...props
    },
    ref
  ) => {
    const BaseSliderStyle = "flex  items-center justify-between ";
    const contextValue = useMemo(
      () => ({
        minValue,
        maxValue,
        setMinValue,
        setMaxValue,
        value,
        setValue,
        min,
        max,
        step,
      }),
      [
        minValue,
        maxValue,
        setMinValue,
        setMaxValue,
        value,
        setValue,
        min,
        max,
        step,
      ]
    );

    useEffect(() => {
      setValue({ min: minValue, max: maxValue });
    }, [minValue, maxValue]);

    return (
      <SliderInputContext.Provider value={contextValue}>
        <div className={cn(BaseSliderStyle, className)} ref={ref} {...props}>
          {children}
        </div>
      </SliderInputContext.Provider>
    );
  }
);

/* -------------------------------------------------------------------------------------------------
 * SliderLabel
 * --- --------------------------------------------------------------------------------------------*/

type SliderLabelElement = React.ElementRef<"label">;
type SliderLabelProps = React.ComponentPropsWithoutRef<"label"> & {
  type: string;
};

const SliderLabel = forwardRef<SliderLabelElement, SliderLabelProps>(
  ({ children, className, type, ...props }, ref) => (
    <label
      className={cn("text-white-500 text-sm body-regular", className)}
      htmlFor={type}
      ref={ref}
      {...props}
    >
      {children}
    </label>
  )
);

/* -------------------------------------------------------------------------------------------------
 * SliderWrapper
 * --- --------------------------------------------------------------------------------------------*/

type SliderWrapperElement = React.ElementRef<"div">;
type SliderWrapperProps = React.ComponentPropsWithoutRef<"div">;
const SliderWrapper = forwardRef<SliderWrapperElement, SliderWrapperProps>(
  ({ children, className, ...props }, ref) => {
    const baseWrapperStyle =
      "w-full relative after:content-['TWD'] after:absolute after:left-[8px] after:top-1/2 after:translate-y-[-50%] after:text-primary-300";

    return (
      <div className={cn(baseWrapperStyle, className)} ref={ref} {...props}>
        {children}
      </div>
    );
  }
);
/* -------------------------------------------------------------------------------------------------
 * SliderInputComponent
 * --- --------------------------------------------------------------------------------------------*/

type SliderInputComponentElement = React.ElementRef<"input">;
type SliderInputComponentProps = React.ComponentPropsWithoutRef<"input"> & {
  type: "min" | "max";
};
const SliderInputComponent = forwardRef<
  SliderInputComponentElement,
  SliderInputComponentProps
>(
  (
    // eslint-disable-next-line @typescript-eslint/no-shadow
    { className, type, onBlur, onKeyDown, onChange, ...props },
    ref
  ) => {
    const {
      maxValue,
      minValue,
      min,
      max,
      setMinValue,
      setMaxValue,
      value,
      setValue,
    } = useContext(SliderInputContext);

    function handleChange(changeType: "min" | "max", val: string) {
      let newV = +val;
      if (changeType === "min") {
        if (+val > maxValue) newV = maxValue - 1 > min ? maxValue - 1 : min;
        if (+val < min) newV = min;
        setMinValue(newV);
        setValue((prev) => ({ ...prev, min: newV }));
      } else {
        if (+val > max) newV = max;
        if (+val < minValue) newV = minValue + 1 < max ? minValue + 1 : max;
        setMaxValue(newV);
        setValue((prev) => ({ ...prev, max: newV }));
      }
    }
    function handleOnChange(changeEvent: React.ChangeEvent<HTMLInputElement>) {
      setValue((prev) => ({
        ...prev,
        [type]: changeEvent.target.value,
      }));
    }
    const InputBaseStyle =
      "input-base bg-transparent text-primary-500 border-stone-400 max-w-[110px] text-right pl-[45px] text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none";

    const BaseStyles =
      "p-3 h-8 box-border border text-primary-300 rounded focus:outline-none disabled:bg-neutral-400";

    function handleKeyDown(keyEvent: React.KeyboardEvent<HTMLInputElement>) {
      if (keyEvent.key === "Enter") {
        handleChange(type, (keyEvent.target as HTMLInputElement).value);
      }
    }

    return (
      <input
        className={cn(BaseStyles + InputBaseStyle, className)}
        type="number"
        id="min"
        value={type === "min" ? value.min : value.max}
        onKeyDown={onKeyDown || handleKeyDown}
        onBlur={(blurEvent: React.FocusEvent<HTMLInputElement>) =>
          onBlur ||
          handleChange(type, (blurEvent.target as HTMLInputElement).value)
        }
        onChange={onChange || handleOnChange}
        {...props}
        ref={ref}
      />
    );
  }
);

const SliderInput = {
  Root: SliderInputRoot,
  Label: SliderLabel,
  Wrapper: SliderWrapper,
  Input: SliderInputComponent,
};

export {
  SliderInput,
  SliderInputRoot,
  SliderLabel,
  SliderWrapper,
  SliderInputComponent,
};
