import React from 'react'
import { Link } from 'react-router-dom';
import './UserItem.scss'

const UserItem = ({ userId, name, postsLength }) => {
  return (
        <div className='user-text-wrapper'>
            <Link className='users-list-item-link' to={'/users/' + userId}>
            {name}
            </Link>
            <span className='user-posts-count'>({postsLength} posts)</span>
        </div>
    
  )
}

export default UserItem