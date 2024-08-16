import React, { useState } from 'react';

const SuburbForm = () => {
  const [deliveryCosts, setDeliveryCosts] = useState([{ threshold: '', cost: '' }]);
  const [pickupOptions, setPickupOptions] = useState([{ threshold: '', cost: '' }]);

  const addDeliveryCost = () => {
    setDeliveryCosts([...deliveryCosts, { threshold: '', cost: '' }]);
  };

  const addPickupOption = () => {
    setPickupOptions([...pickupOptions, { threshold: '', cost: '' }]);
  };

  return (
    <div className="mb-8 p-4 bg-gray-50 border rounded-lg">
      <h4 className="text-md font-semibold mb-2">Suburb Information</h4>

      <div className="mb-4">
        <label className="block text-sm font-medium">Suburb Name:</label>
        <input
          type="text"
          className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm"
          placeholder="Suburb Name"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">State:</label>
        <input
          type="text"
          className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm"
          placeholder="QLD"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">Postal Code Type:</label>
        <select
          className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm"
        >
          <option>Single</option>
          <option>Range</option>
          <option>List</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">Postal Code:</label>
        <input
          type="text"
          className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm"
          placeholder="Postal Code"
        />
      </div>

      <div className="mb-4 bg-blue-100 p-4 rounded-lg">
        <h5 className="text-md font-semibold mb-2">Delivery Costs</h5>
        {deliveryCosts.map((cost, index) => (
          <div key={index} className="mb-2">
            <div className="flex space-x-4">
              <input
                type="number"
                className="block w-1/2 p-2 border-gray-300 rounded-md shadow-sm"
                placeholder="Order Value Threshold"
              />
              <input
                type="number"
                className="block w-1/2 p-2 border-gray-300 rounded-md shadow-sm"
                placeholder="Cost Below Threshold"
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={addDeliveryCost}
          className="text-blue-500 underline"
        >
          Add Another Threshold
        </button>
        <div className="mt-4">
          <input
            type="number"
            className="block w-full p-2 border-gray-300 rounded-md shadow-sm"
            placeholder="Fixed Cost (Above Threshold)"
          />
        </div>
      </div>

      <div className="bg-yellow-100 p-4 rounded-lg">
        <h5 className="text-md font-semibold mb-2">Pickup Options</h5>
        {pickupOptions.map((option, index) => (
          <div key={index} className="mb-2">
            <div className="flex space-x-4">
              <input
                type="number"
                className="block w-1/2 p-2 border-gray-300 rounded-md shadow-sm"
                placeholder="Order Value Threshold"
              />
              <input
                type="number"
                className="block w-1/2 p-2 border-gray-300 rounded-md shadow-sm"
                placeholder="Pickup Cost Below Threshold"
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={addPickupOption}
          className="text-blue-500 underline"
        >
          Add Another Threshold
        </button>
        <div className="mt-4">
          <input
            type="number"
            className="block w-full p-2 border-gray-300 rounded-md shadow-sm"
            placeholder="Pickup Cost (Above Threshold)"
          />
        </div>
      </div>
    </div>
  );
};

export default SuburbForm;
