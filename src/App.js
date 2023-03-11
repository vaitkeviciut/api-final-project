import { Route, Routes, Link } from 'react-router-dom';
import Header from './components/Header/Header'
import HomePage from './components/HomePage/HomePage'
import UsersPage from './components/UsersPage/UsersPage'
import UserPage from './components/UsersPage/UserPage'
import PostsPage from './components/PostsPage/PostsPage'
import AlbumsPage from './components/AlbumsPage/AlbumsPage'

import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Header/>} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/users' element={<UsersPage />} />
        <Route path='/users/:userId' element={<UserPage />} />
        <Route path='/posts' element={<PostsPage />} />
        <Route path='/albums' element={<AlbumsPage />} />
        <Route path='*' element={
          <div>
            <h1>404 Error</h1>
            <Link to='/'>Back to the main page</Link>
          </div>
        } />

      </Routes>
    </div>
  );
}

export default App;
