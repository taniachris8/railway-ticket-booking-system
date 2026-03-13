import { Calendar } from "../date-picker/Calendar";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../../state/store";
import { setFilterField } from "../../../state/reducers/filterSlice";
import { formatDate } from "../../../utils/formatDate";

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
  const today = new Date();

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
      />
    </>
  );
}
