import { RubIcon } from "../../icons/RubIncon";
import "./Price.css";

type PriceProps = {
  amount: string;
  amountClassName: string;
  iconClassName: string;
};

export function Price({ amount, amountClassName, iconClassName }: PriceProps) {
  return (
    <>
      <div className="price">
        <p className={amountClassName}>{amount}</p>
        <RubIcon className={ iconClassName} />
      </div>
    </>
  );
}
