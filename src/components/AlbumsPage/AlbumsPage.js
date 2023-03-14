import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import AlbumTitle from '../partials/AlbumTitle'
import PageWrapper from '../PageWrapper/PageWrapper';
import DeleteButton from '../partials/DeleteButton';
import axios from 'axios';

import './AlbumsPage.scss'
import '../UsersPage/CreateUserForm.scss'

const AlbumsPage = () => {
  const [albums, setAlbums] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [albumCreated, setAlbumCreated] = useState(false);
  const [formIsVisible, setFormIsVisible] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  const formDefaults = {
    title: '',
    name: '',
    username: '',
    email: '',
    date: '2023-03-10',
    time: '11:15'
  }

  const [formData, setFormData] = useState(formDefaults)

  const validateForm = () => {
    let messages = []
  
    if (!formData.title) {
        messages.push('Title is required')
    }
    if (!formData.name) {
        messages.push('Name is required')
    }
    if (!formData.username) {
        messages.push('Username is required')
    }
    if (!formData.email) {
      messages.push('Email is required')
    }
    if (!formData.date) {
      messages.push('Date is required')
    }
    if (!formData.time) {
      messages.push('Time is required')
    }
  
    if (messages.length === 0) {
        return true
    } else {
        setErrorMessages(messages.reduce((str, current) => (str + '; ' + current)))
        return false
    }
  }

  useEffect(() => {
    axios.get(`http://localhost:3000/albums`).then((albums) => {
      const albumsData = albums.data;
      setAlbums(albumsData);
    });
  }, []);

  useEffect(() => {
    axios.get(`http://localhost:3000/albums/1/photos?_limit=1`).then((photos) => {
      const photosData = photos.data;
      setPhotos(photosData);
    });
  }, []);


  const formInputHandler = (event) => {
    setFormData(prevState => {
        const updatedData  = {...prevState}
        updatedData[event.target.name] = event.target.value
        return updatedData 
    });
  };

  const createNewAlbumHendler = (event) => {
    event.preventDefault()

    if (!validateForm()) {
    return
    }

    fetch(`http://localhost:3000/albums/`, {
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
      setAlbumCreated(true)
    }

  return (
  <PageWrapper>
    <div className='page-title-wrapper'>
        <h1 className='page-title'>Albums...</h1>
      </div>

      <div className='button-new-user-wrapper'>

      {formIsVisible ? (
        <form id="create-user-form" onSubmit={createNewAlbumHendler}>
          <div className='form-control-wrapper'>
              <div className="form-control">
                  <label className="create-user-section-title" htmlFor="title">Album title:</label>
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
                  <label className="create-user-section-title" htmlFor="name">Album author:</label>
                  <input
                  className="create-user-text" 
                  type="text"
                  name="name" 
                  id="name" 
                  rows='10'
                  value={formData.name} 
                  onChange={formInputHandler}
                  /> 
              </div>
          </div>
          
          <div className='form-control-wrapper'>
              <div className="form-control">
                  <label className="create-user-section-title" htmlFor="username">Author username:</label>  
                  <input 
                  className="create-user-text" 
                  type="text"  
                  name="username" 
                  id="username"
                  value={formData.username}
                  onChange={formInputHandler}
                  />
              </div>
              <div className="form-control">
                  <label className="create-user-section-title" htmlFor="email">Author email:</label>  
                  <input 
                  className="create-user-text" 
                  type="text"  
                  name="email" 
                  id="email"
                  value={formData.email}
                  onChange={formInputHandler}
                  />
              </div>
          </div>
          <div className='form-control-wrapper'>
              <div className="form-control">
                  <label className="create-user-section-title" htmlFor="date">Date:</label>  
                  <input 
                  className="create-user-text" 
                  type="text"  
                  name="date" 
                  id="date"
                  value={formData.date}
                  onChange={formInputHandler}
                  />
              </div>
              <div className="form-control">
                  <label className="create-user-section-title" htmlFor="time">Time:</label>  
                  <input 
                  className="create-user-text" 
                  type="text"  
                  name="time" 
                  id="time"
                  value={formData.time}
                  onChange={formInputHandler}
                  />
              </div>
          </div>

          <div className='form-buttons-wrapper'>
              <div className='form-button-wrapper'>
                  <button onClick={() => setFormIsVisible(false)} className="user-from-button" >Discard</button>
              </div>
              <div className="form-button-wrapper">
                  <input className="user-from-button" id="submit" type="submit" value="Create Album" />
              </div>
          </div>
          <div className='success-created-user'>
            {albumCreated ? (
                <h2 className='success-created'>Album was created!</h2>
            ) : (
              <div className='required-fiels-messages-wrapper'>
                <p className='required-fields'>{errorMessages}</p>
              </div>
            )}
        </div>
          
        </form>
      ):(
      <button onClick={() => setFormIsVisible(true)} className='user-create-link'><span className='plus-symbol'>+</span><span className='plus-text'>Create Album</span></button>
      )}
      </div>

      <div className='one-album-all-wrapper'>{albums && albums.length > 0 && albums.map((album, index) => (
        <>
        <div className='album-item' key={index}>
          <div className='delete-button-wrapper'>
            <DeleteButton id={album.id} location='albums' />
          </div>
          {photos && photos.length > 0 ? (
            <div className="photos-wrapper">
              {photos.map((photo, index) => (
                <img key={index} src={photo.thumbnailUrl} />
              ))}
            </div>
          ) : (
            <p>No photos</p>
          )}
            <AlbumTitle 
              title={album.title}
              name={album.name}
              username={album.username}
              email={album.email}
              date={album.date}
              time={album.time}
              albumId={album.id}
              userId={album.userId}
            />
        </div>
        </>
        ))}
          
      </div>
  </PageWrapper>
  )
}

export default AlbumsPage