// src/About.jsx
import React from "react";
import Logo from "./Logo"; // same logo as the dashboard
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-white">
      {/* Logo + nav buttons in top right */}
      <div className="absolute top-0 right-10 m-10 flex items-center space-x-4">
        <Logo />
        {/* Buttons: Dashboard + About (you're on About now) */}
        <Link
          to="/"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Dashboard
        </Link>
      </div>

      {/* Main content: text, get started button */}
      <div className="flex flex-col items-center justify-center h-full pt-32">
        <h1 className="text-4xl font-semibold mb-4 text-gray-800">
          Invest in the Right Skills
        </h1>
        <p className="text-gray-600 text-lg max-w-xl text-center mb-8">
          Job qualification analytics based on current open-source job postings.
          Discover the most in-demand tech skills and academic requirements in the industry.
        </p>

        {/* "Get Started" button -> goes back to dashboard */}
        <Link
          to="/"
          className="bg-blue-500 text-white px-6 py-3 rounded text-lg hover:bg-blue-600"
        >
          Get Started
        </Link>
      </div>

      {/* Moving cloud animation at the bottom */}
      <div className="absolute bottom-0 w-full overflow-hidden">
        <div style={{ animation: 'moveClouds 30s linear infinite' }}>
          <svg
            viewBox="0 0 1440 320"
            className="w-full h-40"
            preserveAspectRatio="none"
          >
            <path
              fill="#d0e7ff"
              d="M0,192L30,186.7C60,181,120,171,180,144C240,117,300,75,360,69.3C420,64,480,96,540,101.3C600,107,660,85,720,96C780,107,840,149,900,165.3C960,181,1020,171,1080,154.7C1140,139,1200,117,1260,106.7C1320,96,1380,96,1410,96L1440,96L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"
            />
          </svg>
        </div>
        <style>{`
          @keyframes moveClouds {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }
        `}</style>
      </div>
    </div>
  );
}
