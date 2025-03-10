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
import Logo from "./Logo";  // <-- Added Logo import

// Register chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement);

export const App = () => {
  // Sidebar toggle
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Data states populated from the API
  const [topSkills, setTopSkills] = useState([]);
  const [jobCount, setJobCount] = useState(0);
  const [educationCounts, setEducationCounts] = useState({});
  const [regionData, setRegionData] = useState({});

  useEffect(() => {
    fetchTopSkills()
      .then((data) => {
        setTopSkills(data.topSkills);
        setJobCount(data.jobCount);
        setEducationCounts(data.educationCounts);
        setRegionData(data.regionPercentages);
      })
      .catch((error) => {
        console.error("Error fetching skills data:", error);
      });
  }, []);

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
      </div>

       {/* Logo in top-right corner */}
       <div className="absolute top-0 right-10 m-10">
        <Logo />
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
