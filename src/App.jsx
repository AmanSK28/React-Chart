// src/App.js
import React, { useState, useEffect } from "react";
import "./index.css";
import "./App.css";
import { fetchTopSkills } from "./JobApi"; // (1) Import the function
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export const App = () => {
  // Sidebar toggle state
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Top skills state
  const [topSkills, setTopSkills] = useState([]);

  useEffect(() => {
    const getTopSkills = async () => {
      // Fetch top skills across 3 pages
      const skillsData = await fetchTopSkills(6);
      setTopSkills(skillsData);
    };
    getTopSkills();
  }, []);
  

  // (3) Prepare data for the Bar chart
  // topSkills is an array of [skill, count], e.g. [ ["JavaScript", 15], ["Python", 13]... ]
  const skillLabels = topSkills.map((skill) => skill[0]);
  const skillCounts = topSkills.map((skill) => skill[1]);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`bg-gray-800 text-white p-4 transition-all duration-300 ${
          isSidebarOpen ? "w-64" : "w-16"
        }`}
      >
        {/* Sidebar Toggle Button */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="bg-gray-700 w-full p-2 mb-4 rounded"
        >
          {isSidebarOpen ? "<<" : ">>"}
        </button>
      </div>

      {/* Main Content (Charts) */}
      <div
        className={`transition-all duration-300 p-6 ${
          isSidebarOpen ? "w-3/4" : "w-full"
        }`}
      >
        <div className="grid grid-rows-2 grid-cols-2 gap-4 w-full">
          {/* Chart 1 - Top 5 Technical Tools */}
          <div className="col-span-2 bg-white p-6 rounded-lg shadow-md h-96 flex flex-col justify-center items-center">
            <h2 className="text-lg font-semibold mb-4">Top 5 Technical Tools</h2>
            <Bar
              data={{
                labels: skillLabels,
                datasets: [
                  {
                    label: "Demand Count",
                    data: skillCounts,
                    backgroundColor: "rgba(54, 162, 235, 0.6)",
                    borderColor: "rgba(54, 162, 235, 1)",
                    borderWidth: 1,
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
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
