import React, { useState } from "react";
import "./index.css";
import "./App.css";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export const App = () => {
  // Sidebar toggle state
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Dropdown states for filters
  const [showRegion, setShowRegion] = useState(false);
  const [showJobType, setShowJobType] = useState(false);
  const [showRole, setShowRole] = useState(false);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className={`bg-gray-800 text-white p-4 transition-all duration-300 ${isSidebarOpen ? "w-64" : "w-16"}`}>
        {/* Sidebar Toggle Button */}
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="bg-gray-700 w-full p-2 mb-4 rounded"
        >
          {isSidebarOpen ? "<<" : ">>"}
        </button>

        {/* Sidebar Filters */}
        {isSidebarOpen && (
          <div>
            {/* Region Filter */}
            <button className="bg-gray-700 w-full p-2 mb-2 rounded" onClick={() => setShowRegion(!showRegion)}>Region</button>
            {showRegion && <div className="bg-gray-600 p-2 rounded">Lorem Ipsum 1</div>}

            {/* Job Type Filter */}
            <button className="bg-gray-700 w-full p-2 mb-2 rounded" onClick={() => setShowJobType(!showJobType)}>Job Type</button>
            {showJobType && <div className="bg-gray-600 p-2 rounded">Lorem Ipsum 2</div>}

            {/* Role Filter */}
            <button className="bg-gray-700 w-full p-2 mb-2 rounded" onClick={() => setShowRole(!showRole)}>Role</button>
            {showRole && <div className="bg-gray-600 p-2 rounded">Lorem Ipsum 3</div>}
          </div>
        )}
      </div>

      {/* Main Content (Charts) */}
      <div className={`transition-all duration-300 p-6 ${isSidebarOpen ? "w-3/4" : "w-full"}`}>
        <div className="grid grid-rows-2 grid-cols-2 gap-4 w-full">
          {/* Chart 1 - Full width when sidebar is closed */}
          <div className="col-span-2 bg-white p-6 rounded-lg shadow-md h-96 flex justify-center items-center">
            <h2 className="text-lg font-semibold">Chart 1</h2>
            <Bar 
              data={{
                labels: ["A", "B", "C"],
                datasets: [
                  {
                    label: "Revenue",
                    data: [200, 300, 400],
                  },
                ],
              }}
            />
          </div>

          {/* Chart 2 */}
          <div className="bg-white p-6 rounded-lg shadow-md h-80 flex justify-center items-center">
            <h2 className="text-lg font-semibold">Chart 2</h2>
          </div>

          {/* Chart 3 */}
          <div className="bg-white p-6 rounded-lg shadow-md h-80 flex justify-center items-center">
            <h2 className="text-lg font-semibold">Chart 3</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
