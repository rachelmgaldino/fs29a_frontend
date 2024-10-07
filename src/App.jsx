import { createContext, useState } from 'react';
import Login from './pages/Login';
import Painel from './pages/Painel';
import AppRoutes from './routes/AppRoutes';

export const AuthContext = createContext();

function App() {

  const check = localStorage.getItem('token@dc') ? true : false;
  const[logado, setLogado] = useState(check);

  function logout() {
    localStorage.removeItem('token@dc')
    setLogado(false)
  }

  return ( 
    <AuthContext.Provider value={{ logado, setLogado, logout }}>
      {logado ? <AppRoutes /> : <Login />}
    </AuthContext.Provider>
  )
}

export default App
