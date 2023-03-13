import React from 'react'
import { Link } from 'react-router-dom'

const MovieContent = ({ userId, title, description, author, year }) => {
  return (
    <div className="movie-link-wrapper">
          <div className="movie">
            <Link to={`/movies/` + userId}>
              <div className="movie-wrapper">
                  <h3 className="movie-title">{title}</h3>
                  <p className="movie-description">{description}</p>
              </div>
              <div className='user-company-wrapper'>
                <p className='movie-author'>Director: {author}</p>
                <p className='movie-year'>Released: {year}</p>
              </div>
            </Link>
          </div>
    </div>
  )
}

export default MovieContent