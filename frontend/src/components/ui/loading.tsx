// components/Spinner.tsx
import React from "react";
import "@/styles/spinner.css"; // Import the CSS file

const Spinner: React.FC = () => {
  return (
    <div className="flex space-x-4 items-center">
      <div className="spinner"></div>
      <p className="font-semibold text-md">Loading</p>
    </div>
  );
};

export default Spinner;
