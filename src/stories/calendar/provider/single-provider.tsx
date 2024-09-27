import { createContext, useMemo, useContext } from "react";

type SingleContextType = {
  value: Date;
  onValueChange: (value: Date) => void;
  curMonth: Date;
  setCurMonth: React.Dispatch<React.SetStateAction<Date>>;
  handleSelect: (day: Date) => void;
};


const SingleContext = createContext<SingleContextType>(null);

interface ProviderProps {
  children: React.ReactNode;
  value: SingleContextType;
}

function SingleProvider({ children, value }: ProviderProps) {
  const config = useMemo(() => {
    const defaultConfig = {} as SingleContextType;
    return { defaultConfig, ...value };
  }, [value]);

  return (
    <SingleContext.Provider value={config}>{children}</SingleContext.Provider>
  );
}

const useSingleContext = () => {
  const context = useContext(SingleContext);
  if (!context) {
    throw Error('useSingleContext should be used in ConfigContext Provider');
  }
  return context;
};

const SingleCalendarContext = {
  SingleContext,
  SingleProvider,
  useSingleContext
}
export {
  SingleCalendarContext, type SingleContextType, SingleContext,
  SingleProvider,
  useSingleContext
}