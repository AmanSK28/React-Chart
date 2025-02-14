import React from 'react';
import './index.css';
import "./App.css";

// Register necessary components for Chart.js
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export const App = () => {
  return (
    <div className="App">
      {/* Section for different chart cards */}
      <div className="dataCard TechnicalSkills">Chart 1</div>
      <div className="dataCard SoftSkills">Chart 2</div>
      
      {/* Bar chart displaying revenue data */}
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

      <div className="dataCard RevenueCard">Chart 3</div>
    </div>
  );
};

export default App;
