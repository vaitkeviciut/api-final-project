import React from 'react'
import { Link } from 'react-router-dom'
import { firstLetterUpperCase } from '../functions.js';
import './AlbumTitle.scss';

const AlbumTitle = ({ title, name, username, email, date, time, albumId, userId }) => {
  return (
    <>
    <div className='album-wrapper'>
      <Link className='album-link' to={`/albums/` + albumId}>
        <h4 className='user-album-title'>{firstLetterUpperCase(title)}</h4>
      </Link>
    </div>
    <div className='album-bottom-wrapper'>
      <div className='album-name-wrapper'>
        <Link className='name-link' to={`/users/` + userId}>
          <span className='name'>by {name} ({username})</span>
        </Link>
        <a className='email-link' href={`mailto:${email}`} >
          <span className='email'>{email}</span>
        </a>
      </div>
      <div className='album-date-wrapper'>
        <span className='date'>{date}</span>
        <span className='time'>{time}</span>
      </div>
    </div>
    </>
    
  )
}

export default AlbumTitle