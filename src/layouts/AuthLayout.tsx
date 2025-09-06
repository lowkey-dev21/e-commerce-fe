import { Outlet } from "react-router-dom";
import signinBg from "../assets/images/signin-bg.svg";
const AuthLayout = () => {
  return (
    <div>
      <img
        className=" z-[1] rotate-180  absolute top-0 right-0 h-[310px] max-w-[728px] object-cover"
        src={signinBg}
        alt="bg-one"
        loading="lazy"
      />
      <img
        className=" z-[1] hidden lg:block absolute bottom-0 left-0 h-[310px] max-w-[728px] object-cover"
        src={signinBg}
        alt="bg-one"
        loading="lazy"
      />
      <Outlet />
    </div>
  );
};
export default AuthLayout;
