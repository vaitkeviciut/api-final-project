import React, { useState, useEffect } from 'react'
import MovieContent from '../partials/MovieContent'
import PageWrapper from '../PageWrapper/PageWrapper';
import DeleteButton from '../partials/DeleteButton'
import axios from 'axios';

import './MoviesPage.scss'
import '../UsersPage/CreateUserForm.scss'

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [movieCreated, setMovieCreated] = useState(false)
  const [formIsVisible, setFormIsVisible] = useState(false)
  const [errorMessages, setErrorMessages] = useState([])

  const formDefaults = {
    title: '',
    description: '',
    author: '',
    year: ''
  }

  const [formData, setFormData] = useState(formDefaults)

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
  
    if (messages.length === 0) {
        return true
    } else {
        setErrorMessages(messages.reduce((str, current) => (str + '; ' + current)))
        return false
    }
  }

  useEffect(() => {
    axios.get(`http://localhost:3000/movies`).then((movies) => {
      const moviesData = movies.data;
      setMovies(moviesData);
    });
  }, []);

  const formInputHandler = (event) => {
    setFormData(prevState => {
        const updatedData  = {...prevState}
        updatedData[event.target.name] = event.target.value
        return updatedData 
    });
  };

  const createNewMovieHendler = (event) => {
    event.preventDefault()

    if (!validateForm()) {
    return
    }

    fetch(`http://localhost:3000/movies/`, {
      method: 'POST',
      body: JSON.stringify(
          {...formData}
      ),
      headers: {
          'Content-type': 'application/json; charset=UTF-8',
      },
      })
      .then((response) => response.json())
      .then((json) => console.log(json));

      setFormData(formDefaults)
      setMovieCreated(true)
    }

  return (
    <PageWrapper>

    <div className='button-new-user-wrapper'>

      {formIsVisible ? (
        <form id="create-user-form" onSubmit={createNewMovieHendler}>
          <div className='form-control-wrapper'>
              <div className="form-control">
                  <label className="create-user-section-title" htmlFor="title">Movie title:</label>
                  <input 
                  className="create-user-text" 
                  type="text" 
                  name="title" 
                  id="title" 
                  value={formData.title}
                  onChange={formInputHandler}
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
                  onChange={formInputHandler}>
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
                  onChange={formInputHandler}
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
                  onChange={formInputHandler}
                  />
              </div>
          </div>

          <div className='form-buttons-wrapper'>
              <div className='form-button-wrapper'>
                  <button onClick={() => setFormIsVisible(false)} className="user-from-button" >Discard</button>
              </div>
              <div className="form-button-wrapper">
                  <input className="user-from-button" id="submit" type="submit" value="Create Movie" />
              </div>
          </div>
          <div className='success-created-user'>
            {movieCreated ? (
                <h2 className='success-created'>Movie was created!</h2>
            ) : (
              <div className='required-fiels-messages-wrapper'>
                <p className='required-fields'>{errorMessages}</p>
              </div>
            )}
        </div>
          
        </form>
    ):(
    <button onClick={() => setFormIsVisible(true)} className='user-create-link'><span className='plus-symbol'>+</span><span className='plus-text'>Create Movie</span></button>
    )}
    </div>

      <div className='all-movies-wrapper'>{movies && movies.length > 0 && movies.map((movie, index) => (
        <div className='post-item' key={index}>
            <MovieContent 
              title={movie.title}
              description={movie.description}
              author={movie.author}
              year={movie.year}
              userId={movie.userId}
              movieId={movie.id}
            />
            <DeleteButton id={movie.id} location='movies' />
        </div>
      ))}
      </div>
    </PageWrapper>
  )
}

export default MoviesPage