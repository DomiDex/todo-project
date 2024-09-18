import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import { useState, useEffect } from 'react';
import { AuthContext } from './context/AuthContext';
import ToDo from './pages/ToDo';

const App = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const setTokenWithStorage = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
  };

  return (
    <AuthContext.Provider value={{ token, setToken: setTokenWithStorage }}>
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={token ? <Navigate to='/todo' replace /> : <Home />}
          />
          <Route
            path='/todo'
            element={token ? <ToDo /> : <Navigate to='/' replace />}
          />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default App;
