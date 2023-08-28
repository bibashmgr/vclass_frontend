import React, { useState } from "react";
import { FiUsers } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";

const PeopleDrawer: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  return (
    <div
      className={`fixed top-0 right-0 w-80 bg-white border-l border-gray-300 shadow-md transform transition-transform ease-in-out duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-80"
      } z-50 h-screen p-6`}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">People</h2>
        <button onClick={onClose}>
          <i>
            <RxCross2 />
          </i>
        </button>
      </div>
      <div className="mb-4">
        <div className="flex items-center space-x-3">
          <img
            src="https://via.placeholder.com/40"
            alt="User"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-semibold">Sanket Adhikari</p>
            <p className="text-sm text-gray-500">Host</p>
          </div>
        </div>
      </div>
      <div className="mb-4">
        <div className="flex items-center space-x-3">
          <img
            src="https://via.placeholder.com/40"
            alt="User"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-semibold">Bibash Thapa Magar</p>
            <p className="text-sm text-gray-500">Participant</p>
          </div>
        </div>
      </div>
      {/* Add more participants as needed */}
    </div>
  );
};

const Header: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <div className="w-screen bg-gray-500 p-4">
      <div className="flex items-center justify-between mx-auto max-w-7xl">
        <div className="flex items-center">
          <span className="text-white font-semibold">Meet</span>
        </div>
        <div className="flex items-center space-x-4 relative">
          <button
            className="text-white text-lg focus:outline-none"
            onClick={toggleDrawer}
          >
            <FiUsers />
          </button>
          {isDrawerOpen && (
            <PeopleDrawer isOpen={isDrawerOpen} onClose={closeDrawer} />
          )}
        </div>
      </div>
      {isDrawerOpen && (
        <div
          className="fixed top-0 left-0 h-screen w-screen bg-black opacity-50 z-5"
          onClick={closeDrawer}
        />
      )}
    </div>
  );
};

export default Header;
