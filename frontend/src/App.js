import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import DeliveryCost from './pages/DeliveryCost';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/delivery-cost" element={<DeliveryCost />} />
      </Routes>
    </Router>
  );
};

export default App;
