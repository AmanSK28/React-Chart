// src/App.jsx
import React, { useState, useEffect, useMemo } from "react";
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
import UKMapChart from "./UKMapchart";
import { fetchTopSkills } from "./JobApi";
import Logo from "./Logo";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement);

function ChartCard({ title, children, bodyHeightClass = "h-[260px] sm:h-[320px] lg:h-[360px]" }) {
  return (
    <section className="min-w-0 bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
      <div className="px-4 sm:px-6 py-4 border-b border-gray-100">
        <h2 className="text-sm sm:text-base font-semibold text-gray-800">{title}</h2>
      </div>

      <div className="p-4 sm:p-6">
        <div className={`relative w-full min-w-0 ${bodyHeightClass}`}>
          {children}
        </div>
      </div>
    </section>
  );
}

export const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [selectedRole, setSelectedRole] = useState("all");
  const [selectedRegion, setSelectedRegion] = useState("all");

  const [topSkills, setTopSkills] = useState([]);
  const [jobCount, setJobCount] = useState(0);
  const [educationCounts, setEducationCounts] = useState({});
  const [regionData, setRegionData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchTopSkills(1, selectedRole, selectedRegion)
      .then((data) => {
        setTopSkills(data.topSkills);
        setJobCount(data.jobCount);
        setEducationCounts(data.educationCounts);
        setRegionData(data.regionPercentages);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching skills data:", error);
        setLoading(false);
      });
  }, [selectedRole, selectedRegion]);

  const isDataLoading = loading || jobCount === 0;

  const skillLabels = useMemo(() => topSkills.map((skill) => skill[0]), [topSkills]);
  const skillPercentages = useMemo(
    () =>
      topSkills.map((skill) =>
        jobCount > 0 ? Number(((skill[1] / jobCount) * 100).toFixed(2)) : 0
      ),
    [topSkills, jobCount]
  );

  return (
    <div className="min-h-[100dvh] bg-gray-50">
      <div className="flex min-h-[100dvh] w-full overflow-x-hidden">
        {/* Mobile overlay */}
        {isSidebarOpen && (
          <button
            className="fixed inset-0 bg-black/40 z-30 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
            aria-label="Close sidebar overlay"
          />
        )}

        {/* Sidebar */}
        <aside
          className={[
            "fixed md:static inset-y-0 left-0 z-40 md:z-auto",
            "bg-gray-800 text-white w-72 md:w-64",
            "transform transition-transform duration-300",
            isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
          ].join(" ")}
        >
          <div className="p-4 h-full flex flex-col gap-6">
            <div className="flex items-center justify-between md:hidden">
              <span className="font-semibold">Filters</span>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="bg-gray-700 px-3 py-2 rounded"
              >
                Close
              </button>
            </div>

            <div className="space-y-6">
              {/* Role */}
              <div>
                <label className="block text-base font-medium mb-2" htmlFor="roleSelect">
                  Select Role
                </label>
                <div className="relative">
                  <select
                    id="roleSelect"
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="block w-full p-3 bg-gray-700 text-white rounded appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All</option>
                    <option value="software engineering">Software Engineering</option>
                    <option value="software developer">Software Developer</option>
                    <option value="frontend developer">Frontend Developer</option>
                    <option value="full stack developer">Full Stack Developer</option>
                    <option value="dev ops engineer">Dev Ops Engineer</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.44l3.71-3.21a.75.75 0 111.04 1.08l-4.24 3.67a.75.75 0 01-.98 0l-4.24-3.67a.75.75 0 01.02-1.06z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Region */}
              <div>
                <label className="block text-base font-medium mb-2" htmlFor="regionSelect">
                  Select Region
                </label>
                <div className="relative">
                  <select
                    id="regionSelect"
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    className="block w-full p-3 bg-gray-700 text-white rounded appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All</option>
                    <option value="england">England</option>
                    <option value="scotland">Scotland</option>
                    <option value="wales">Wales</option>
                    <option value="northern ireland">Northern Ireland</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.44l3.71-3.21a.75.75 0 111.04 1.08l-4.24 3.67a.75.75 0 01-.98 0l-4.24-3.67a.75.75 0 01.02-1.06z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main */}
        <div className="flex-1 min-w-0 flex flex-col">
          {/* Header */}
          <header className="sticky top-0 z-20 bg-gray-50/95 backdrop-blur border-b border-gray-200">
            <div className="px-4 sm:px-6 py-3 flex items-center gap-3 flex-wrap">
              <button
                className="md:hidden bg-gray-900 text-white px-3 py-2 rounded"
                onClick={() => setIsSidebarOpen(true)}
              >
                Filters
              </button>

              <div className="flex items-center gap-3">
                <Logo />
                <span className="font-semibold text-gray-800 hidden sm:inline">SkillScope</span>
              </div>

              <nav className="ml-auto flex items-center gap-2 flex-wrap justify-end">
                <a href="/" className="px-3 py-2 rounded text-white bg-gradient-to-r from-blue-700 to-blue-400">
                  Dashboard
                </a>
                <a
                  href="https://github.com/AmanSK28/React-Chart"
                  className="px-3 py-2 rounded text-white bg-gradient-to-r from-blue-700 to-blue-400"
                >
                  Repository
                </a>
                <a href="/about" className="px-3 py-2 rounded text-white bg-gradient-to-r from-blue-700 to-blue-400">
                  About
                </a>
              </nav>
            </div>
          </header>

          {/* Content */}
          <main className="px-4 sm:px-6 py-6 flex-1">
            {isDataLoading ? (
              <div className="bg-white p-6 rounded-lg shadow-md h-[320px] flex items-center justify-center">
                <span className="text-xl sm:text-2xl">Loading...</span>
              </div>
            ) : (
              <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
                {/* Bar */}
                <div className="lg:col-span-2 min-w-0">
                  <ChartCard title={`Top 5 Technical Tools Based on ${jobCount} Jobs`}>
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
                        plugins: { legend: { position: "top" } },
                      }}
                    />
                  </ChartCard>
                </div>

                {/* Doughnut */}
                <div className="min-w-0">
                  <ChartCard title={`Level of Education Based on ${jobCount} Jobs`}>
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
                        plugins: { legend: { position: "bottom" } },
                      }}
                    />
                  </ChartCard>
                </div>

                {/* MAP: taller than other charts */}
                <div className="min-w-0">
                  <ChartCard
                    title={`Job Distribution Across the UK Based on ${jobCount} Jobs`}
                    bodyHeightClass="h-[360px] sm:h-[440px] md:h-[520px] lg:h-[420px]"
                  >
                    <UKMapChart regionData={regionData} />
                  </ChartCard>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default App;