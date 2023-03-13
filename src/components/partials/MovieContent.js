import React from 'react'
import { Link } from 'react-router-dom'

import './MovieContent.scss'

const MovieContent = ({ title, description, author, year, movieId }) => {
  return (
    <div className="movie-link-wrapper">
        <Link className='movie-link' to={`/movies/` + movieId}>
          <div className="movie-wrapper">
              <h3 className="movie-title">{title}</h3>
              <p className="movie-description">{description}</p>
          </div>
          <div className='user-company-wrapper'>
            <p className='movie-author'><span className='movie-title'>Director:</span> {author}</p>
            <p className='movie-year'><span className='movie-title'>Released:</span> {year}</p>
          </div>
        </Link>
    </div>
  )
}

export default MovieContent