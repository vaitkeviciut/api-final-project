import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import PageWrapper from '../PageWrapper/PageWrapper';
import axios from 'axios';

import './AlbumPage.scss';

const AlbumPage = () => {
    const { albumId } = useParams();
    const [photos, setPhotos] = useState([]);
    const [title, setTitle] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    

    useEffect(() => {
      axios.get(`http://localhost:3000/albums/${albumId}`).then((albums) => {
        const albumsData = albums.data;
        console.log(albumsData)
        setTitle(albumsData.title)
        setName(albumsData.name)
        setUsername(albumsData.username)
        setEmail(albumsData.email)
        setDate(albumsData.date)
        setTime(albumsData.time)
      });
    }, [albumId]);

    useEffect(() => {
      axios.get(`http://localhost:3000/albums/1/photos`).then((photos) => {
        const photosData = photos.data;
        setPhotos(photosData);
      });
    }, []);


  return (
    <PageWrapper>
      <div className='album-wrapper'>
        
            <div className='album-content'>
              <h2 className='album-title'>{title}</h2>
              <div className='user-wrapper'>
                <span className='name'>by {name} ({username})</span>
                <span className='email'>{email}</span>
              </div>
              <div className='date-time-wrapper'>
                <span className='date'>{date}</span>
                <span className='time'>{time}</span>
              </div>
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
    

      </div>


    </PageWrapper>
  )
}

export default AlbumPage