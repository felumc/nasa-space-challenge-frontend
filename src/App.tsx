import React, { useEffect, useState } from "react";
import "./App.css";
import SeismogramChart from "./SeismogramChart.tsx";
import Modal from "./Modal.tsx";
import WarningModal from "./WarningModal.tsx";

function App() {
  const [currentModelIndex, setCurrentModelIndex] = useState(0);
  const [status, setStatus] = useState(false); // New state to track status
  const [is2ndModalVisible, set2ndModalVisible] = useState(false);
  const [isSeismicModalVisible, setSeismicModalVisible] = useState(false);

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
    }, 8000); // 5000ms = 5 seconds

    // Cleanup the timer if the component unmounts
    return () => clearTimeout(timer);
  }, []);

  // switch the status every 10 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setStatus((status) => !status);
    }, 10000); // 10000ms = 10 seconds

    // Cleanup the interval if the component unmounts
    return () => clearInterval(intervalId);
  }
  , []);

  const handleModalChange = () => {
    set2ndModalVisible(true);
  }

  // if status is true, show seismic modal, if status changes to false hide the seismic modal
  useEffect(() => {
    if (status) {
      setSeismicModalVisible(true);
    } else {
      setSeismicModalVisible(false);
    }
  }, [status]);

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
      <div
        style={{
          position: "absolute",
          bottom: 20,
          left: 0,
          width: "300px",
          height: "60px",
          zIndex: 1002, // Ensure it's above the chart
        }}
      >
        <button
          onClick={() => handleModalChange()}
          style={{
            borderRadius: "10px",
            padding: "10px 20px",
            backgroundColor: currentModel.name  === "Mars" ? "rgba(208,156,88,0.7)": "rgba(255, 255, 255, 0.5)", // Customize button color
            color: "white",
            border: "none",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Why preprocess the data?
        </button>
      </div>
      <Modal 
        isVisible={is2ndModalVisible} 
        onClose={() => set2ndModalVisible(false)} 
        title="The Critical Role of Onboard Data Preprocessing for Space Missions"
        description={
          <>
            Preprocessing seismic data directly on rovers and detectors plays a crucial role in optimizing both data transmission and power consumption.<br /><br />
            In the harsh environments of space, where power and communication bandwidth are limited, transmitting raw, unfiltered data back to Earth is inefficient and expensive. By preprocessing data on the rover itself, algorithms such as Random Forest can analyze and filter relevant seismic events in real time. This enables the rover to:<br /><br />
            * Save Energy: Only transmitting significant and processed data conserves power, a critical resource for the rover's longevity.<br /><br />
            * Improve Efficiency: Reduces the amount of unnecessary or redundant data transmitted, ensuring that only the most valuable seismic information reaches scientists on Earth.<br /><br />
            * Faster Insights: By sending processed data, scientists can receive and analyze important seismic events more quickly, leading to faster discoveries.<br /><br />
            With 89% accuracy, our Random Forest algorithm identifies relevant seismic activity, ensuring that only meaningful data is sent back to Earth in near real-time. This approach enhances the efficiency of space missions, maximizing both the rover’s lifespan and the scientific value of the data collected.
          </>
        }
        object={currentModel.name}
      />
      <WarningModal
        isVisible={isSeismicModalVisible}
        onClose={() => setSeismicModalVisible(false)}
        object={currentModel.name}
      />
    </>
  );
}

export default App;
