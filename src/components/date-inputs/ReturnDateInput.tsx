import { DatePiker } from "./DatePiker";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../state/store";
import { setReturnDate } from "../../state/reducers/ticketsSlice";

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
  const returnDate = useSelector(
    (state: RootState) => state.tickets.returnDate,
  );

  const handleSelectDate = (date: Date | null) => {
    dispatch(setReturnDate(date));
  };

  return (
    <>
      <DatePiker
        date={returnDate}
        inputClassName={inputClassName}
        inputFieldClassName={inputFieldClassName}
        iconClassName={iconClassName}
        onSelect={handleSelectDate}
      />
    </>
  );
}
