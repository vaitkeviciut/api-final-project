import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../Header/Header'
import PageWrapper from '../PageWrapper/PageWrapper'
import './UserPage.scss';

import userImage from '../images/user-picture-small.jpg';

const UserPage = () => {
    const { userId } =useParams();
    const [user, setUser] = useState('');
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3000/users/${userId}?_expand=posts`)
            .then(res => res.json())
            .then(userData => {
                console.log(userData)
                setUser(userData)
                setPosts(userData)
            })
    }, [])



  return (
    <div>
      <Header />
      <div id='page-content'>
      <PageWrapper>
        <div className='user-info-wrapper'>
          <div className='user-photo-wrapper'>
            <img className='user-photo' src={userImage} width='250' />
          </div>
          <div className='user-text-wrapper'>
            <div className='name-wrapper'>
              <h2 className='user-name'>{user.name}</h2>
              <span className='username-text'>({user.username})</span>
            </div>
            <div className='user-company-wrapper'>
              <span className='user-company-item'>Works @ {user.company.name}</span>
              <a href='./#' className='user-web-item'>{user.website}</a>
            </div>
            <ul className='user-contacts-list'>User contacts:
              <li className='user-list-item'>
                <a href={`tel:${user.phone}`} className='user-list-link'>{user.phone}</a>
              </li>
              <li className='user-list-item'>
                <a href={`mailto:${user.email}`} className='user-list-link'>{user.email}</a>
              </li>
            </ul>
            <div className='user-address-wrapper'>
              <a className='adress-link' href={`https://www.google.com/maps/place/${user.address.geo.lat}, ${user.address.geo.lng}`} target='_blank' >{user.address.street} street - {user.address.suite}, {user.address.city}, {user.address.zipcode}</a>
            </div>
          </div>
        </div>

        {posts && posts.length > 0 && posts.map((post, index) => (
          <div key={index} className='posts-wrapper'>{user.post}</div>
        ))}
        
        <div className='albums-wrapper'></div>
      </PageWrapper>

      </div>
        
    </div>
  )
}

export default UserPage