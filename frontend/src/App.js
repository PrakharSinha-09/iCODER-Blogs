import { Routes,Route } from 'react-router-dom';
import './App.css';
import Post from './components/Post';
import Layout from './Layout';
import HomePage from './pages/HomePage';
import Login from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { UserContextProvider } from './utils/UserContext';
import CreatePost from './pages/CreatePost';
import PostPage from './pages/PostPage';

function App() {
  return (
   
    <UserContextProvider>

      <Routes>
        <Route path='/' element={<Layout />} >
          <Route index element={<HomePage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/create' element={<CreatePost />} />
          <Route path='/post/:id' element={<PostPage />} />
        </Route>     
      </Routes>

    </UserContextProvider>
        
  );
}

export default App;
