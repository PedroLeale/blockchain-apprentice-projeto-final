import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Doctor from './pages/Doctor/doctor';
import Pharmacist from './pages/Pharmacist/pharmacist';
import Owner from './pages/Owner/owner';
import Login from './pages/Login/login';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <div>
        {/* Só exibe a Navbar se o usuário estiver autenticado */}
        {isAuthenticated && <Navbar />}
        <Routes>
          {/* Redireciona para o login se não estiver autenticado */}
          <Route
            path="/login"
            element={<Login onLogin={handleLogin} />}
          />
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to="/doctor" />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          {/* Protege as rotas, redirecionando para login se não estiver autenticado */}
          <Route
            path="/doctor"
            element={
              isAuthenticated ? (
                <Doctor />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/pharmacist"
            element={
              isAuthenticated ? (
                <Pharmacist />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/owner"
            element={
              isAuthenticated ? (
                <Owner />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
