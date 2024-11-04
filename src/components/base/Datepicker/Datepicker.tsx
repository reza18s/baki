import moment from "jalali-moment";
import { getPersianMonth, persianWeekDays } from "./Datepicker.helper";
import clsx from "clsx";
import { useEffect, useState } from "react";

import React from "react";

import { BodyMdRegular } from "../Typography/Body";

const STOREGE_KEY = "Datepicker-Selected-date";
type DMY = "day" | "month" | "year";
interface DatepickerProps {
  initialDate?: string;
  minYear?: number;
  maxYear?: number;
  onSelect: (date: moment.Moment) => void;
}
interface DMYProps {
  selectedDate: moment.Moment;
  date: moment.Moment;
  size: string;
  onSelect: (date: moment.Moment) => void;
}
const Datepicker: React.FC<DatepickerProps> = ({
  initialDate,
  minYear = 1322,
  maxYear = 1420,
  onSelect,
}) => {
  const stringDate =
    initialDate ?? (localStorage.getItem(STOREGE_KEY) as string | null);

  let initDate = moment();
  if (stringDate === null) {
    initDate.toNow();
  } else {
    initDate = moment(stringDate, "jYYYY/jMM/jDD");
  }
  initDate.locale("fa");

  const [what, setWhat] = useState<DMY>("day");
  const [selectedDate, setSelectedDate] = useState(initDate);
  const [date, setDate] = useState(selectedDate.clone());

  const handleArrowClick = (fun: "subtract" | "add") => {
    if (what === "day") {
      setDate(date.clone()[fun](1, "month"));
    } else if (what === "month") {
      setDate(date.clone()[fun](1, "year"));
    }
  };

  useEffect(() => {
    setDate(selectedDate.clone());
    localStorage.setItem(STOREGE_KEY, selectedDate.format("jYYYY/jMM/jDD"));
  }, [selectedDate]);

  const size = "w-11 h-11";

  return (
    <div className="flex flex-col max-w-fit w-[324px]">
      {(what === "day" || what === "month") && (
        <div className="w-full flex justify-between items-center py-3 px-2 bg-[#FEF1D9]">
          <button onClick={() => handleArrowClick("subtract")}>
            {/* {arrow left here} */}
          </button>
          <button
            onClick={() => {
              setWhat("year");
            }}
            className="rounded-lg p-2 text-gray-800 border-warning-100 active:bg-warning-100 border border-solid text-[13px] font-normal"
          >{`${
            what === "day" ? getPersianMonth(date) + " " : ""
          }${date.jYear()}`}</button>
          <button onClick={() => handleArrowClick("add")}>
            {/* {arrow right here} */}
          </button>
        </div>
      )}
      <div className="flex flex-wrap flex-row-reverse my-2 mx-2">
        {what === "day" && (
          <Days
            selectedDate={selectedDate}
            date={date}
            size={size}
            onSelect={(date) => {
              setSelectedDate(date);
              onSelect(date);
            }}
          />
        )}
        {what === "month" && (
          <Months
            selectedDate={selectedDate}
            date={date}
            size={"w-[102px] h-11"}
            onSelect={(date) => {
              setSelectedDate(date);
              setWhat("day");
            }}
          />
        )}

        {what === "year" && (
          <Years
            selectedDate={selectedDate}
            date={date}
            size={"w-[77px] h-11"}
            minYear={minYear}
            maxYear={maxYear}
            onSelect={(date) => {
              setSelectedDate(date);
              setWhat("month");
            }}
          />
        )}
      </div>
    </div>
  );
};

const Days: React.FC<DMYProps> = ({ selectedDate, date, size, onSelect }) => {
  return (
    <>
      {persianWeekDays.map((day, index) => {
        return (
          <BodyMdRegular
            className={clsx(size, "text-center")}
            color="text-gray-500"
            key={index}
          >
            {day.charAt(0)}
          </BodyMdRegular>
        );
      })}
      {new Array(date.startOf("month").weekday()).fill(0).map((_, index) => {
        return <div key={index} className={size}></div>;
      })}
      {new Array(date.daysInMonth()).fill(0).map((_, index) => {
        const tempDate = date.clone();
        tempDate.date(index + 1);
        const isSelected = tempDate.isSame(selectedDate, "day");

        return (
          <button
            key={index}
            onClick={() => {
              onSelect(tempDate);
            }}
            className={clsx(
              "flex justify-center items-center font-medium rounded-full cursor-pointer text-gray-600",
              size,
              isSelected && "bg-warning-100 text-white",
            )}
          >
            {tempDate.date()}
          </button>
        );
      })}
    </>
  );
};

const Months: React.FC<DMYProps> = ({ selectedDate, date, size, onSelect }) => {
  return (
    <>
      {new Array(12).fill(0).map((_, index) => {
        const tempDate = date.clone();
        tempDate.month(index);
        const isSelected = tempDate.isSame(selectedDate, "month");

        return (
          <button
            key={index}
            onClick={() => {
              onSelect(tempDate);
            }}
            className={clsx(
              "flex justify-center items-center font-medium rounded-full cursor-pointer text-gray-600",
              size,
              isSelected && "bg-warning-100 text-white",
            )}
          >
            {tempDate.format("jMMMM")}
          </button>
        );
      })}
    </>
  );
};

const Years: React.FC<DMYProps & DatepickerProps> = ({
  selectedDate,
  date,
  size,
  onSelect,
  minYear = 1322,
  maxYear = 1420,
}) => {
  return (
    <>
      {new Array(maxYear - minYear + 1).fill(0).map((_, index) => {
        const tempDate = date.clone();
        tempDate.year(minYear + index);
        const isSelected = tempDate.isSame(selectedDate, "year");

        return (
          <button
            key={index}
            onClick={() => {
              onSelect(tempDate);
            }}
            className={clsx(
              "flex justify-center items-center font-medium rounded-full cursor-pointer text-gray-600",
              size,
              isSelected && "bg-warning-100 text-white",
            )}
          >
            {tempDate.format("jYYYY")}
          </button>
        );
      })}
    </>
  );
};

export default Datepicker;
