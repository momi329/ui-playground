// config context
export {
  CalenderRoot,
  useConfigContext,
  type ConfigContext,
} from "./provider/config-provider";
// single context
export {
  SingleCalendarContext,
  SingleContext,
  SingleProvider,
  useSingleContext,
  type SingleContextType,
} from "./provider/single-provider";
// range context
export {
  RangeCalendarContext,
  RangeContext,
  RangeProvider,
  useRangeContext,
  type RangeContextType,
} from "./provider/range-provider";

// single calender components
export {
  SingleCalendarComponent,
  SingleCalendarRoot,
  SingleHeader,
} from "./components/single-calendar";

// range calender components
export { RangeCalendarRoot } from "./components/range-calendar";
export {
  RangeCalendarHeader,
  RangeCalendarMHeader,
} from "./components/range-calendar-header";
export { RangeCalendarItem } from "./components/range-calendar-item";
export {
  RangeCalendarMDrawer,
  RangeCalendarMDrawerHeader,
  RangeMCalendarInput,
} from "./components/range-calendar-m";

export type { RangeCalendarValue, SingleCalendarValue } from "./types/types";
// basic calendar components
export {
  Calendar,
  CalendarChevron,
  CalendarDay,
  CalendarHeader,
  CalendarHeaderChooser,
  CalendarWeekday,
} from "./components/calendar";

// useful functions
export {
  formatDateToYYYYMMDD,
  omitTimeFromDate,
  transDateIntoString,
} from "./utils/utils";
