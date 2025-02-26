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
  ArcElement, // <-- ArcElement is needed for Doughnut
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement);

export const App = () => {
  // Sidebar toggle state
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Top skills state & loading state
  const [topSkills, setTopSkills] = useState([]);
  const [jobCount, setJobCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [educationCounts, setEducationCounts] = useState({
    "Bachelor's": 0,
    "Master's": 0,
    "PhD": 0,
  });

  useEffect(() => {
    const getTopSkills = async () => {
      setLoading(true);
      const { topSkills, jobCount, educationCounts } = await fetchTopSkills();
      setTopSkills(topSkills);
      setJobCount(jobCount);
      setEducationCounts(educationCounts);
      setLoading(false);
    };
    getTopSkills();
  }, []);

  // Prepare data for the Bar chart
  const skillLabels = topSkills.map((skill) => skill[0]);
  const skillCounts = topSkills.map((skill) =>
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

      {/* Main Content (Charts) */}
      <div
        className={`transition-all duration-300 p-6 ${
          isSidebarOpen ? "w-3/4" : "w-full"
        }`}
      >
        <div className="grid grid-rows-2 grid-cols-2 gap-4 w-full">
          {/* Chart 1 - Top 5 Technical Tools */}
          <div className="col-span-2 bg-white p-6 rounded-lg shadow-md h-96 flex flex-col justify-center items-center">
            <h2 className="text-lg font-semibold mb-4">
              Top 5 Technical Tools Based on {jobCount} Jobs
            </h2>

            {loading ? (
              <p className="text-gray-600 text-lg">Loading data...</p>
            ) : (
              <Bar
                // Key ensures React re-renders chart when data changes
                key={JSON.stringify(skillCounts)}
                data={{
                  labels: skillLabels,
                  datasets: [
                    {
                      label: "Percentage of Jobs (%)",
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
            )}
          </div>

          {/* Education Level Doughnut Chart */}
          <div className="bg-white p-6 rounded-lg shadow-md h-80 flex flex-col justify-center items-center">
            <h2 className="text-lg font-semibold mb-4">
                Level of Education Based on {jobCount} Jobs
            </h2>
            {loading ? (
              <p className="text-gray-600 text-lg">Loading data...</p>
            ) : (
            <div className="w-full h-full flex justify-center items-center">
              <Doughnut
                // Key ensures React re-renders chart when data changes
                key={JSON.stringify(educationCounts)}
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
                    legend: {
                      position: "top",
                    },
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
        )}
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
