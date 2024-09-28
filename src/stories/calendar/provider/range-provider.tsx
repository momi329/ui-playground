import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useMemo,
} from "react";
import {
  RangeCalendarValue,
  RangeDayColorType,
  RangePosition,
} from "../types/types";

interface RangeCalendarComponentProps {
  value: RangeCalendarValue;
  onValueChange: (value: RangeCalendarValue) => void;
  header?: ReactNode;
  dayColor?: RangeDayColorType;
  curPosition?: RangePosition;
  handleSelect?: (day: Date) => void;
  defaultMonth?: Date;
}

export interface RangeCalendarMProps {
  changingPosition: "start" | "end";
  setChangingPosition: Dispatch<SetStateAction<"start" | "end">>;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

type RangeContextType = RangeCalendarComponentProps & RangeCalendarMProps;

const RangeContext = createContext<RangeContextType>({} as RangeContextType);

interface ProviderProps {
  children: React.ReactNode;
  value: RangeContextType;
}

function RangeProvider({ children, value }: ProviderProps) {
  const config = useMemo(() => {
    const defaultConfig = {} as RangeContextType;
    return { defaultConfig, ...value };
  }, [value]);

  return (
    <RangeContext.Provider value={config}>{children}</RangeContext.Provider>
  );
}

const useRangeContext = () => {
  const context = useContext(RangeContext);
  if (!context) {
    throw Error("useConfigContext should be used in ConfigContext Provider");
  }
  return context;
};

const RangeCalendarContext = {
  RangeContext,
  RangeProvider,
  useRangeContext,
};
export {
  RangeCalendarContext,
  RangeContext,
  RangeProvider,
  useRangeContext,
  type RangeContextType,
};
