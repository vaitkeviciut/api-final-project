import React from 'react'
import { Link } from 'react-router-dom';
import DeleteButton from '../partials/DeleteButton'
import './UserItem.scss'

const UserItem = ({ userId, name, postsLength }) => {
  return (
    <li className='users-list-item'>
        <div className='user-text-wrapper'>
            <Link className='users-list-item-link' to={'/users/' + userId}>
            {name}
            </Link>
            <span className='user-posts-count'>({postsLength} posts)</span>
        </div>
        <DeleteButton userId={userId} />
    </li>
  )
}

export default UserItem