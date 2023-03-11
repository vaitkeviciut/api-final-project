import React from 'react'
import { Link } from 'react-router-dom'
import './AlbumTitle.scss';

const AlbumTitle = ({ title, albumId }) => {
  return (
    <Link className='album-link' to={albumId}>
        <h4 className='user-album-title'>{title}</h4>
    </Link>
  )
}

export default AlbumTitle