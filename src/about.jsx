// src/About.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./style.css"; // <-- Make sure style.css has your .wave classes

const About = () => {
  return (
    <div className="about-page bg-blue-200 text-gray-900 min-h-screen">
      {/* Header with Logo and Nav Buttons in Top-Right */}
      <header className="flex items-center justify-end p-4 sm:p-6">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-end sm:gap-6">
          {/* Inline Logo */}
          <div className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-10 sm:w-14 sm:h-14 text-blue-500"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2a.75.75 0 01.75.75v2.018a8.25 8.25 0 016.482 6.482h2.018a.75.75 0 010 1.5h-2.018a8.25 8.25 0 01-6.482 6.482v2.018a.75.75 0 01-1.5 0v-2.018a8.25 8.25 0 01-6.482-6.482H2.75a.75.75 0 010-1.5h2.018a8.25 8.25 0 016.482-6.482V2.75A.75.75 0 0112 2zm0 5.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9z" />
            </svg>
            <h1 className="text-3xl sm:text-5xl font-light bg-gradient-to-r from-blue-700 to-blue-400 text-transparent bg-clip-text">
              SkillScope
            </h1>
          </div>

          {/* Wave Section */}
          <section>
            <div className="wave wave1"></div>
            <div className="wave wave2"></div>
            <div className="wave wave3"></div>
            <div className="wave wave4"></div>
          </section>

          {/* Navigation Buttons */}
          <nav className="flex flex-row space-x-3 sm:space-x-4">
            {/* Link to Dashboard */}
            <Link
              to="/dashboard"
              className="bg-gradient-to-r from-blue-700 to-blue-400 text-white text-sm sm:text-base px-3 py-2 sm:px-4 sm:py-2 rounded hover:opacity-90 transition"
            >
              Dashboard
            </Link>

            {/* Link to About (this page) */}
            <Link
              to="/about"
              className="bg-gradient-to-r from-blue-700 to-blue-400 text-white text-sm sm:text-base px-3 py-2 sm:px-4 sm:py-2 rounded hover:opacity-90 transition"
            >
              About
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center min-h-[100svh] sm:h-screen text-center -mt-10 sm:-mt-20 px-4 sm:px-0">
        <div>
          {/* Bigger title */}
          <h1 className="text-4xl sm:text-6xl font-semibold mb-6 text-gray-800">
            Code Smarter, Grow Faster
          </h1>

          {/* Bigger paragraph */}
          <p className="text-lg sm:text-2xl mb-8 max-w-md sm:max-w-3xl text-gray-600">
            SkillScope helps software developers discover the most in-demand
            technical skills and academic requirements by analysing job postings
            across regions.
          </p>

          {/* "Get Started" goes to the dashboard */}
          <Link
            to="/dashboard"
            className="bg-gradient-to-r from-blue-700 to-blue-400 text-xl sm:text-2xl text-white px-6 py-3 sm:px-8 sm:py-4 rounded transition duration-300 transform hover:scale-105 hover:opacity-90"
          >
            Get Started
          </Link>
        </div>
      </main>
    </div>
  );
};

export default About;