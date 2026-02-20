import "./FindTicketsForm.css"
import { useNavigate } from "react-router";
import { DateInputs } from "../date-inputs/DateInputs";
import { DirectionInputs } from "../direction-inputs/DirectionInputs";
import { Button } from "../buttons/Button";

type FindTicketsFormProps = {
  containerClassName: string;
  inputsDivClassName: string;
};

export function FindTicketsForm({
  containerClassName,
  inputsDivClassName,
}: FindTicketsFormProps) {
  const navigate = useNavigate();
  const handleFindTickets = () => {
    navigate("/tickets");
  };

  return (
    <>
      <div className={`find-tickets ${containerClassName}`}>
        <form action="" className="find-tickets__form">
          <div className={inputsDivClassName}>
            <DirectionInputs />
            <DateInputs />
          </div>
          <Button
            variant="find"
            text="Найти билеты"
            onClick={handleFindTickets}
          />
        </form>
      </div>
    </>
  );
}
