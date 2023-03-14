import { Route, Routes, Link } from 'react-router-dom';
import Header from './components/Header/Header'
import SearchPage from './components/SearchPage/SearchPage'
import HomePage from './components/HomePage/HomePage'
import UsersPage from './components/UsersPage/UsersPage'
import UserPage from './components/UsersPage/UserPage'
import PostsPage from './components/PostsPage/PostsPage'
import PostPage from './components/PostsPage/PostPage'
import AlbumsPage from './components/AlbumsPage/AlbumsPage'
import AlbumPage from './components/AlbumsPage/AlbumPage'
import MoviesPage from './components/MoviesPage/MoviesPage'
import MoviePage from './components/MoviesPage/MoviePage'

import '../src/components/HomePage/HomePage.scss'
import './App.css';

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/search/:phrase" element={<SearchPage />} />
        <Route path='/' element={<HomePage />} />

        <Route path='/users' element={<UsersPage />} />
        <Route path='/users/:userId' element={<UserPage />} />

        <Route path='/posts' element={<PostsPage />} />
        <Route path='/posts/:postId' element={<PostPage />} />

        <Route path='/albums' element={<AlbumsPage />} />
        <Route path='/albums/:albumId' element={<AlbumPage />} />

        <Route path='/movies' element={<MoviesPage />} />
        <Route path='/movies/:movieId' element={<MoviePage />} />

        <Route path='*' element={
          <div>
            <div className='hero-box-wrapper'>
              <div className='hero-box-content-wrapper'>
                <h1 className='hero-box-title'>JSON.API...</h1>
                <Link className='get-started-link' to='/'>Lets het started</Link>
              </div>
            </div>
            
          </div>
        } />

      </Routes>
    </div>
  );
}

export default App;
