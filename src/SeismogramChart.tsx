import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { ChartOptions } from "chart.js";
import Modal from './Modal';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the chart components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface ModalProps {
    object: string;
    status: boolean;
  }

const SeismogramChart: React.FC<ModalProps> = ({ object, status }) => {
  // State for the chart data
  const [data, setData] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);
  const [isModalVisible, setModalVisible] = useState(false); 
  const [description, setDescription] = useState("No relevant seismic activity is being sent back to Earth.");

  useEffect(() => {
    // Function to generate random seismic data
    const addRandomData = () => {
      // Random value between -100 and 100
      const randomValue = Math.floor(Math.random() * 5);
      const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }); // Current time

      // Add the new random value and timestamp
      setData((prevData) => [...prevData.slice(-19), randomValue]); // Keep only the last 20 data points
      setLabels((prevLabels) => [...prevLabels.slice(-19), timestamp]); // Keep only the last 20 labels
    };

    const addNoData = () => {
        // Random value between -100 and 100
        const randomValue = 0
        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }); // Current time
  
        // Add the new random value and timestamp
        setData((prevData) => [...prevData.slice(-19), randomValue]); // Keep only the last 20 data points
        setLabels((prevLabels) => [...prevLabels.slice(-19), timestamp]); // Keep only the last 20 labels
      };

      // Change the description based on the status
    setDescription(status ? "The seismic activity is being processed in real-time on " + object : "No relevant seismic activity is being sent back to Earth.");

    // Add random data every second
    const intervalId = setInterval(status == true ? addRandomData: addNoData, 200);

    // Cleanup function to stop the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [status]);

  // Chart.js configuration for the seismogram
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Relevant Seismic Activity",
        data: data,
        borderColor: object  === "Mars" ? "rgba(208,156,88,255)": "rgba(255, 255, 255, 0.5)",
        borderWidth: 2,
        fill: false,
        tension: 0.4, // Smooth the line
      },
      {
        label: "Threshold",
        data: Array(20).fill(2), // Array of 20 values of 50
        borderColor: "red",
        borderWidth: 1,
        borderDash: [5, 5], // Dashed line
        fill: false,
      }
    ],
  };

  const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    animation: false as const,
    scales: {
      x: {
        type: 'category' as const,
        ticks: {
          color: "white",
        },
      },
      y: {
        title: {
          display: true,
          text: "STA/LTA Ratio",
          color: "white",
        },
        ticks: {
          color: "white",
        },
        min: 0,
        max: 5,
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "white",
        },
      },
    },
  };
  
  

  return (
    <>
    <div style={{
        position: "fixed",
        top: 10,
        right: 10,
        width: "35%",  // Adjust the width as needed
        height: "500px", // Adjust the height as needed
        zIndex: 1000,    // Ensure it stays on top
      }}>
      <Line data={chartData} options={chartOptions} />
      <div style={{
          textAlign: 'center',
          marginTop: '10px',
          color: 'white',
        }}>
        <span>{description}</span>
        <button onClick={() => setModalVisible(true)} style={{
          backgroundColor: 'transparent',
          color: 'white',
          border: 'none',
          textDecoration: 'underline',
          cursor: 'pointer',
          marginTop: '10px',
          marginBottom: '10px',
        }}>
          Tap to learn more
        </button>
      </div>
      <Modal 
        isVisible={isModalVisible} 
        onClose={() => setModalVisible(false)} 
        title={"Random Forest Processing on " + object}
        description="The high cost of power to send constant seismic data is alleviated by our Random Forest Algorithm, which detects relevant seismic data and sends it back to Earth with an accuracy of 87.8% in real time, thus saving power."
        object={object}
      />
    </div>
    
    </>
  );
};

export default SeismogramChart;
