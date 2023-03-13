import { NavLink, Link } from 'react-router-dom';
import './Header.scss';
import logo from '../images/logo.svg'

import HomePage from '../HomePage/HomePage'
import UsersPage from '../UsersPage/UsersPage'
import PostsPage from '../PostsPage/PostsPage';
import AlbumsPage from '../AlbumsPage/AlbumsPage';
import MoviesPage from '../MoviesPage/MoviesPage'


const Header = () => {
  return (
    <header>
      <div className='navigation-wrapper'>
      <div className='logo-wrapper'>
        <Link className='logo-link' to='/' element={<HomePage />} >
          <img className='logo' src={logo} alt='logo' width='60' />
        </Link>
      </div>
      <ul className='nav-list'>
        <li className='nav-list-item'>
          <NavLink className='nav-list-item-link' to='/' element={<HomePage />}>Home</NavLink>
        </li>
        <li className='nav-list-item'>
          <NavLink className='nav-list-item-link' to='/users' element={<UsersPage />} >Users</NavLink>
        </li>
        <li className='nav-list-item'>
          <NavLink className='nav-list-item-link' to='/posts' element={<PostsPage />} >Posts</NavLink>
        </li>
        <li className='nav-list-item'>
          <NavLink className='nav-list-item-link' to='/albums' element={<AlbumsPage />} >Albums</NavLink>
        </li>
        <li className='nav-list-item'>
          <NavLink className='nav-list-item-link' to='/movies' element={<MoviesPage />} >Movies</NavLink>
        </li>
      </ul>
    </div>
  </header>
    
  )
}

export default Header