import React from "react";
import { cn } from "../../lib/utils";

interface ButtonProps {
  text: string;
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({ text, rightIcon, leftIcon, className, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "  bg-[#d4d4d4] h-[40px] hover:shadow-2xl flex items-center p-6 justify-between",
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
