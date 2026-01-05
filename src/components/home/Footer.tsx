import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
const Footer = () => {
  return (
    <section className=" flex flex-col md:flex-row items-center justify-center  bg-[#d4d4d4] w-full md:h-[628px] py-[5rem] md:py-0 ">
      <div className="md:w-2/5 w-4/5 h-1/2 flex md:flex-col items-center justify-between ">
        <div className="flex flex-col ">
          <small className="  font-thing mb-[2rem] text-[#272727]/50">
            INFO
          </small>
          <Link className="text-[#272727]/70 hover:underline" to="/">
            PRICING /
          </Link>
          <Link className="text-[#272727]/70 hover:underline" to="/">
            ABOUT /
          </Link>
          <Link className="text-[#272727]/70 hover:underline" to="/">
            CONTACTS
          </Link>
        </div>
        <div className="flex flex-col ">
          <small className=" font-thing mb-[2rem] text-[#272727]/50">
            LANGUAGES
          </small>
          <Link className="text-[#272727]/70 hover:underline" to="/">
            ENG /
          </Link>
          <Link className="text-[#272727]/70 hover:underline" to="/">
            ESP /
          </Link>
          <Link className="text-[#272727]/70 hover:underline" to="/">
            SVE
          </Link>
        </div>
      </div>

      <div className="w-4/5  h-1/2  flex flex-col ">
        <small className=" font-thing mb-[2rem] text-[#272727]/50">
          TECHNOLOGIES
        </small>
        <div className="w-[416px] h-[216px] ">
          <div>
            <div className="flex items-center ">
              <img src={logo} alt="logo" className="z-[2]" />
              <span className="text-7xl text-[#272727]/10 -ml-[2rem] !font-sans font-extrabold">
                VR
              </span>
            </div>
            <h1 className="text-7xl !font-sans font-extrabold -mt-3 ">XIV</h1>{" "}
            <br />
            <h1 className="text-7xl !font-sans font-extrabold -mt-9">
              QR
            </h1>{" "}
          </div>
        </div>
        <div className="w-4/5 items-center flex md:mt-[10rem] mt-[5rem] justify-between ">
          <small className="text-[#272727]/50">© 2025 — copyright</small>
          <small className="text-[#272727]/50">privacy</small>
        </div>
      </div>
    </section>
  );
};
export default Footer;
