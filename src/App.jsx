// src/App.jsx
import React, { useState } from "react";
import "./index.css";
import "./App.css";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import UKMapChart from "./UKMapChart";

// Register chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement);

export const App = () => {
  // Sidebar toggle state
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Hardcoded data for demonstration
  // 1) Top 5 Skills
  const [topSkills] = useState([
    ["Python", 400],
    ["SQL", 350],
    ["React", 300],
    ["AWS", 200],
    ["Docker", 150],
  ]);
  // Total job count
  const [jobCount] = useState(1000);

  // 2) Education levels
  const [educationCounts] = useState({
    "Bachelor's": 600,
    "Master's": 300,
    "PhD": 100,
  });

  // 3) Updated region data for UK
  const [regionData] = useState({
    ENG: 58.06, // England - 58.06% of jobs
    SCT: 13.55, // Scotland - 13.55% of jobs
    WLS: 4.52,  // Wales - 4.52% of jobs
    NIR: 0.65,  // Northern Ireland - 0.65% of jobs
  });

  // Chart data prep
  const skillLabels = topSkills.map((skill) => skill[0]);
  const skillPercentages = topSkills.map((skill) =>
    jobCount > 0 ? ((skill[1] / jobCount) * 100).toFixed(2) : 0
  );

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`bg-gray-800 text-white p-4 transition-all duration-300 ${
          isSidebarOpen ? "w-64" : "w-16"
        }`}
      >
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="bg-gray-700 w-full p-2 mb-4 rounded"
        >
          {isSidebarOpen ? "<<" : ">>"}
        </button>
      </div>

      {/* Main Content */}
      <div className={`transition-all duration-300 p-6 ${isSidebarOpen ? "w-3/4" : "w-full"}`}>
        <div className="grid grid-rows-2 grid-cols-2 gap-4 w-full">
          {/* Chart 1 - Top Skills Bar Chart */}
          <div className="col-span-2 bg-white p-6 rounded-lg shadow-md h-96 flex flex-col justify-center items-center">
            <h2 className="text-lg font-semibold mb-4">
              Top 5 Technical Tools Based on {jobCount} Jobs
            </h2>
            <Bar
              data={{
                labels: skillLabels,
                datasets: [
                  {
                    label: "Percentage of Jobs (%)",
                    data: skillPercentages,
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

          {/* Chart 2 - Education Level Doughnut Chart */}
          <div className="bg-white p-6 rounded-lg shadow-md h-80 flex flex-col justify-center items-center">
            <h2 className="text-lg font-semibold mb-4">
              Level of Education Based on {jobCount} Jobs
            </h2>
            <div className="w-full h-full flex justify-center items-center">
              <Doughnut
                data={{
                  labels: Object.keys(educationCounts),
                  datasets: [
                    {
                      data: Object.values(educationCounts).map((val) =>
                        jobCount > 0 ? Number(((val / jobCount) * 100).toFixed(2)) : 0
                      ),
                      backgroundColor: ["#FFCE56", "#36A2EB", "#4BC0C0"],
                      hoverBackgroundColor: ["#FFB74D", "#64B5F6", "#80CBC4"],
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { position: "top" },
                    tooltip: {
                      callbacks: {
                        label: function (context) {
                          let label = context.label || "";
                          if (label) {
                            label += ": ";
                          }
                          if (context.parsed !== null) {
                            label += context.parsed + "%";
                          }
                          return label;
                        },
                      },
                    },
                  },
                }}
              />
            </div>
          </div>

          {/* Chart 3 - UK Map with Job Distribution */}
          <div className="bg-white p-6 rounded-lg shadow-md h-80 flex flex-col justify-center items-center">
            <h2 className="text-lg font-semibold mb-4">Job Distribution Across the UK</h2>
            <UKMapChart regionData={regionData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
