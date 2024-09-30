import { createContext, useContext, useMemo } from "react";
import { RangeDayColorType, SingleDayColorType } from "../types/types";

export type ConfigContextType = {
  minDate?: Date;
  maxDate?: Date;
  weekdays?: [string, string, string, string, string, string, string];
  startText?: string;
  endText?: string;
  selectText?: string;
  defaultMonth?: Date;
  dayColor?: SingleDayColorType | RangeDayColorType;
};

export const ConfigContext = createContext<ConfigContextType>(
  {} as ConfigContextType
);

export interface CalenderProviderProps extends ConfigContextType {
  children: React.ReactNode;
}

export function CalenderRoot(props: CalenderProviderProps) {
  const { children, minDate, maxDate, defaultMonth, ...value } = props;

  // STORYBOOK date型別是數字
  let minDateValue = minDate;
  let maxDateValue = maxDate;
  let defaultMonthValue = defaultMonth;
  if (
    typeof minDate === "number" ||
    typeof maxDate === "number" ||
    typeof defaultMonth === "number"
  ) {
    minDateValue = minDate ? new Date(minDate) : new Date(1924, 1, 1);
    maxDateValue = maxDate ? new Date(maxDate) : new Date();
    defaultMonthValue = defaultMonth
      ? new Date(defaultMonth)
      : new Date(2000, 0, 0);
  }

  const config = useMemo(() => {
    const defaultConfig = {} as ConfigContextType;
    return {
      defaultConfig,
      minDate: minDateValue,
      maxDate: maxDateValue,
      defaultMonth: defaultMonthValue,
      ...value,
    };
  }, [minDateValue, maxDateValue, defaultMonthValue, value]);

  return (
    <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>
  );
}

export const useConfigContext = () => {
  const context = useContext(ConfigContext);
  if (!context) {
    throw Error("useConfigContext should be used in ConfigContext Provider");
  }
  return context;
};
