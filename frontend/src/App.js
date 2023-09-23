import { Routes,Route } from 'react-router-dom';
import './App.css';
import Post from './components/Post';
import Layout from './Layout';
import HomePage from './pages/HomePage';
import Login from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
   
      <Routes>
        <Route path='/' element={<Layout />} >
          <Route index element={<HomePage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<RegisterPage />} />
        </Route>
        
      </Routes>
        
  );
}

export default App;
