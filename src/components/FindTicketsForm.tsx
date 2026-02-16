import { DateInputs } from "./DateInputs";
import { DirectionInputs } from "./DirectionInputs";

export function FindTicketsForm() {
  return (
    <>
      <div className="find-tickets">
        <form action="" className="find-tickets__form">
          <DirectionInputs />
          <DateInputs />
          <button className="find-tickets__btn">Найти билеты</button>
        </form>
      </div>
    </>
  );
}
