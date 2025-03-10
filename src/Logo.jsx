// src/Logo.jsx
import React from "react";

const Logo = () => {
  return (
    <div className="flex items-center space-x-2">
      {/* Custom SVG icon (a simple crosshair/target icon) */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-14 h-14 text-blue-500"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        {/* This path creates a simple crosshair icon.
            You can tweak the path data for a different look. */}
        <path d="M12 2a.75.75 0 01.75.75v2.018a8.25 8.25 0 016.482 6.482h2.018a.75.75 0 010 1.5h-2.018a8.25 8.25 0 01-6.482 6.482v2.018a.75.75 0 01-1.5 0v-2.018a8.25 8.25 0 01-6.482-6.482H2.75a.75.75 0 010-1.5h2.018a8.25 8.25 0 016.482-6.482V2.75A.75.75 0 0112 2zm0 5.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9z" />
      </svg>

      {/* "SkillScope" text with a blue gradient */}
      <h1 className="text-5xl font-light bg-gradient-to-r from-blue-700 to-blue-400 text-transparent bg-clip-text">
        SkillScope
      </h1>
    </div>
  );
};

export default Logo;
