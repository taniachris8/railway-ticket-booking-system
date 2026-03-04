import "./Button.css";

type ButtonProps = {
  variant:
    | "find"
    | "more"
    | "choose"
    | "change"
    | "confirm"
    | "learn-more"
    | "send";
  text: string;
  onClick?: () => void;
};

export function Button({ variant, text, onClick }: ButtonProps) {
  return (
    <>
      <button className={variant} onClick={onClick}>{text}</button>
    </>
  );
}
