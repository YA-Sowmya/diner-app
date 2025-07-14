import React, { useState } from "react";
import logo from "../assets/icons/Logo .svg";
import hamburger from "../assets/icons/Hamburger icon.svg";
import close from "../assets/icons/Close.svg";

function Navbar({
  isLoggedIn,
  cartItems = [],
  onHome,
  onAbout,
  onOrder,
  onReservation,
  onLogin,
  onLogout,
  onCart,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-highlight text-charcoal sticky  top-0 z-50 shadow-sm font-markazi">
      <div className="flex items-center justify-between px-4 py-3 md:max-w-8xl md:mx-auto">
        <button className="md:hidden" onClick={() => setMenuOpen(true)}>
          <img
            src={hamburger}
            alt="Menu"
            className="h-6 w-6 "
            style={{
              filter:
                "invert(27%) sepia(13%) saturate(1100%) hue-rotate(60deg)",
            }}
          />
        </button>

        <img
          src={logo}
          alt="Little Lemon Logo"
          className="h-12 cursor-pointer"
          onClick={onHome}
        />

        <div className="md:hidden text-lg relative min-w-[60px] flex flex-end text-primary cursor-pointer">
          <span onClick={onCart} className="relative cursor-pointer">
            <span className="hover:underline ">Cart</span>
            <span className="ml-1 bg-accent text-primary min-w-[24px] text-center rounded-full px-2 ">
              {cartCount}
            </span>
          </span>
        </div>

        <div className="hidden md:flex w-full items-center justify-between text-primary text-[25px]">
          <div className="flex-1 flex justify-center gap-6">
            <span
              onClick={onHome}
              className="cursor-pointer hover:underline hover:underline-offset-4"
            >
              Home
            </span>
            <span
              onClick={onAbout}
              className="cursor-pointer hover:underline hover:underline-offset-4"
            >
              About
            </span>
            <span
              onClick={onOrder}
              className="cursor-pointer hover:underline hover:underline-offset-4"
            >
              Order
            </span>
            <span
              onClick={onReservation}
              className="cursor-pointer hover:underline hover:underline-offset-4"
            >
              Reservations
            </span>
          </div>

          <div className="flex flex-end min-w-[140px] justify-between items-center gap-4">
            <span
              onClick={onCart}
              className="relative cursor-pointer min-w-[60px] flex justify-between items-center"
            >
              <span className="hover:underline">Cart</span>
              <span className="ml-1 bg-accent text-primary rounded-full px-2 min-w-[24px] text-center">
                {cartCount}
              </span>
            </span>

            {isLoggedIn ? (
              <span
                onClick={onLogout}
                className="cursor-pointer hover:underline min-w-[60px] text-center"
              >
                Logout
              </span>
            ) : (
              <span
                onClick={onLogin}
                className="cursor-pointer hover:underline min-w-[60px] text-center"
              >
                Login
              </span>
            )}
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="absolute top-full left-0 w-full h-[32vh] bg-highlight z-40 shadow-md px-6 items-center  py-6 flex flex-col justify-center gap-2 text-xl text-primary font-markazi">
          <button
            className="absolute top-4 right-4"
            onClick={() => setMenuOpen(false)}
          >
            <img
              src={close}
              alt="Close menu"
              className="h-3 w-3"
              style={{
                filter:
                  "invert(27%) sepia(13%) saturate(1100%) hue-rotate(60deg)",
              }}
            />
          </button>

          <span
            onClick={() => {
              setMenuOpen(false);
              onHome();
            }}
          >
            Home
          </span>
          <span
            onClick={() => {
              setMenuOpen(false);
              onAbout();
            }}
          >
            About
          </span>
          <span
            onClick={() => {
              setMenuOpen(false);
              onOrder();
            }}
          >
            Order
          </span>
          <span
            onClick={() => {
              setMenuOpen(false);
              onReservation();
            }}
          >
            Reservations
          </span>

          {isLoggedIn ? (
            <span
              onClick={() => {
                setMenuOpen(false);
                onLogout();
              }}
            >
              Logout
            </span>
          ) : (
            <span
              onClick={() => {
                setMenuOpen(false);
                onLogin();
              }}
            >
              Login
            </span>
          )}
        </div>
      )}
    </header>
  );
}

export default Navbar;
