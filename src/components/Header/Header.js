import React, { useState } from "react";
import { NavLink, Link } from 'react-router-dom';
import './Header.scss';

import HomePage from '../HomePage/HomePage'
import UsersPage from '../UsersPage/UsersPage'
import PostsPage from '../PostsPage/PostsPage';
import AlbumsPage from '../AlbumsPage/AlbumsPage';
import MoviesPage from '../MoviesPage/MoviesPage'


const Header = () => {
  const [search, setSearch] = useState("");
  return (
    <header>
      <div className='navigation-wrapper'>
      <div className='logo-wrapper'>
        <Link className='logo-link' to='/' element={<HomePage />} >
          <h2 className='nav-logo'>JSON.API</h2>
        </Link>
      </div>
      <div className='right-side-nav-wrapper'>
      <div className='search-input-wrapper'>
      <form action={`/search/${search}`}>
          <input
            className="search-input"
            type="text"
            placeholder="Search..."
            onChange={(event) => setSearch(event.target.value)}
          />
          <button type="submit">Search</button>
        </form>
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
    </div>
  </header>
    
  )
}

export default Header