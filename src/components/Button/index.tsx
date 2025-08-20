import cx from "classnames";
import styles from "./Button.module.css";

type ButtonProps = {
  children: React.ReactNode;
  disabled?: boolean;
  round?: boolean;
  inverted?: boolean;
  id?: string;
  type?: "button" | "submit" | "reset" | undefined;
  className?: string;
  style?: React.CSSProperties;
  duration?: number;
  onClick?: (() => void) | ((e: { preventDefault: () => void }) => void);
};

const Button = ({
  children,
  disabled = false,
  round = false,
  inverted = false,
  id,
  type,
  className,
  style,
  onClick,
}: ButtonProps) => {
  return (
    <button
      id={id}
      disabled={disabled}
      type={type}
      className={cx(className, styles.button, {
        [styles.disabled]: disabled,
        [styles.round]: round,
        [styles.inverted]: inverted,
        [styles.normal]: !inverted,
      })}
      onClick={onClick}
      style={{ ...style }}
    >
      {children}
    </button>
  );
};

export default Button;
