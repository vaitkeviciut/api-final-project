import { NavLink, Link } from 'react-router-dom';
import './Header.scss';
import logo from '../images/logo.svg'


const Header = () => {
  return (
    <header>
      <div className='navigation-wrapper'>
      <div className='logo-wrapper'>
        <Link className='logo-link' to='/'>
          <img className='logo' src={logo} alt='logo' width='60' />
        </Link>
      </div>
      <ul className='nav-list'>
        <li className='nav-list-item'>
          <NavLink className='nav-list-item-link' to='/'>Home</NavLink>
        </li>
        <li className='nav-list-item'>
          <NavLink className='nav-list-item-link' to='/users'>Users</NavLink>
        </li>
        <li className='nav-list-item'>
          <NavLink className='nav-list-item-link' to='/posts'>Posts</NavLink>
        </li>
        <li className='nav-list-item'>
          <NavLink className='nav-list-item-link' to='/albums'>Albums</NavLink>
        </li>
      </ul>
    </div>
  </header>
    
  )
}

export default Header