import React, { useEffect, useState } from "react";
import "./App.css";
import SeismogramChart from "./SeismogramChart.tsx";

function App() {
  const [currentModelIndex, setCurrentModelIndex] = useState(0);
  const [status, setStatus] = useState(false); // New state to track status

  const models = [
    {
      name: "Mars",
      url: "https://eyes.nasa.gov/apps/mrn/#/mars",
    },
    {
      name: "The Moon",
      url: "https://moon.nasa.gov/module/11/",
    },
  ];

  const currentModel = models[currentModelIndex]; // Use the current index to switch models

  const handleModelChange = (index: number) => {
    setCurrentModelIndex(index);
    setStatus(false); // Reset status to false when changing models
    setTimeout(() => {
      setStatus(true); // Set status to true after 5 seconds
    }
    , 5000); // 5000ms = 5 seconds
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setStatus(true); // Set status to true after 5 seconds
    }, 5000); // 5000ms = 5 seconds

    // Cleanup the timer if the component unmounts
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div
        className="sketchfab-embed-wrapper"
        style={{
          position: "fixed",
          top: currentModel.name === "Mars" ? -50 : 0, // If Mars, top: -50, otherwise top: 0
          left: 0,
          width: "100vw",
          height: currentModel.name === "Mars" ? "106vh" : "100vh", // If Mars, height: 106vh, otherwise 100vh,
        }}
      >
        <iframe
          title={
            currentModel.name === "Mars"
              ? "The Planet Mars 3D Globe"
              : "The Moon 3D Model"
          }
          frameBorder="0"
          allowFullScreen={true}
          allow="autoplay; fullscreen; xr-spatial-tracking"
          src={currentModel.url}
          style={{
            width: "100%",
            height: "100%",
          }}
        ></iframe>
      </div>
      <div
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          width: "200px",
          height: "60px",
          zIndex: 1001, // Ensure it's above the chart
        }}
      >
        <button
          onClick={() => handleModelChange(0)}
          style={{
            borderRadius: "10px",
            padding: "10px 20px",
            marginRight: "20px", // Space between buttons
            backgroundColor: "rgba(208,156,88,255)", // Customize button color
            color: "white",
            border: "none",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Mars
        </button>
        <button
          onClick={() => handleModelChange(1)}
          style={{
            borderRadius: "10px",
            padding: "10px 20px",
            backgroundColor: "rgba(255, 255, 255, 0.5)", // Customize button color
            color: "white",
            border: "none",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Moon
        </button>
      </div>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "35%", // Adjust the width as needed
          height: "500px", // This keeps it covering the entire viewport
          pointerEvents: "auto", // Allow interaction with elements in this overlay
        }}
      >
        <SeismogramChart object={currentModel.name} status={status}/>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0, // Ensure it starts from the left
          right: 0, // Ensure it extends to the right
          zIndex: 1001, // Ensure it's above the chart
        }}
      >
        <p
          style={{
            textAlign: "center",
            color: "white",
            margin: 0, // Remove default margin
            padding: "5px 0", // Add some vertical padding if needed
            fontSize: "12px",
          }}
        >
          Motus Spatialis project, developed by{" "}
          <a
            href="https://www.spaceappschallenge.org/nasa-space-apps-2024/find-a-team/space-mavericks1/?tab=project"
            target="_blank" // Open in a new tab
            rel="noopener noreferrer" // Security best practice
            style={{ color: "white", textDecoration: "underline" }} // Style the link
          >
            Space Mavericks
          </a>{" "}
          during 2024 NASA Space Challenges Hackathon.
        </p>
      </div>
    </>
  );
}

export default App;
