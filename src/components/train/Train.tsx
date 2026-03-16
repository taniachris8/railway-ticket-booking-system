import { formatTrainName } from "../../utils/formatTrainName";
import { formatCityName } from "../../utils/formatCityName";

import { ThinRightArrow } from "../../icons/ThinRightArrow";
import { TrainIcon } from "../../icons/TrainIcon";

import styles from "./Train.module.css";

type TrainsProps = {
  name: string;
  from_city: string;
  to_city: string;
  containerStyles?: string;
  iconStyles?: string;
  trainDirectionsStyles?: string;
};

export function Train({
  name,
  from_city,
  to_city,
  containerStyles,
  iconStyles,
  trainDirectionsStyles,
}: TrainsProps) {
  return (
    <>
      <div className={`${styles.train} ${containerStyles}`}>
        <TrainIcon className={`${styles.train__icon} ${iconStyles}`} />
        <div className={`${styles.train__directions} ${trainDirectionsStyles}`}>
          <p className={styles.train__number}>{formatTrainName(name)}</p>
          <div className={styles.train__direction}>
            <div className={styles.train__stop}>
              <span className={styles.train__city}>
                {formatCityName(from_city)}
              </span>
              <ThinRightArrow
                className={`${styles.train__direction_arrow} ${styles.inactive}`}
              />
            </div>
            <div className={styles.train__stop}>
              <span className={styles.train__city}>
                {formatCityName(to_city)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
