import type { ReactNode } from "react";
const ScreenWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex text-[#272727] flex-col items-center justify-center">
      <div className="w-full  max-w-[1800px] flex flex-col ">{children}</div>
    </div>
  );
};

export default ScreenWrapper;
