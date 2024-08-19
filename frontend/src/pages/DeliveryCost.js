import React, { useState } from 'react';

const DeliveryCost = () => {
  const [postalCode, setPostalCode] = useState('');
  const [deliveryCost, setDeliveryCost] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setError(null);
    try {
      const response = await fetch(`http://localhost:5000/api/v1/locations/delivery-cost`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postalCodes: postalCode }),
      });
      if (!response.ok) {
        throw new Error('Postal code not found');
      }
      const data = await response.json();
      setDeliveryCost(data);
    } catch (err) {
      setError(err.message);
      setDeliveryCost(null);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Search Delivery Cost</h1>

      <div className="mb-6">
        <label htmlFor="postalCode" className="block text-gray-700 text-lg font-medium mb-2">
          Postal Code
        </label>
        <input
          id="postalCode"
          type="text"
          placeholder="Enter Postal Code"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          className="border border-gray-300 p-3 w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
      >
        Search
      </button>

      {error && (
        <div className="text-red-500 mt-4 text-center font-semibold">
          {error}
        </div>
      )}

      {deliveryCost && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Delivery Costs</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-100 border border-gray-300 rounded-lg">
              <thead>
                <tr className="bg-blue-500 text-white">
                  <th className="py-2 px-4 border-b">Order Value</th>
                  <th className="py-2 px-4 border-b">Cost</th>
                </tr>
              </thead>
              <tbody>
                {deliveryCost.thresholds && deliveryCost.thresholds.length > 0 ? (
                  deliveryCost.thresholds.map((threshold, index) => (
                    <tr key={index} className="hover:bg-gray-200">
                      <td className="py-2 px-4 border-b text-center">{threshold.orderValue}</td>
                      <td className="py-2 px-4 border-b text-center">{threshold.cost}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2" className="py-2 px-4 text-center">No thresholds found</td>
                  </tr>
                )}
              </tbody>
              <tfoot>
                <tr className="bg-gray-200 font-bold">
                  <td className="py-2 px-4 border-t text-right">Above Threshold</td>
                  <td className="py-2 px-4 border-t text-center">{deliveryCost.above_threshold}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveryCost;
