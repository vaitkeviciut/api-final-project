import React from 'react'
// import { Link } from 'react-router-dom'
import './AlbumTitle.scss';

const AlbumTitle = ({ title, name, username, email, date, time }) => {
  return (
    <div className='album-wrapper'>
      {/* <Link className='album-link' to={}> */}
        <h4 className='user-album-title'>{title}</h4>
    {/* </Link> */}
    <div className='album-bottom-wrapper'></div>
    <div className='album-name-wrapper'>
        <span className='name'>by {name} ({username})</span>
        <span className='email'>{email}</span> 
    </div>
    <div className='album-date-wrapper'>
      <span className='date'>{date}</span>
      <span className='time'>{time}</span>
    </div>
    </div>
    
  )
}

export default AlbumTitle