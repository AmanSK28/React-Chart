// src/App.jsx
import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
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
import Logo from "./Logo";

// Register chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement);

// DashboardPage: your existing dashboard code (charts, sidebar, etc.)
function DashboardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
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

  const skillLabels = topSkills.map((skill) => skill[0]);
  const skillPercentages = topSkills.map((skill) =>
    jobCount > 0 ? ((skill[1] / jobCount) * 100).toFixed(2) : 0
  );

  return (
    <div className="flex min-h-screen w-full overflow-x-hidden relative">
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

      {/* Navigation: Logo and nav buttons in top-right */}
      <div className="absolute top-0 right-10 m-10 flex items-center space-x-4">
        <Logo />
        <Link
          to="/"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Dashboard
        </Link>
        <Link
          to="/about"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          About
        </Link>
      </div>

      {/* Main Content with a top margin for future menu */}
      <div className="mt-16 p-6 flex-1">
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
}

// AboutPage: A simple landing page for the About section
function AboutPage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-white">
      {/* Top right navigation, same as Dashboard */}
      <div className="absolute top-0 right-10 m-10 flex items-center space-x-4">
        <Logo />
        <Link
          to="/"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Dashboard
        </Link>
        <Link
          to="/about"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          About
        </Link>
      </div>

      {/* About Content */}
      <div className="flex flex-col items-center justify-center h-full pt-32">
        <h1 className="text-4xl font-semibold mb-4 text-gray-800">
          About SkillScope
        </h1>
        <p className="text-gray-600 text-lg max-w-xl text-center mb-8">
          SkillScope helps software developers understand which technical skills
          and academic levels are in-demand. Discover regional trends and make
          data-driven career decisions.
        </p>
        <Link
          to="/"
          className="bg-blue-500 text-white px-6 py-3 rounded text-lg hover:bg-blue-600"
        >
          Get Started
        </Link>
      </div>

      {/* Cloud Animation at the Bottom */}
      <div className="absolute bottom-0 w-full">
        <svg
          viewBox="0 0 1440 320"
          className="w-full h-40 text-blue-100"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            d="M0,224L30,192C60,160,120,96,180,85.3C240,75,300,117,360,122.7C420,128,480,96,540,74.7C600,53,660,43,720,64C780,85,840,139,900,165.3C960,192,1020,192,1080,186.7C1140,181,1200,171,1260,149.3C1320,128,1380,96,1410,80L1440,64L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"
          />
        </svg>
      </div>
    </div>
  );
}

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/about" element={<AboutPage />} />
    </Routes>
  );
};

export default App;
