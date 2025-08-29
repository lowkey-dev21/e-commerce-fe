import { cn } from "../../lib/utils";
interface ButtonI {
  text: string | any;
  rightIcon?: any;
  leftIcon?: any;
  className?: string;
  action?: () => {};
}

const Button = ({ text, rightIcon, leftIcon, className, action }: ButtonI) => {
  return (
    <button
      onClick={action}
      className={cn(
        "  bg-[#d4d4d4] h-[40px] hover:bg-[#d4d4d4]/70 flex items-center p-6 justify-between",
        className
      )}
    >
      {leftIcon && <span>{leftIcon}</span>}
      <span>{text}</span>
      {rightIcon && <span>{rightIcon}</span>}
    </button>
  );
};
export default Button;
