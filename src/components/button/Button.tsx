import "./Button.css";

type ButtonProps = {
  variant: string;
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
