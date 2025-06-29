import React from 'react';
import logo from '../assets/icons/Logo .svg';

function Footer({ onHome, onAbout, onOrder, onReservation }) {
  return (
    <footer className="bg-charcoal text-highlight font-karla px-4 py-10 text-sm md:text-base">
      <div className="max-w-6xl mx-auto flex  md:flex-row justify-between items-start gap-10">
        {/* Logo */}
        <div className="flex flex-col items-start gap-2">
          <img src={logo} alt="Little Lemon Logo" className="h-10" />
          <p className="text-highlight text-opacity-70">© {new Date().getFullYear()} Little Lemon</p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col gap-1">
          <h4 className="text-accent font-markazi text-xl">Quick Links</h4>
          <button onClick={onHome} className="hover:underline underline-offset-4  text-left">Home</button>
          <button onClick={onAbout} className="hover:underline underline-offset-4 text-left">About</button>
          <button onClick={onOrder} className="hover:underline underline-offset-4 text-left">Order</button>
          <button onClick={onReservation} className="hover:underline underline-offset-4 text-left">Reservations</button>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col  gap-1">
          <h4 className="text-accent font-markazi text-xl">Contact</h4>
          <p>123 Lemon Street, Chicago, IL</p>
          <p>info@littlelemon.com</p>
          <p>(312) 555-1234</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
