import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { NAVLINKS, SVGS, type Navlinks } from "../../constants/home";
import { useCart } from "../../contexts/CartContext";

const Header = ({ auth }: { auth: boolean }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { state } = useCart();
  const location = useLocation();
  const { pathname } = location;

  const cartItemCount = state.items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const DETAIL_PATHNAME = pathname.slice(1, 15);
  const CART_PATHNAME = pathname.slice(1, 5);
  console.log(CART_PATHNAME);
  const navigate = useNavigate();

  const toggleBack = () => {
    navigate(-1);
  };

  return (
    <>
      <header className="w-full  fixed top-0 left-0 z-50 bg-[#ebebeb]">
        <div className="max-w-[1800px] md:px-10 px-6 mx-auto p-3 flex justify-between items-center">
          <nav className={`flex  items-center gap-[2rem] `}>
            {DETAIL_PATHNAME === "product-detail" ||
            CART_PATHNAME === "cart" ? (
              <button
                className="flex items-center justify-center md:hidden"
                onClick={toggleBack}
              >
                {" "}
                {SVGS.arrowBack}{" "}
              </button>
            ) : (
              <button
                className="flex items-center justify-center md:hidden"
                onClick={toggleSidebar}
              >
                {" "}
                {SVGS.bar}{" "}
              </button>
            )}

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
            className={` ${
              DETAIL_PATHNAME === "product-detail" || CART_PATHNAME === "cart"
                ? "hidden"
                : ""
            } absolute left-[50%] -translate-x-[50%] h-[30px] w-[30px]`}
            alt="logo"
            loading="lazy"
          />

          <div className="flex items-center justify-between  ">
            {/*Mobile*/}
            <div className="flex md:hidden items-center justify-between gap-2">
              <Link
                to="/cart"
                className="relative border-[4px] rounded-full p-2 border-[#272727] block"
              >
                {SVGS.cart}
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {cartItemCount > 99 ? "99+" : cartItemCount}
                  </span>
                )}
              </Link>

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
              <Link to="/cart" className="flex items-center relative">
                <div className="w-[80px] h-[50px] flex items-center justify-center p-2 text-white rounded-[22px] bg-[#272727] hover:bg-gray-800 transition-colors">
                  Cart
                </div>
                <div className="border-[6px] -ml-1 rounded-full p-2 border-[#272727] relative">
                  {SVGS.cart}
                  {cartItemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                      {cartItemCount > 99 ? "99+" : cartItemCount}
                    </span>
                  )}
                </div>
              </Link>

              {/*Use auth section */}
              {auth ? (
                <button className=" rounded-full w-[50px] h-[50px] flex items-center justify-center text-white p-2 bg-[#272727]">
                  MO
                </button>
              ) : (
                <div className="relative">
                  <button
                    className="rounded-full w-[50px] h-[50px] flex items-center justify-center text-white p-2 bg-[#272727] hover:bg-gray-800 transition-colors"
                    onClick={toggleDropdown}
                  >
                    {SVGS.user}
                  </button>

                  {isDropdownOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={closeDropdown}
                      />
                      <div className="absolute right-0 top-full mt-2 w-48 bg-[#d4d4d4]  shadow-lg border z-20">
                        <div className="-2">
                          <Link
                            target="_blank"
                            to="/login"
                            className="block px-4 py-2 text-sm text-[#272727] hover:bg-[#ebebeb] transition-colors"
                            onClick={closeDropdown}
                          >
                            Login
                          </Link>
                          <Link
                            target="_blank"
                            to="/signup"
                            className="block px-4 py-2 text-sm text-[#272727] hover:bg-[#ebebeb] transition-colors"
                            onClick={closeDropdown}
                          >
                            Sign Up
                          </Link>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 bg-opacity-50 z-40 md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-70 bg-[#ebebeb] z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between mb-8">
            <img
              src="/src/assets/images/logo.png"
              className="h-[30px] w-[30px]"
              alt="logo"
              loading="lazy"
            />
            <button
              onClick={closeSidebar}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-4">
            {NAVLINKS.map((nav: Navlinks) => (
              <Link
                key={nav.link}
                to={nav.link}
                className="block py-3 px-4 text-lg font-medium text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={closeSidebar}
              >
                {nav.name}
              </Link>
            ))}
          </nav>

          {/* Sidebar Actions */}
          <div className="mt-8 space-y-4">
            <button className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-gray-100 rounded-lg">
              {SVGS.like}
              <span>Wishlist</span>
            </button>

            <Link
              to="/cart"
              className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              onClick={closeSidebar}
            >
              {SVGS.cart}
              <span>Cart</span>
            </Link>

            {auth ? (
              <button className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-[#272727] text-white rounded-lg">
                <span className="w-8 h-8 bg-white text-[#272727] rounded-full flex items-center justify-center font-bold">
                  MO
                </span>
                <span>Profile</span>
              </button>
            ) : (
              <button className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-[#272727] text-white rounded-lg">
                {SVGS.user}
                <span>Sign In</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default Header;
