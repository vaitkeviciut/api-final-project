import React from 'react'
import { Link } from "react-router-dom"

import './UserShortcutWrapper.scss';

const UserShortcutWrapper = ({ image, userId, name, username, companyName, postId }) => {
  
    return (
    <div className='user-and-delete-button-wrapper'>
        <div className="user-shortcut-wrapper">
            <img className="user-photo-small" src={image} alt={image} width='60' />
            <div className="user-shortcut-near-photo-wrapper">
                <Link className="user-name-link" to={`/users/` + userId}>
                    <div className="user-name-username-wrapper">
                        <h3 className="user-name-post">{name}</h3>
                        <span className="username-text-post">({username})</span>
                    </div>
                    <div className="user-company-wrapper">
                        <span className="user-company-item">Works @ {companyName}</span>
                    </div>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default UserShortcutWrapper