import { DatePiker } from "./DatePiker";
import { useSelector, useDispatch} from "react-redux";
import type { RootState } from "../../state/store";
import { setDepartureDate } from "../../state/reducers/ticketsSlice";

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
  const departureDate = useSelector((state: RootState) => state.tickets.departureDate);

  const handleSelectDate = (date : Date | null) => { 
     dispatch(setDepartureDate(date));
  }

  return (
    <>
      <DatePiker
        date={departureDate}
        inputClassName={inputClassName}
        inputFieldClassName={inputFieldClassName}
        iconClassName={iconClassName}
        onSelect={handleSelectDate}
      />
    </>
  );
}
