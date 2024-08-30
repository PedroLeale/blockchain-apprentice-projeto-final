// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Doctor from './pages/Doctor/doctor'; // ajuste aqui
import Pharmacist from './pages/Pharmacist/pharmacist'; // ajuste aqui
import Owner from './pages/Owner/owner'; // ajuste aqui

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
