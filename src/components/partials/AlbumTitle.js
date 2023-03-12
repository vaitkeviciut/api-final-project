import React from 'react'
import { Link } from 'react-router-dom'
import './AlbumTitle.scss';

const AlbumTitle = ({ title, id }) => {
  return (
    <Link className='album-link' to={id}>
        <h4 className='user-album-title'>{title}</h4>
    </Link>
  )
}

export default AlbumTitle