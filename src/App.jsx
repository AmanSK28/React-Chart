// src/App.jsx
import React, { useState, useEffect } from "react";
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
import { fetchTopSkills } from "./JobApi";
import Logo from "./Logo";  // <-- Logo import

// Register chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement);

export const App = () => {
  // Sidebar toggle
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Dropdown state
  const [selectedRole, setSelectedRole] = useState("all");
  const [selectedRegion, setSelectedRegion] = useState("all");

  // Data states populated from the API
  const [topSkills, setTopSkills] = useState([]);
  const [jobCount, setJobCount] = useState(0);
  const [educationCounts, setEducationCounts] = useState({});
  const [regionData, setRegionData] = useState({});

  // Fetch data whenever selectedRole or selectedRegion changes
  useEffect(() => {
    fetchTopSkills(1, selectedRole, selectedRegion)
      .then((data) => {
        setTopSkills(data.topSkills);
        setJobCount(data.jobCount);
        setEducationCounts(data.educationCounts);
        setRegionData(data.regionPercentages);
      })
      .catch((error) => {
        console.error("Error fetching skills data:", error);
      });
  }, [selectedRole, selectedRegion]);

  // Prepare data for Bar chart
  const skillLabels = topSkills.map((skill) => skill[0]);
  const skillPercentages = topSkills.map((skill) =>
    jobCount > 0 ? ((skill[1] / jobCount) * 100).toFixed(2) : 0
  );

  return (
    <div className="flex min-h-screen w-full overflow-x-hidden">
      {/* Sidebar flush left */}
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

        {/* Only show dropdowns when sidebar is open */}
        {isSidebarOpen && (
          <div className="space-y-6">
            {/* Dropdown for Role Selection */}
            <div>
              <label
                className="block text-base font-medium mb-2"
                htmlFor="roleSelect"
              >
                Select Role
              </label>
              <div className="relative">
                <select
                  id="roleSelect"
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="block w-full p-3 bg-gray-700 text-white rounded appearance-none 
                             focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All</option>
                  <option value="software engineering">Software Engineering</option>
                  <option value="software developer">Software Developer</option>
                  <option value="frontend developer">Frontend Developer</option>
                  <option value="full stack developer">Full Stack Developer</option>
                  <option value="dev ops engineer">Dev Ops Engineer</option>
                </select>
                {/* Optional custom arrow icon */}
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.44l3.71-3.21a.75.75 0 111.04 1.08l-4.24 3.67a.75.75 0 01-.98 0l-4.24-3.67a.75.75 0 01.02-1.06z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Dropdown for Region Selection */}
            <div>
              <label
                className="block text-base font-medium mb-2"
                htmlFor="regionSelect"
              >
                Select Region
              </label>
              <div className="relative">
                <select
                  id="regionSelect"
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="block w-full p-3 bg-gray-700 text-white rounded appearance-none 
                             focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All</option>
                  <option value="england">England</option>
                  <option value="scotland">Scotland</option>
                  <option value="wales">Wales</option>
                  <option value="northern ireland">Northern Ireland</option>
                </select>
                {/* Optional custom arrow icon */}
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.44l3.71-3.21a.75.75 0 111.04 1.08l-4.24 3.67a.75.75 0 01-.98 0l-4.24-3.67a.75.75 0 01.02-1.06z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 
        Navigation in top-left: 
        Moved from right-10 to left-10 
        Added "Repository" button 
      */}
      <div className="absolute top-0 right-10 m-10 flex items-center space-x-4">
        <Logo />
        <a
          href="/"
          className="bg-gradient-to-r from-blue-700 to-blue-400 text-white px-4 py-2 
                     rounded transition duration-300 transform hover:scale-105"
        >
          Dashboard
        </a>
        <a
          href="https://github.com/AmanSK28/React-Chart"
          className="bg-gradient-to-r from-blue-700 to-blue-400 text-white px-4 py-2 
                     rounded transition duration-300 transform hover:scale-105"
        >
          Repository
        </a>
        <a
          href="/about.html"
          className="bg-gradient-to-r from-blue-700 to-blue-400 text-white px-4 py-2 
                     rounded transition duration-300 transform hover:scale-105"
        >
          About
        </a>
      </div>

      {/* Main Content with a top margin for future menu */}
      <div className="-mt-[-100px] p-6 flex-1">
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
          <div className="bg-white p-6 rounded-lg shadow-md h-96 flex flex-col justify-center items-center">
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
          <div className="bg-white p-6 rounded-lg shadow-md h-96 flex flex-col justify-center items-center">
            <h2 className="text-lg font-semibold mb-4">
              Job Distribution Across the UK Based on {jobCount} Jobs
            </h2>
            <div className="w-full h-full">
              <UKMapChart regionData={regionData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
