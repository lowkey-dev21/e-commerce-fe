interface InputProps {
  placeholder: string;
  type: string;
  className: string;
  icon?: any;
}
import { cn } from "../../lib/utils";

const Input = ({ placeholder, type, className, icon }: InputProps) => {
  return (
    <div className="relative flex items-center ">
      <span className="absolute left-2 top-2/3  transform -translate-y-1/2">
        {icon}
      </span>
      <input
        type={type}
        placeholder={placeholder}
        className={cn(
          "w-full focus:border outline-none  bg-[#d4d4d4]  p-3",
          className
        )}
      />
    </div>
  );
};
export default Input;
