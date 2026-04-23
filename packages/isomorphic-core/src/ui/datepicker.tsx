"use client";

import { useState } from "react";
import { Input, InputProps } from "rizzui";
import cn from "../utils/class-names";
import { PiCalendarBlank, PiCaretDownBold, PiClock } from "react-icons/pi";
import ReactDatePicker, {
  type DatePickerProps as ReactDatePickerProps,
} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const calendarContainerClasses = {
  base: "[&.react-datepicker]:shadow-lg [&.react-datepicker]:border-gray-100 [&.react-datepicker]:rounded-md",
  monthContainer: {
    padding: "[&.react-datepicker>div]:pt-5 [&.react-datepicker>div]:pb-3",
  },
};

const prevNextButtonClasses = {
  base: "[&.react-datepicker>button]:items-baseline [&.react-datepicker>button]:top-7",
  border:
    "[&.react-datepicker>button]:border [&.react-datepicker>button]:border-solid [&.react-datepicker>button]:border-gray-300 [&.react-datepicker>button]:rounded-md",
  size: "[&.react-datepicker>button]:h-[22px] [&.react-datepicker>button]:w-[22px]",
  children: {
    position: "[&.react-datepicker>button>span]:top-0",
    border:
      "[&.react-datepicker>button>span]:before:border-t-[1.5px] [&.react-datepicker>button>span]:before:border-r-[1.5px] [&.react-datepicker>button>span]:before:border-gray-400",
    size: "[&.react-datepicker>button>span]:before:h-[7px] [&.react-datepicker>button>span]:before:w-[7px]",
  },
};

const timeOnlyClasses = {
  base: "[&.react-datepicker--time-only>div]:pr-0 [&.react-datepicker--time-only>div]:w-28",
};

const popperClasses = {
  base: "[&>svg]:!fill-white dark:[&>svg]:!fill-gray-100 [&>svg]:!stroke-gray-300 dark:[&>svg]:!stroke-muted dark:[&>svg]:!text-muted",
};

export type DatePickerProps = ReactDatePickerProps & {
  inputProps?: InputProps;
};

export const DatePicker = ({
  inputProps,
  error,
  customInput,
  onCalendarOpen,
  onCalendarClose,
  popperClassName,
  calendarClassName,
  showTimeSelect,
  showTimeSelectOnly,
  dateFormat = "d MMMM yyyy",
  showPopperArrow = false,

  ...props
}: DatePickerProps & { error?: string }) => {
  // const [isCalenderOpen, setIsCalenderOpen] = useState(false);
  // const handleCalenderOpen = () => setIsCalenderOpen(true);
  // const handleCalenderClose = () => setIsCalenderOpen(false);

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const isTimeOnly = showTimeSelectOnly;

  const finalDateFormat =
    dateFormat ||
    (isTimeOnly
      ? "h:mm aa"
      : showTimeSelect
        ? "d MMM yyyy h:mm aa"
        : "d MMM yyyy");
  return (
    <div
      className={cn(
        "flex [&_.react-datepicker-wrapper]:flex [&_.react-datepicker-wrapper]:w-full",
        props?.className,
      )}
    >
      <ReactDatePicker
        popperPlacement="bottom-end"
        customInput={
          customInput || (
            <Input
              prefix={
                isTimeOnly ? (
                  <PiClock className="w-5 h-5 text-gray-500" />
                ) : (
                  <PiCalendarBlank className="w-5 h-5 text-gray-500" />
                )
              }
              suffix={
                <PiCaretDownBold
                  className={cn(
                    "h-4 w-4 text-gray-500 transition",
                    isOpen && "rotate-180",
                  )}
                />
              }
              error={error} // 👈 important
              {...inputProps}
            />
          )
        }
        onCalendarOpen={onCalendarOpen || handleOpen}
        onCalendarClose={onCalendarClose || handleClose}
        calendarClassName={cn(
          calendarContainerClasses.base,
          calendarContainerClasses.monthContainer.padding,
          prevNextButtonClasses.base,
          prevNextButtonClasses.border,
          prevNextButtonClasses.size,
          prevNextButtonClasses.children.position,
          prevNextButtonClasses.children.border,
          prevNextButtonClasses.children.size,
          // showTimeSelect && [
          //   "[&.react-datepicker]:flex",
          //   "[&.react-datepicker]:flex-row-reverse",
          //   "[&_.react-datepicker__time-container]:border-r",
          //   "[&_.react-datepicker__time-container]:border-l-0",
          //   "[&_.react-datepicker__time-container]:border-gray-200",
          //   "[&_.react-datepicker__month-container]:float-none",
          //   "[&_.react-datepicker__time-container]:float-none",
          // ],
          calendarClassName,
        )}
        popperClassName={cn(popperClasses.base, popperClassName)}
        dateFormat={finalDateFormat}
        showTimeSelect={showTimeSelect}
        showTimeSelectOnly={showTimeSelectOnly}
        timeIntervals={15}
        showPopperArrow={showPopperArrow}
        {...props}
      />
    </div>
  );
};
