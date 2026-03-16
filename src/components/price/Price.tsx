import { RubIcon } from "../../icons/RubIcon";

import styles from "./Price.module.css";

type PriceProps = {
  amount: number;
  amountClassName: string;
  iconClassName: string;
};

export function Price({ amount, amountClassName, iconClassName }: PriceProps) {
  return (
    <>
      <div className={styles.price}>
        <p className={amountClassName}>{amount}</p>
        <RubIcon className={iconClassName} />
      </div>
    </>
  );
}
