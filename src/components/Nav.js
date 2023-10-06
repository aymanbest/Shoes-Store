import React, { useState, useEffect } from "react";
import { headerLogo } from "../assets/images";
import { navLinks } from "../constants";
import SignInSignUpModal from "./SignInSignUp";

const Nav = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("loggedIn") === "true"
  );
  const [showSignIn, setShowSignIn] = useState(true); // Added state for showing Sign In or X

  const openModal = () => {
    setIsModalOpen(!isModalOpen); // Toggle modal
    setShowSignIn(!showSignIn); // Toggle the Sign In state
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setShowSignIn(true); // Reset to Sign In when closing the modal
  };

  const handleSignIn = (success) => {
    setLoggedIn(success);
    if (success) {
      localStorage.setItem("loggedIn", true);
    }
    setShowSignIn(true); // Reset to Sign In after successful sign-in
  };

  const handleSignOut = () => {
    setLoggedIn(false);
    localStorage.removeItem("loggedIn");
  };

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`px-4 py-3 bg-gray-800 text-white sticky top-0 z-50 ${
        isScrolled ? "scrolled" : ""
      }`}
    >
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        <a href="/" className="text-2xl font-semibold">
          <img src={headerLogo} alt="logo" className="w-20" />
        </a>
        <ul className="hidden space-x-6 lg:flex">
          {navLinks.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className="hover:text-blue-500 transition duration-300"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        {loggedIn ? (
          <div className="flex space-x-4 items-center">
            <button
              className="text-blue-500 hover:underline"
              onClick={handleSignOut}
            >
              Sign out
            </button>
          </div>
        ) : (
          <>
            <div className="hidden lg:flex space-x-4 items-center">
              <button
                className={`text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded ${
                  showSignIn ? "" : "bg-red-500" // Conditionally set the background color
                }`}
                onClick={openModal}
              >
                {showSignIn ? "Sign in" : "X"} {/* Toggle Sign In or X text */}
              </button>
            </div>
          </>
        )}
        <div className="lg:hidden">
          <button className="text-white" onClick={openModal}>
            {isModalOpen ? (
              
              <span className="text-black text-2xl">&times;</span>
            ) : (
              
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
      <SignInSignUpModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSignIn={handleSignIn}
      />
    </header>
  );
};

export default Nav;
