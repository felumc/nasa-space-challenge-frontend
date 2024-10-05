import React, { useEffect, useState } from 'react';
import * as Plotly from 'plotly.js-dist';
import { io, Socket } from 'socket.io-client';

interface SeismicData {
  activity: number;
}

// Initialize the WebSocket connection
const socket: Socket = io('http://localhost:5035');

const App: React.FC = () => {
  const [xData, setXData] = useState<string[]>([]);
  const [yData, setYData] = useState<number[]>([]);

  useEffect(() => {
    // Initialize Plotly chart on mount
    Plotly.newPlot('chart', [{
      x: [],
      y: [],
      mode: 'lines',
      line: { color: '#80CAF6' }
    }], {
      title: 'Seismic Data',
      xaxis: { title: 'Time' },
      yaxis: { title: 'Seismic Activity' }
    });

    // Listen for seismic data from the Flask server via WebSocket
    socket.on('update_chart', (data: SeismicData) => {
      const time = new Date().toLocaleTimeString();

      // Log the received data to the console
      console.log(`Received data: ${JSON.stringify(data)} at ${time}`);

      // Update state with new data using functional updates
      setXData(prevXData => {
        const updatedXData = [...prevXData, time];
        // Keep only the last 20 points
        if (updatedXData.length > 20) {
          updatedXData.shift(); // Remove the oldest point
        }
        return updatedXData;
      });

      setYData(prevYData => {
        const updatedYData = [...prevYData, data.activity];
        // Keep only the last 20 points
        if (updatedYData.length > 20) {
          updatedYData.shift(); // Remove the oldest point
        }
        return updatedYData;
      });

      // Update the chart with new data
      Plotly.extendTraces('chart', {
        x: [[time]],
        y: [[data.activity]]
      }, [0]);

      // Keep only the last 20 points on the chart
      Plotly.relayout('chart', {
        xaxis: {
          range: [Math.max(0, xData.length - 20), xData.length] // Ensure correct range
        }
      });
    });

    // No cleanup function needed to keep the socket connection open
    return () => {
      // Optionally keep the socket listener cleanup if needed
      // socket.off('update_chart');
    };
  }, []); // Use an empty dependency array to run this effect only on mount

  return (
    <div>
      <h1>Live Seismic Data from Moon & Mars</h1>
      <div id="chart" style={{ width: '100%', height: '400px' }} />
    </div>
  );
};

export default App;
