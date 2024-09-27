

export type SingleDayColorType = {
  idle: string;
  active: string;
  activeBefore: string;
  disabled: string;
};

export type RangeDayColorType = Omit<SingleDayColorType, 'activeBefore'> & {
  isRangeBefore: string;
  isRangeAfter: string;
  isRangeStart: string;
  isRangeEnd: string;
  isRange: string;
};

// single
export type SingleCalendarValue = Date|undefined;
export type SingleCalendarProps = React.ComponentPropsWithoutRef<'div'> & {
  defaultMonth?: Date;
  value: SingleCalendarValue;
  onChange: (value: SingleCalendarValue) => void;
};

// range
export type RangePosition = 'start' | 'end';
export type RangeCalendarValue = {
  start: Date | undefined;
  end: Date | undefined;
};

export type RangeCalendarProps = React.ComponentPropsWithoutRef<'div'>&{
  changingPosition?: RangePosition;
  defaultMonth?: Date;
  value: RangeCalendarValue;
  onValueChange: (value: RangeCalendarValue) => void;
  curMonth:Date;
  // setCurMonth:Dispatch<SetStateAction<Date>>
};

