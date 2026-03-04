import styles from "./ToggleSwitch.module.css";

type ToggleSwitchProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export function ToggleSwitch({ checked, onChange }: ToggleSwitchProps) {
  return (
    <>
      <label className={styles.switch}>
        <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
        <span className={ `${styles.slider} ${styles.round}` }></span>
      </label>
    </>
  );
}
