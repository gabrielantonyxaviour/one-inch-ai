// components/LoadingDots.tsx
import React from "react";
import "@/styles/loading-dots.css"; // Import the CSS file

const LoadingDots: React.FC = () => {
  return (
    <div className="loading-dots">
      <span>.</span>
      <span>.</span>
      <span>.</span>
    </div>
  );
};

export default LoadingDots;
