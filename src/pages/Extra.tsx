import React from "react";

const Extra: React.FC = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Extra</h1>
          <p className="text-gray-600">
            This is a blank page for additional content.
          </p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
          <div className="text-gray-400 mb-4">
            <svg
              className="w-16 h-16 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Extra Content Area
          </h3>
          <p className="text-gray-500">Add your custom content here.</p>
        </div>
      </div>
    </div>
  );
};

export default Extra;
