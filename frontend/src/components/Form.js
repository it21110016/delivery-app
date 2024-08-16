import React, { useState } from 'react';
import CityForm from './CityForm';

const Form = () => {
  const [cities, setCities] = useState([]);

  const addCity = () => {
    setCities([...cities, {}]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 bg-white shadow rounded-lg">
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-2">State Information</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium">State Name:</label>
          <select
          className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm"
        >
          <option>Select a State</option>
          <option>Queensland</option>
          <option>New South Wales</option>
          <option>Victoria</option>
        </select>
        </div>
      </div>

      {cities.map((city, index) => (
        <CityForm key={index} />
      ))}

      <button
        type="button"
        onClick={addCity}
        className="mt-4 text-blue-500 underline"
      >
        Add Another City State
      </button>

      <button
        type="submit"
        className="mt-8 w-full bg-blue-500 text-white py-2 px-4 rounded"
      >
        Submit
      </button>
    </form>
  );
};

export default Form;
