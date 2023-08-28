import React from "react";
import { FiUsers } from "react-icons/fi";

const Header: React.FC = () => {
  return (
    <div className=" w-screen bg-gray-500 p-4">
      <div className="flex items-center justify-between mx-auto max-w-7xl">
        <div className="flex items-center">
          <span className="text-white font-semibold">Meet</span>
        </div>
        <div className="flex items-center space-x-4">
          <i className="text-white text-lg" />
          <FiUsers></FiUsers>
          <i className="text-white text-lg" />
        </div>
      </div>
    </div>
  );
};

export default Header;
