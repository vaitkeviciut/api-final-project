import React from 'react'
import { Link } from "react-router-dom"
import { firstLetterUpperCase } from '../functions.js';
import './PostContent.scss'


const PostContent = ({ postId, userId, title, body, name, username, image, company, date, time }) => {

  return (
      <div className="post-text-wrapper">
        <div className="user-shortcut-wrapper">
          <div className='photo-wrapper'>
            <img className="user-photo-small" src={image} alt={image} width='60' />
          </div>
          <div className="user-shortcut-near-photo-wrapper">
            <Link className='user-link' to={`/users/` + userId}>
              <div className="user-name-username-wrapper">
                  <h3 className="user-name-post">{name}</h3>
                  <span className="username-text-post">({username})</span>
              </div>
              <div className='user-company-wrapper'>
                <span className='user-company-item'>Works @ {company}</span>
              </div>
            </Link>
          </div>
        </div>
        <div className='posts-list-item-link-wrapper'>
          <Link className='posts-list-item-link' to={`/posts/` + postId}>
              <h2 className="post-title">{firstLetterUpperCase(title)}</h2>
              <p className="post-body">{firstLetterUpperCase(body)}</p>
          </Link>
          <div className="date-wrapper">
              <span className="date">{date}</span>
              <span className="time">{time}</span>
          </div>
        </div>
      </div>
  )
}

export default PostContent