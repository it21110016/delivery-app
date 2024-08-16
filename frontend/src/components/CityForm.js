import React, { useState } from 'react';
import SuburbForm from './SuburbForm';

const CityForm = () => {
  const [suburbs, setSuburbs] = useState([]);

  const addSuburb = () => {
    setSuburbs([...suburbs, {}]);
  };

  return (
    <div className="mb-8 p-4 border rounded-lg">
      <h3 className="text-md font-semibold mb-2">City Information</h3>

      <div className="mb-4">
        <label className="block text-sm font-medium">City Name:</label>
        <select
          className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm"
        >
          <option>Select a City</option>
          <option>Brisbane</option>
          <option>Sydney</option>
          <option>Melbourne</option>
        </select>
      </div>

      {suburbs.map((suburb, index) => (
        <SuburbForm key={index} />
      ))}

      <button
        type="button"
        onClick={addSuburb}
        className="text-blue-500 underline"
      >
        Add Another Suburb
      </button>
    </div>
  );
};

export default CityForm;
