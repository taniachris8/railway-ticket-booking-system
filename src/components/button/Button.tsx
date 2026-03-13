import "./Button.css";

type ButtonProps = {
  variant:
    | "find"
    | "more"
    | "choose"
    | "change"
    | "change-train"
    | "confirm"
    | "learn-more"
    | "send";
  text: string;
  onClick?: () => void;
  className?: string;
};

export function Button({ variant, text, onClick, className }: ButtonProps) {
  return (
    <>
      <button className={`${variant} ${className || ""}`} onClick={onClick}>
        {text}
      </button>
    </>
  );
}
