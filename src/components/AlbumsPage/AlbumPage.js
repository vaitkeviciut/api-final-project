import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import PageWrapper from '../PageWrapper/PageWrapper';
import axios from 'axios';

const AlbumPage = () => {
    const { albumId } = useParams();
    const [title, setTitle] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    

    useEffect(() => {
      axios.get(`http://localhost:3000/albums/${albumId}`).then((albums) => {
        const albumsData = albums.data;
        console.log(albumsData)
        setTitle(albumsData.title)
        setName(albumsData.name)
        setUsername(albumsData.username)
        setDate(albumsData.date)
        setTime(albumsData.time)
      });
    }, [albumId]);


  return (
    <PageWrapper>
      <div className='album-wrapper'>

            <div className='album-content'>
              <h2 className='album-title'>{title}</h2>
              <span>{name}</span>
              <span>{username}</span>
              <span>{date}</span>
              <span>{time}</span>
            </div>
    

      </div>


    </PageWrapper>
  )
}

export default AlbumPage