import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Doctor from './pages/Doctor/doctor';
import Pharmacist from './pages/Pharmacist/pharmacist';
import Owner from './pages/Owner/owner';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/doctor" element={<Doctor />} />
          <Route path="/pharmacist" element={<Pharmacist />} />
          <Route path="/owner" element={<Owner />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
