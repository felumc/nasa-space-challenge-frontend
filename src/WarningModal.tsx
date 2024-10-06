import React from "react";
import "./WarningModal.css"; // Optional: External CSS for additional styling

interface WarningModalProps {
  isVisible: boolean;
  object: string;
  onClose: () => void;
}

const WarningModal: React.FC<WarningModalProps> = ({
  isVisible,
  onClose,
  object,
}) => {
  if (!isVisible) return null; // Return nothing if modal isn't visible

  const seismicType = [
    {
      type: "Impact",
      description:
        "A significant impact event has occurred on the surface of " +
        object +
        ".",
    },
    {
      type: "Deep",
      description:
        "A deep seismic event has been detected on the surface of " +
        object +
        ".",
    },
    {
      type: "Shallow",
      description:
        "A shallow seismic event has been detected on the surface of " +
        object +
        ".",
    },
  ];

  // Randomly select a seismic type
  const randomIndex = Math.floor(Math.random() * seismicType.length);
  const seismicTypeSelected = seismicType[randomIndex];

  return (
    <div className="warning-modal-overlay">
      <div className="warning-modal-container">
        {/* Warning Image */}
        <img
          src="/warning-outline.svg" // Replace with actual path to the warning icon
          alt="Warning"
          className="warning-icon"
        />
        {/* Modal Content */}
        <div className="warning-modal-content">
          <h2>Seismic Activity Detected! Type: {seismicTypeSelected.type}</h2>
          <p>
            {seismicTypeSelected.description}
          </p>
          <button className="warning-modal-close" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default WarningModal;
