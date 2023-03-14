import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import PageWrapper from '../PageWrapper/PageWrapper'
import axios from 'axios'

import './MoviePage.scss'

const MoviePage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});
  const [movieEdited, setMovieEdited] = useState(false)
  const [errorMessages, setErrorMessages] = useState([])
  const [editFormIsVisible, setEditFormIsVisible] = useState(false)

  const [formData, setFormData] = useState({})

  useEffect(() => {
    axios.get(`http://localhost:3000/movies/${movieId}`).then((movies) => {
      const moviesData = movies.data;
      console.log(moviesData);
      setMovie(moviesData)
      

    });
  }, []);

  const validateForm = () => {
    let messages = []

    if (!formData.title) {
        messages.push('Title is required')
    }
    if (!formData.description) {
        messages.push('Description is required')
    }
    if (!formData.author) {
        messages.push('Director is required')
    }
    if (!formData.year) {
      messages.push('Year is required')
    }

    if (messages.length === 0) {
        return true
    } else {
        setErrorMessages(messages.join((str, current) => str + '; ' + current))
        return false
    }
  }

  const movieFormInputHandler = (event) => {
    setFormData(prevState => {
        const updatedData  = {...prevState}
        updatedData[event.target.name] = event.target.value
          
        return updatedData 
    });
  };

  const editMovieHandler = (event) => {
    event.preventDefault()

      if (!validateForm()) {
      return
      }

      fetch(`http://localhost:3000/movies/${movieId}`, {
        method: 'PUT',
        body: JSON.stringify(
          {...formData}
          
          ),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((json) => console.log(json));

        setMovieEdited(true)
  }



  return (
    <PageWrapper>

    <div className='button-new-user-wrapper'>

    {editFormIsVisible ? (
      <form id="create-user-form" onSubmit={editMovieHandler}>
        <div className='form-control-wrapper'>
            <div className="form-control">
                <label className="create-user-section-title" htmlFor="title">Movie title:</label>
                <input 
                className="create-user-text" 
                type="text" 
                name="title" 
                id="title" 
                value={formData.title}
                onChange={movieFormInputHandler}
                />
            </div>
            <div className="form-control">
                <label className="create-user-section-title" htmlFor="description">Movie description:</label>
                <textarea
                className="create-user-text" 
                type="text"
                name="description" 
                id="description" 
                rows='10'
                value={formData.description} 
                onChange={movieFormInputHandler}>
                </textarea> 
            </div>
        </div>
        
        <div className='form-control-wrapper'>
            <div className="form-control">
                <label className="create-user-section-title" htmlFor="author">Movie director:</label>  
                <input 
                className="create-user-text" 
                type="text"  
                name="author" 
                id="author"
                value={formData.author}
                onChange={movieFormInputHandler}
                />
            </div>
            <div className="form-control">
                <label className="create-user-section-title" htmlFor="year">Release date:</label>  
                <input 
                className="create-user-text" 
                type="text"  
                name="year" 
                id="year"
                value={formData.year}
                onChange={movieFormInputHandler}
                />
            </div>
        </div>

        <div className='form-buttons-wrapper'>
            <div className='form-button-wrapper'>
                <button onClick={() => setEditFormIsVisible(false)} className="user-from-button" >Discard</button>
            </div>
            <div className="form-button-wrapper">
                <input className="user-from-button" id="submit" type="submit" value="Edit Movie" />
            </div>
        </div>
        <div className='success-created-user'>
          {movieEdited ? (
              <h2 className='success-created'>Movie was edited!</h2>
          ) : (
            <div className='required-fiels-messages-wrapper'>
              <p className='required-fields'>{errorMessages}</p>
            </div>
          )}
      </div>
        
      </form>
    ):(
      <button onClick={() => setEditFormIsVisible(true)} className='edit-button'>Edit</button>
      )}
    </div>

    <div className="movie-link-wrapper">
        <div className="movie-wrapper">
            <h3 className="movie-title">{movie.title}</h3>
            <p className="movie-description">{movie.description}</p>
        </div>
        <div className='user-company-wrapper'>
          <p className='movie-author'><span className='movie-title'>Director:</span> {movie.author}</p>
          <p className='movie-year'><span className='movie-title'>Released:</span> {movie.year}</p>
        </div>
    </div>

    </PageWrapper>
  )
}

export default MoviePage