import React, { useState, useEffect } from 'react';
import { Doughnut, Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Lead } from '../types';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);


interface LeadsChartsProps {
  leads: Lead[];
}

interface ChartData {
    labels: string[];
    datasets: Array<{
      label: string;
      data: number[];
      backgroundColor: string[];
    }>;
  }
  
  const LeadsCharts: React.FC<LeadsChartsProps> = ({ leads }) => {
    // Explicitly define the type for the chartData state
    const [chartData, setChartData] = useState<ChartData>({
      labels: [],
      datasets: [{
        label: 'Internship Interests',
        data: [],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#2ECC71',
          '#9B59B6',
          '#FFA500'
        ]
      }]
    });
  
    useEffect(() => {
      const interestCounts: { [key: string]: number } = {};
      leads.forEach(lead => {
        interestCounts[lead.internshipInterest] = (interestCounts[lead.internshipInterest] || 0) + 1;
      });
  
      setChartData({
        labels: Object.keys(interestCounts),
        datasets: [{
          label: 'Internship Interests',
          data: Object.values(interestCounts),
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#2ECC71',
            '#9B59B6',
            '#FFA500'
          ]
        }]
      });
    }, [leads]);
  
    return (
        <div className="chart-row">
          <div className="chart-container">
            <h2>Doughnut Chart</h2>
            <Doughnut data={chartData} />
          </div>
          <div className="chart-container">
            <h2>Bar Chart</h2>
            <Bar data={chartData} />
          </div>
          <div className="chart-container">
            <h2>Pie Chart</h2>
            <Pie data={chartData} />
          </div>
        </div>
      );
};
  
  export default LeadsCharts;