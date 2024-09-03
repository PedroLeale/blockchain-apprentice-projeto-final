// src/pages/Login.js

import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [account, setAccount] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [signature, setSignature] = useState('');

  const connectMetaMask = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        setAccount(account);

        const message = `Logando com a conta: ${account}`;
        const signature = await window.ethereum.request({
          method: 'personal_sign',
          params: [message, account]
        });
        setSignature(signature);

        onLogin();

      } catch (error) {
        setErrorMessage('Erro ao conectar ao MetaMask: ' + error.message);
      }
    } else {
      setErrorMessage('MetaMask não está instalado. Por favor, instale-o para continuar.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login com MetaMask</h2>
      <button onClick={connectMetaMask} className="login-button">Conectar MetaMask</button>
      {account && <p>Endereço conectado: {account}</p>}
      {signature && <p>Assinatura: {signature}</p>}
      {errorMessage && <p className="error">{errorMessage}</p>}
    </div>
  );
};

export default Login;
