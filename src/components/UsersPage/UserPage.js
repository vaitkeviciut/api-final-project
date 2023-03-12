import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import PageWrapper from '../PageWrapper/PageWrapper'
import UserShortcutWrapper from '../partials/UserShortcutWrapper'
import PostContent from '../partials/PostContent'
import AlbumTitle from '../partials/AlbumTitle'
import CreatePostForm from '../PostsPage/CreatePostForm'
import EditUserForm from './EditUserForm'
import './UserPage.scss';

import userImage from '../images/user-picture-small.jpg';

const UserPage = () => {
    const { userId } = useParams();
    const [user, setUser] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [address, setAddress] = useState('');
    const [map, setMap] = useState('');
    const [posts, setPosts] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [userEdited, setUserEdited] = useState(false)
    const [errorMessages, setErrorMessages] = useState([])
    const [postFormIsVisible, setPostFormIsVisible] = useState(false)
    const [editFormIsVisible, setEditFormIsVisible] = useState(false)
    const [formData, setFormData] = useState({})

    useEffect(() => {
        fetch(`http://localhost:3000/users/${userId}?_embed=posts&_embed=albums`)
            .then(res => res.json())
            .then(userData => {
                console.log(userData)

                setUser(userData)
                setCompanyName(userData.company)
                setAddress(userData.address)
                setMap(userData.address.geo)
                setFormData(userData)

                setPosts(userData.posts)

                setAlbums(userData.albums)
            })
    }, [])

    const validateForm = () => {
      let messages = []

      if (!formData.name) {
          messages.push('Name is required')
      }
      if (!formData.username) {
          messages.push('Username is required')
      }
      if (!formData.email) {
          messages.push('Email is required')
      }
      if (!formData.address.street || !formData.address.suite || !formData.address.city || !formData.address.zipcode) {
        messages.push('Address is required')
    }

      if (messages.length === 0) {
          return true
      } else {
          setErrorMessages(messages.reduce((str, current) => str + '; ' + current))
          return false
      }
  }

    const userFormInputHandler = (event) => {
      setFormData(prevState => {
          const updatedData  = {...prevState}
          updatedData[event.target.name] = event.target.value
          return updatedData 
      });
  };

      const deleteUserHandler = (userId) => {
        fetch(`http://localhost:3000/users/${userId}`, {
            method: 'DELETE',
        });
    }

    const editUserHandler = (event) => {
      event.preventDefault()

        if (!validateForm()) {
        return
        }

        fetch(`http://localhost:3000/users/${userId}`, {
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

          setUserEdited(true)
    }
    

  return (
    <PageWrapper>
      <div className='user-delete-button-wrapper'>

          {editFormIsVisible ? (
          <EditUserForm onEditUser={() => editUserHandler(userId)} onFormInput={userFormInputHandler} formData={formData} formSetUp={setEditFormIsVisible} />
          ):(
            <button onClick={() => setEditFormIsVisible(true)} className='edit-button'>Edit</button>
          )}

          {userEdited ? (
              <h2 className='success-created'>User was edited!</h2>
          ) : (
            <div className='required-fiels-messages-wrapper'>
              <p className='required-fields'>{errorMessages}</p>
            </div>
          )}

          
            <button className='delete-button' onClick={() => deleteUserHandler(userId)}>x</button>
      </div>


      <div className='user-info-wrapper'>
          <div className='user-photo-wrapper'>
              <img className='user-photo' src={userImage} width='250' alt='user' />
          </div>
          <div className='user-text-wrapper'>
              <div className='name-wrapper'>
                <h2 className='user-name'>{user.name}</h2>
                <span className='username-text'>({user.username})</span>
              </div>
            <div className='user-company-wrapper'>
                <span className='user-company-item'>Works @ {companyName.name}</span>
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
                <a className='adress-link' href={`https://www.google.com/maps/place/${map.lat}, ${map.lng}`} target='_blank' rel="noreferrer" >{address.street} street - {address.suite}, {address.city}, {address.zipcode}</a>
            </div>
          </div>
      </div>


      <div  className='posts-wrapper'>
        <h4 className='posts-title'>User posts:</h4>

        {posts && posts.length > 0 && posts.map((post, index) => (
        <div key={index} className='user-post-wrapper-link'>

          <UserShortcutWrapper
            image={userImage}
            userId={post.userId}
            name={user.name}
            username={user.username}
            companyName={user.company.name}
            postId={post.id}
          />

          <PostContent 
            title={post.title}
            body={post.body}
            postId={post.id}
          />

        </div>
        ))}
      </div>
      

      <div className='albums-wrapper'>
        <h4 className='albums-title'>User albums:</h4>
        <div className='albums-link-wrapper'>

          {albums && albums.length > 0 && albums.map((album, index) => (

            <AlbumTitle
              key={index}
              title={album.title}
              albumId={album.id}
            />
          ))}

          </div>
      </div>

    </PageWrapper>
  )
}

export default UserPage