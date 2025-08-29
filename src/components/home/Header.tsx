import { Link } from 'react-router-dom';
import { NAVLINKS, SVGS, type Navlinks } from '../../constants/home';
const Header = ({ auth }: { auth: boolean }) => {


  return (
    <>
      <header className="w-full  fixed top-0 left-0 z-50 bg-[#ebebeb]">
        <div className="max-w-[1800px] md:px-10 px-6 mx-auto p-3 flex justify-between items-center">
          <nav className="flex  items-center gap-[2rem] ">
            <button className="flex  items-center justify-center">
              {SVGS.bar}
            </button>
            {NAVLINKS.map((nav: Navlinks) => (
              <ul
                className="hidden items-center md:flex space-x-4"
                key={nav.link}
              >
                <li>
                  <Link to={nav.link}>{nav.name}</Link>
                </li>
              </ul>
            ))}
          </nav>

          <img
            src="/src/assets/images/logo.png"
            className="absolute left-[50%] -translate-x-[50%] h-[30px] w-[30px]"
            alt="logo"
            loading="lazy"
          />



          <div className="flex items-center justify-between  ">
            {/*Mobile*/}
            <div className="flex md:hidden items-center justify-between gap-2">
              <button className="border-[4px] rounded-full p-2 border-[#272727]">
                {SVGS.cart}
              </button>

              {/*Use auth section */}
              {auth ? (
                <button className=" rounded-full w-[45px] h-[45px] flex items-center justify-center text-white p-2 bg-[#272727]">
                  MO
                </button>
              ) : (
                <button className=" rounded-full w-[45px] h-[45px] flex items-center justify-center text-white p-2 bg-[#272727]">
                  {SVGS.user}
                </button>
              )}
            </div>

            {/*desktop and tabs*/}
            <div className="hidden md:flex items-center w-[300px] justify-between">
              <button className=" rounded-full w-[50px] h-[50px] flex items-center justify-center text-white p-2 bg-[#272727]">
                {SVGS.like}
              </button>
              <div className="flex items-center">
                <div className="w-[80px] h-[50px] flex items-center justify-center p-2 text-white rounded-[22px] bg-[#272727]">
                  Cart
                </div>
                <button className="border-[6px] -ml-1 rounded-full p-2 border-[#272727]">
                  {SVGS.cart}
                </button>
              </div>

              {/*Use auth section */}
              {auth ? (
                <button className=" rounded-full w-[50px] h-[50px] flex items-center justify-center text-white p-2 bg-[#272727]">
                  MO
                </button>
              ) : (
                <button className=" rounded-full w-[50px] h-[50px] flex items-center justify-center text-white p-2 bg-[#272727]">
                  {SVGS.user}
                </button>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
export default Header;
