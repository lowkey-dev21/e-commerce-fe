import type { ReactNode } from "react";
const ScreenWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full max-w-[1800px] flex flex-col items-center">
        {children}
      </div>
    </div>
  );
};

export default ScreenWrapper;
