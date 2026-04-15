import { useState } from "react";

import { MoreIcon } from "../../icons/MoreIcon";
import { LessIcon } from "../../icons/LessIcon";
import { getPublicAssetPath } from "../../utils/getPublicAssetPath";

import styles from "./TripCollapsibleSection.module.css";

type TripCollapsibleSectionProps = {
  title: string;
  iconSrc: string;
  children: React.ReactNode;
  date?: string;
};

export function TripCollapsibleSection({
  title,
  iconSrc,
  children,
  date
}: TripCollapsibleSectionProps) {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <section className={styles.trip_collapsible_section}>
        <div className={styles.trip_collapsible_section_header}>
          <div className={styles.trip_collapsible_section_wrapper}>
            <img
              src={getPublicAssetPath(iconSrc)}
              alt="icon"
              className={styles.filter__icon}
            />
            <div className={styles.trip_collapsible_section_title_wrapper}>
              <h5 className={styles.trip_collapsible_section_title}>{title}</h5>
              { date && <time className={styles.trip_collapsible_section_date}>{date}</time> }
            </div>
          </div>

          {opened ? (
            <LessIcon
              className={styles.icon_less}
              onClick={() => setOpened(false)}
            />
          ) : (
            <MoreIcon
              className={styles.icon_more}
              onClick={() => setOpened(true)}
            />
          )}
        </div>

        {opened && (
          <>
            <div className={styles.trip_collapsible_section_content}>
              {children}
            </div>
          </>
        )}
      </section>
    </>
  );
}
