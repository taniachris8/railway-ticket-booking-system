import { Calendar } from "./date-picker/Calendar";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../state/store";
import { setFilterField } from "../../state/reducers/filterSlice";
import { formatDate } from "../../utils/formatDate";

type ReturnDateInputProps = {
  inputClassName: string;
  inputFieldClassName?: string;
  iconClassName?: string;
};

export function ReturnDateInput({
  inputClassName,
  inputFieldClassName,
  iconClassName,
}: ReturnDateInputProps) {
  const dispatch = useDispatch();
  const returnDate = useSelector((state: RootState) => state.filters.date_end);
  const departureDate = useSelector(
    (state: RootState) => state.filters.date_start,
  );

  const handleSelectDate = (date: Date | null) => {
    dispatch(setFilterField({ key: "date_end", value: formatDate(date) }));
  };

  return (
    <>
      <Calendar
        date={returnDate}
        inputClassName={inputClassName}
        inputFieldClassName={inputFieldClassName}
        iconClassName={iconClassName}
        setDate={handleSelectDate}
        minDate={departureDate}
      />
    </>
  );
}
