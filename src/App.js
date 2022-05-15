import './App.scss';
import Login from './components/Login';
import Wallet from './components/Wallet';
import Send from './components/Send';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import RequireAuth from './components/RequireAuth';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<Login />} />
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Wallet />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/send" element={<Send />} /> 
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
