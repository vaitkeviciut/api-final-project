import React from 'react'
import { Link } from 'react-router-dom';
import './UserItem.scss'

const UserItem = ({ userId, name, postsLength }) => {

    const deleteUserHandler = (userId) => {
        fetch(`http://localhost:3000/users/${userId}`, {
            method: 'DELETE',
        });
    }

  return (
    <li className='users-list-item'>
        <div className='user-text-wrapper'>
            <Link className='users-list-item-link' to={'/users/' + userId}>
            {name}
            </Link>
            <span className='user-posts-count'>({postsLength} posts)</span>
        </div>
        <div className='user-delete-button-wrapper'>
            <button className='delete-button' onClick={() => deleteUserHandler(userId)}>x</button>
        </div>
    </li>
  )
}

export default UserItem