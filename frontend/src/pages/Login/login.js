import React, { useState, useEffect } from 'react';
import '../../styles/login.css';
import farmacialogo from '../../assets/farmacialogo.png'; 
import Footer from '../../components/Footer';

const Login = ({ onLogin }) => {
  const [account, setAccount] = useState(null);
  const [signature, setSignature] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [currentText, setCurrentText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const phrases = [
    "Bem Vindo à Farmácia Descentralizada",
    "Welcome to the Decentralized Pharmacy",
    "Bienvenue à la Pharmacie Décentralisée"
  ];

  useEffect(() => {
    const phrase = phrases[textIndex];
    let charIndex = 0;
    const typingInterval = setInterval(() => {
      setCurrentText(phrase.slice(0, charIndex));
      charIndex += 1;
      if (charIndex > phrase.length) {
        clearInterval(typingInterval);
        setTimeout(() => {
          setTextIndex((textIndex + 1) % phrases.length);
        }, 2000); 
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, [textIndex]);

  const connectMetaMask = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        setAccount(account);

        const message = `Logando com a conta: ${account}`;
        const signature = await window.ethereum.request({
          method: 'personal_sign',
          params: [message, account],
        });
        setSignature(signature);

        setIsLoggedIn(true); 
        onLogin();
      } catch (error) {
        setErrorMessage('Erro ao conectar ao MetaMask: ' + error.message);
      }
    } else {
      setErrorMessage('MetaMask não está instalado. Por favor, instale-o para continuar.');
    }
  };

  return (
    <div className={`login-container ${isLoggedIn ? 'login-hidden' : ''}`}>
      <img src={farmacialogo} alt="PharmacyDAO Logo" className="logo" />
      <div className="typing-text">{currentText}</div>
      <button onClick={connectMetaMask} className="login-button">Conectar MetaMask</button>
      {account && (
        <div className="account-box">
          <p>Endereço conectado: {account}</p>
        </div>
      )}
      {signature && (
        <div className="signature-box">
          <p>Assinatura: {signature}</p>
        </div>
      )}
      {errorMessage && <p className="error">{errorMessage}</p>}
      <Footer />
    </div>
  );
};

export default Login;
