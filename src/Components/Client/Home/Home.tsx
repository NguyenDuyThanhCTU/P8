import React, { useState } from "react";

const Home: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div className="min-h-screen flex items-center justify-center mt-16">
        <div className="relative inline-block text-left">
          <button
            onClick={toggleDropdown}
            type="button"
            className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-blue-500"
          >
            Open Dropdown
          </button>
          {isOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-300 rounded-md shadow-lg">
              <div className="py-1">
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Item 1
                </a>
                <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 relative group/main">
                  Item 2
                  <div className="hidden group-hover/main:block absolute top-0 left-full mt-0 w-56 bg-white border border-gray-300 rounded-md shadow-lg">
                    <div className="py-1">
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Subitem 1
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Subitem 2
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
