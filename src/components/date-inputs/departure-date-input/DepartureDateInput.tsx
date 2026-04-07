import { useSelector, useDispatch } from "react-redux";

import { setFilterField } from "../../../state/reducers/filterSlice";

import { formatDate } from "../../../utils/formatDate";

import type { RootState } from "../../../state/store";

import { Calendar } from "../date-picker/Calendar";

type DepartureDateInputProps = {
  inputClassName: string;
  inputFieldClassName?: string;
  iconClassName?: string;
};

export function DepartureDateInput({
  inputClassName,
  inputFieldClassName,
  iconClassName,
}: DepartureDateInputProps) {
  const dispatch = useDispatch();
  const departureDate = useSelector(
    (state: RootState) => state.filters.date_start,
  );

  const arrivalDate = useSelector(
    (state: RootState) => state.filters.date_end,
  );
  
  const today = new Date();

  const arrivalDateObj = arrivalDate ? new Date(arrivalDate) : null;

    const maxDate = arrivalDateObj
      ? new Date(arrivalDateObj.getTime() - 24 * 60 * 60 * 1000) 
      : null;

  const handleSelectDate = (date: Date | null) => {
    dispatch(setFilterField({ key: "date_start", value: formatDate(date) }));
  };

  return (
    <>
      <Calendar
        date={departureDate}
        inputClassName={inputClassName}
        inputFieldClassName={inputFieldClassName}
        iconClassName={iconClassName}
        setDate={handleSelectDate}
        minDate={today}
        maxDate={maxDate}
      />
    </>
  );
}
