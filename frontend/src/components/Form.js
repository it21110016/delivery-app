import React, { useState } from 'react';
import axios from 'axios';

const Form = () => {
  const [formData, setFormData] = useState({
    stateName: '',
    cities: [
      {
        cityName: '',
        suburbs: [
          {
            suburbName: '',
            state: 'QLD',
            postalCodeType: '',
            postalCodes: '',
            delivery_costs: {
              thresholds: [{ orderValue: '', cost: '' }],
              above_threshold: ''
            },
            pickup_options: {
              thresholds: [{ orderValue: '', cost: '' }],
              above_threshold: ''
            }
          }
        ]
      }
    ]
  });

  const handleCityChange = (index, event) => {
    const newCities = [...formData.cities];
    newCities[index][event.target.name] = event.target.value;
    setFormData({ ...formData, cities: newCities });
  };

  const handleSuburbChange = (cityIndex, suburbIndex, event) => {
    const newCities = [...formData.cities];
    newCities[cityIndex].suburbs[suburbIndex][event.target.name] = event.target.value;
    setFormData({ ...formData, cities: newCities });
  };

  const handleThresholdChange = (cityIndex, suburbIndex, type, thresholdIndex, event) => {
    const newCities = [...formData.cities];
    const newThresholds = [...newCities[cityIndex].suburbs[suburbIndex][type].thresholds];
    newThresholds[thresholdIndex][event.target.name] = event.target.value;
    newCities[cityIndex].suburbs[suburbIndex][type].thresholds = newThresholds;
    setFormData({ ...formData, cities: newCities });
  };

  const handleAboveThresholdChange = (cityIndex, suburbIndex, type, event) => {
    const newCities = [...formData.cities];
    newCities[cityIndex].suburbs[suburbIndex][type].above_threshold = event.target.value;
    setFormData({ ...formData, cities: newCities });
  };

  const addCity = () => {
    setFormData({
      ...formData,
      cities: [
        ...formData.cities,
        {
          cityName: '',
          suburbs: [
            {
              suburbName: '',
              state: 'QLD',
              postalCodeType: '',
              postalCodes: '',
              delivery_costs: { thresholds: [{ orderValue: '', cost: '' }], above_threshold: '' },
              pickup_options: { thresholds: [{ orderValue: '', cost: '' }], above_threshold: '' }
            }
          ]
        }
      ]
    });
  };

  const addSuburb = (cityIndex) => {
    const newCities = [...formData.cities];
    newCities[cityIndex].suburbs.push({
      suburbName: '',
      state: 'QLD',
      postalCodeType: '',
      postalCodes: '',
      delivery_costs: { thresholds: [{ orderValue: '', cost: '' }], above_threshold: '' },
      pickup_options: { thresholds: [{ orderValue: '', cost: '' }], above_threshold: '' }
    });
    setFormData({ ...formData, cities: newCities });
  };

  const addThreshold = (cityIndex, suburbIndex, type) => {
    const newCities = [...formData.cities];
    const newThresholds = [...newCities[cityIndex].suburbs[suburbIndex][type].thresholds];
    newThresholds.push({ orderValue: '', cost: '' });
    newCities[cityIndex].suburbs[suburbIndex][type].thresholds = newThresholds;
    setFormData({ ...formData, cities: newCities });
  };

  const removeThreshold = (cityIndex, suburbIndex, type, thresholdIndex) => {
    const newCities = [...formData.cities];
    const newThresholds = [...newCities[cityIndex].suburbs[suburbIndex][type].thresholds];
    newThresholds.splice(thresholdIndex, 1);
    newCities[cityIndex].suburbs[suburbIndex][type].thresholds = newThresholds;
    setFormData({ ...formData, cities: newCities });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/v1/locations', formData);
      alert('Data submitted successfully!');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        alert(`Failed to submit data: ${error.response.data.message}`);
      } else {
        console.error('Error submitting data', error);
        alert('Failed to submit data');
      }
    }
  };

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          onClick={() => { window.location.href = `/delivery-cost` }}
        >
          Delivery Costs
        </button>
      </div>

      <form className="space-y-6 bg-white p-8 shadow rounded-lg max-w-screen-md mx-auto" onSubmit={handleSubmit}>

        <h2 className="text-2xl font-semibold mb-4">State Information</h2>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">State Name:</label>
          <select
            name="stateName"
            value={formData.stateName}
            onChange={(e) => setFormData({ ...formData, stateName: e.target.value })}
            required
            className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Select a State</option>
            <option value="Queensland">Queensland</option>
            <option value="New South Wales">New South Wales</option>
            <option value="Victoria">Victoria</option>
          </select>
        </div>

        <h3 className="text-xl font-semibold mb-4">City Information</h3>
        {formData.cities.map((city, cityIndex) => (
          <div key={cityIndex} className="border p-4 rounded-md mb-4 bg-gray-50">
            <h3 className="text-lg font-semibold mb-4">City {cityIndex + 1}</h3>

            <label className="block text-gray-700">City Name:</label>
            <select
              name="cityName"
              value={city.cityName}
              onChange={(e) => handleCityChange(cityIndex, e)}
              required
              className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Select a City</option>
              <option value="Brisbane">Brisbane</option>
              <option value="Sydney">Sydney</option>
              <option value="Melbourne">Melbourne</option>
            </select>

            <h3 className="text-xl font-semibold mb-4 mt-4">Suburb Information</h3>

            {city.suburbs.map((suburb, suburbIndex) => (
              <div key={suburbIndex} className="border p-4 rounded-md mb-4 bg-gray-50">
                <h4 className="text-md font-semibold mb-2">Suburb {suburbIndex + 1}</h4>

                <label className="block text-gray-700">Suburb Name:</label>
                <input
                  type="text"
                  name="suburbName"
                  value={suburb.suburbName}
                  onChange={(e) => handleSuburbChange(cityIndex, suburbIndex, e)}
                  required
                  className="mt-1 block w-full p-2 border-solid border-2 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />

                <label className="block text-gray-700 mt-4">State:</label>
                <input
                  type="text"
                  name="state"
                  value={suburb.state}
                  onChange={(e) => handleSuburbChange(cityIndex, suburbIndex, e)}
                  required
                  className="mt-1 block w-full p-2 border-solid border-2 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />

                <label className="block text-gray-700 mt-4">Postal Code Type:</label>
                <select
                  name="postalCodeType"
                  value={suburb.postalCodeType}
                  onChange={(e) => handleSuburbChange(cityIndex, suburbIndex, e)}
                  required
                  className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Select Postal code Type</option>
                  <option value="Single">Single</option>
                  <option value="Range">Range</option>
                  <option value="List">List</option>
                </select>

                <label className="block text-gray-700 mt-4">Postal Code:</label>
                <input
                  type="text"
                  name="postalCodes"
                  value={suburb.postalCodes}
                  onChange={(e) => handleSuburbChange(cityIndex, suburbIndex, e)}
                  required
                  className="mt-1 mb-5 block w-full p-2 border-solid border-2 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />

                <div className="mb-4 bg-blue-100 p-4 rounded-lg">
                  <h5 className="text-md font-semibold mt-6 mb-4 text-blue-700">Delivery Costs</h5>
                  {suburb.delivery_costs.thresholds.map((threshold, thresholdIndex) => (
                    <div key={thresholdIndex} className="mb-4">

                      <label className="block text-gray-700">Order Value Threshold:</label>
                      <input
                        type="number"
                        name="orderValue"
                        value={threshold.orderValue}
                        onChange={(e) => handleThresholdChange(cityIndex, suburbIndex, 'delivery_costs', thresholdIndex, e)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />

                      <label className="block text-gray-700 mt-4">Cost Below Threshold:</label>
                      <input
                        type="number"
                        name="cost"
                        value={threshold.cost}
                        onChange={(e) => handleThresholdChange(cityIndex, suburbIndex, 'delivery_costs', thresholdIndex, e)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />

                      <button
                        type="button"
                        onClick={() => removeThreshold(cityIndex, suburbIndex, 'delivery_costs', thresholdIndex)}
                        className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                      >
                        Remove Threshold
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addThreshold(cityIndex, suburbIndex, 'delivery_costs')}
                    className="mt-2 text-blue-500 underline hover:text-blue-700"
                  >
                    Add Another Threshold
                  </button>

                  <label className="block text-gray-700 mt-4">Fixed Cost (Above Threshold):</label>
                  <input
                    type="number"
                    name="above_threshold"
                    value={suburb.delivery_costs.above_threshold}
                    onChange={(e) => handleAboveThresholdChange(cityIndex, suburbIndex, 'delivery_costs', e)}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div className="bg-yellow-100 p-4 rounded-lg">
                  <h5 className="text-md font-semibold mt-6 mb-4 text-blue-700">Pickup Options</h5>
                  {suburb.pickup_options.thresholds.map((threshold, thresholdIndex) => (
                    <div key={thresholdIndex} className="mb-4">

                      <label className="block text-gray-700">Order Value Threshold:</label>
                      <input
                        type="number"
                        name="orderValue"
                        value={threshold.orderValue}
                        onChange={(e) => handleThresholdChange(cityIndex, suburbIndex, 'pickup_options', thresholdIndex, e)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />

                      <label className="block text-gray-700 mt-4">Pickup Cost Below Threshold:</label>
                      <input
                        type="number"
                        name="cost"
                        value={threshold.cost}
                        onChange={(e) => handleThresholdChange(cityIndex, suburbIndex, 'pickup_options', thresholdIndex, e)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />

                      <button
                        type="button"
                        onClick={() => removeThreshold(cityIndex, suburbIndex, 'pickup_options', thresholdIndex)}
                        className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                      >
                        Remove Threshold
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addThreshold(cityIndex, suburbIndex, 'pickup_options')}
                    className="mt-2 text-blue-500 underline hover:text-blue-700"
                  >
                    Add Another Threshold
                  </button>

                  <label className="block text-gray-700 mt-4">Pickup Cost (Above Threshold):</label>
                  <input
                    type="number"
                    name="above_threshold"
                    value={suburb.pickup_options.above_threshold}
                    onChange={(e) => handleAboveThresholdChange(cityIndex, suburbIndex, 'pickup_options', e)}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />

                </div>
                <button
                  type="button"
                  onClick={() => addSuburb(cityIndex)}
                  className="mt-4 text-blue-500 underline hover:text-blue-700"
                >
                  Add Another Suburb
                </button>
              </div>
            ))}
          </div>
        ))}

        <button
          type="button"
          onClick={addCity}
          className="mt-2 text-blue-500 underline hover:text-blue-700"
        >
          Add Another City
        </button>

        <button
          type="submit"
          className="mt-8 w-full bg-blue-500 text-white py-2 px-4 rounded shadow-sm hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
