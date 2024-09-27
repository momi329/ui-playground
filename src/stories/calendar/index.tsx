
// config context
export { CalenderRoot, useConfigContext, type ConfigContext } from './provider/config-provider'
// single context 
export {
  SingleCalendarContext, type SingleContextType, SingleContext,
  SingleProvider,
  useSingleContext
} from './provider/single-provider'
// range context
export {
  RangeCalendarContext, type RangeContextType, RangeContext,
  RangeProvider,
  useRangeContext
} from './provider/range-provider'

// single calender components
export {
  SingleCalendarRoot,
  SingleHeader,
  SingleCalendarComponent,
} from './components/single-calendar';

// range calender components
export { RangeCalendarRoot } from './components/range-calendar'
export { RangeCalendarItem } from './components/range-calendar-item'
export { RangeCalendarHeader, RangeCalendarMHeader } from './components/range-calendar-header'
export { RangeCalendarMDrawer, RangeCalendarMDrawerHeader, RangeMCalendarInput } from './components/range-calendar-m'

export type { RangeCalendarValue, SingleCalendarValue } from "./types/types";
// basic calendar components
export {
  Calendar,
  CalendarHeader,
  CalendarHeaderChooser,
  CalendarWeekday,
  CalendarChevron,
  CalendarDay
} from './calendar';

// useful functions
export { transDateIntoString, omitTimeFromDate, formatDateToYYYYMMDD } from './utils/utils'