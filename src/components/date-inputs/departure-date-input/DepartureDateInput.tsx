import { useSelector, useDispatch } from "react-redux";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

import { setFilterField } from "../../../state/reducers/filterSlice";

import { formatDate } from "../../../utils/formatDate";

import type { RootState } from "../../../state/store";

import { Calendar } from "../date-picker/Calendar";

type DepartureDateInputProps = {
  inputClassName: string;
  inputFieldClassName?: string;
  iconClassName?: string;
  visibleDepartureDateTooltip: boolean
};

export function DepartureDateInput({
  inputClassName,
  inputFieldClassName,
  iconClassName,
  visibleDepartureDateTooltip
}: DepartureDateInputProps) {
  const dispatch = useDispatch();
  const departureDate = useSelector(
    (state: RootState) => state.filters.date_start,
  );

  const arrivalDate = useSelector((state: RootState) => state.filters.date_end);

  const today = new Date();
  const endOfYear = new Date(today.getFullYear(), 11, 31);

  const arrivalDateObj = arrivalDate ? new Date(arrivalDate) : null;

  const maxDate = arrivalDateObj ? arrivalDateObj : endOfYear;

  const handleSelectDate = (date: Date | null) => {
    dispatch(setFilterField({ key: "date_start", value: formatDate(date) }));
  };

  return (
    <>
      <Tippy
        content="Выберите дату отправления"
        visible={visibleDepartureDateTooltip}
        placement="bottom-start">
        <div>
          <Calendar
            date={departureDate}
            inputClassName={inputClassName}
            inputFieldClassName={inputFieldClassName}
            iconClassName={iconClassName}
            setDate={handleSelectDate}
            minDate={today}
            maxDate={maxDate}
          />
        </div>
      </Tippy>
    </>
  );
}
