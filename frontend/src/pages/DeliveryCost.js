import React, { useState } from 'react';

const DeliveryCost = () => {
  const [postalCode, setPostalCode] = useState('');
  const [deliveryCost, setDeliveryCost] = useState(null);

  const handleSearch = async () => {
    const response = await fetch(`http://localhost:5000/api/v1/locations/delivery-cost/${postalCode}`);
    const data = await response.json();
    setDeliveryCost(data);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Search Delivery Cost</h1>
      <input
        type="text"
        placeholder="Postal Code"
        value={postalCode}
        onChange={(e) => setPostalCode(e.target.value)}
        className="border p-2 w-full mb-4"
      />
      <button onClick={handleSearch} className="bg-blue-500 text-white py-2 px-4 rounded">
        Search
      </button>
      {deliveryCost && (
        <div className="mt-4">
          
          <pre>{JSON.stringify(deliveryCost, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default DeliveryCost;
