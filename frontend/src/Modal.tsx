import React from 'react';

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  title: string;
  description: string;
  object: string;
}

const Modal: React.FC<ModalProps> = ({ isVisible, onClose, title, description, object }) => {
  if (!isVisible) return null; // Don't render anything if not visible

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent background
      zIndex: 2000,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <div style={{
        backgroundColor: object  === "Mars" ? "rgba(208,156,88,0.7)": "rgba(255, 255, 255, 0.5)",
        padding: '20px',
        borderRadius: '10px',
        maxWidth: '500px',
        textAlign: 'center'
      }}>
        <h2>{title}</h2>
        <p>{description}</p>
        <button onClick={onClose} style={{
          borderRadius: '10px',
          marginTop: '10px',
          marginBottom: '10px',
          padding: '10px 20px',
          backgroundColor: object  === "Mars" ? "rgba(208,156,88,255)": "rgba(255, 255, 255, 0.5)",
          color: 'white',
          border: 'none',
          cursor: 'pointer',
        }}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
