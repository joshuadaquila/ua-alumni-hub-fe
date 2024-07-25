import { useState, useEffect } from 'react';

const useToken = () => {
  const [token, setToken] = useState(() => {
    const tokenFromStorage = localStorage.getItem('token');
    return tokenFromStorage? tokenFromStorage : null;
  });

  useEffect(() => {
    console.log("TOKENN", token);
    if (token!== null) {
      localStorage.setItem('token', token);
    } else {
      console.log("removing");
      // localStorage.removeItem('token');
    }
  }, [token]);

  const handleSetToken = (newToken) => {
    console.log("Setting token");
    setToken(newToken);
    localStorage.setItem('token', token);
  };

  const removeToken = () => {
    handleSetToken(null);
  };

  return [token, handleSetToken, removeToken];
};

export default useToken;