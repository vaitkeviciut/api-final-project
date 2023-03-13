import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import PageWrapper from '../PageWrapper/PageWrapper'
import PostContent from '../partials/PostContent'
import AlbumTitle from '../partials/AlbumTitle'
import DeleteButton from '../partials/DeleteButton'
import MovieContent from '../partials/MovieContent'

import userImage from '../images/user-picture-small.jpg';

import './UserPage.scss';
import './CreateUserForm.scss'


const UserPage = () => {
  const { userId } = useParams();
  const [user, setUser] = useState('');
  const [movies, setMovies] = useState('')
  const [companyName, setCompanyName] = useState('');
  const [address, setAddress] = useState('');
  const [map, setMap] = useState('');
  const [posts, setPosts] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [email, setEmail] = useState('');
  const [userEdited, setUserEdited] = useState(false)
  const [errorMessages, setErrorMessages] = useState([])
  const [editFormIsVisible, setEditFormIsVisible] = useState(false)

  const [formData, setFormData] = useState({})

  useEffect(() => {
      fetch(`http://localhost:3000/users/${userId}?_embed=posts&_embed=albums&_embed=movies`)
          .then(res => res.json())
          .then(userData => {
              console.log(userData.email)

              setUser(userData)
              setEmail(userData.email)
              setCompanyName(userData.company)
              setAddress(userData.address)
              setMap(userData.address.geo)
              setFormData(userData)

              setPosts(userData.posts)

              setAlbums(userData.albums)

              setMovies(userData.movies)
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

  const userFormInputHandler = (event, property) => {
    setFormData(prevState => {
        const updatedData  = {...prevState}

        if (!property) {
          updatedData[event.target.name] = event.target.value
          } else {
          updatedData[property][event.target.name] = event.target.value
          }
          return updatedData 
    });
  };

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
      <div className='user-edit-button-wrapper'>

          {editFormIsVisible ? (
          <form id="create-user-form" onSubmit={editUserHandler}>
            <div className='form-control-wrapper'>
                <div className="form-control">
                    <label className="create-user-section-title" htmlFor="name">Name:</label>
                    <input 
                    className="create-user-text" 
                    type="text" 
                    name="name" 
                    id="name" 
                    value={formData.name}
                    onChange={userFormInputHandler}
                    />
                </div>
                <div className="form-control">
                    <label className="create-user-section-title" htmlFor="username">Username:</label>
                    <input 
                    className="create-user-text" 
                    type="text"
                    name="username" 
                    id="username"  
                    value={formData.username} 
                    onChange={userFormInputHandler}
                    />
                </div>
            </div>
            
            <div className='form-control-wrapper'>
                <div className="form-control">
                    <label className="create-user-section-title" htmlFor="email">Email:</label>  
                    <input 
                    className="create-user-text" 
                    type="text"  
                    name="email" 
                    id="email"
                    value={formData.email}
                    onChange={userFormInputHandler}
                    />
                </div>
                <div className="form-control">
                    <label className="create-user-section-title" htmlFor="phone">Phone:</label>  
                    <input 
                    className="create-user-text" 
                    type="text"  
                    name="phone" 
                    id="phone"
                    value={formData.phone}
                    onChange={userFormInputHandler}
                    />
                </div>
            </div>

            <div className='form-control-wrapper'>
                <div className="form-control">
                    <label className="create-user-section-title" htmlFor="street">Street:</label>  
                    <input 
                    className="create-user-text" 
                    type="text"  
                    name="street" 
                    id="street"
                    value={formData.address.street}
                    onChange={(event) => userFormInputHandler( event, 'address')}
                    />
                </div>
                <div className="form-control">
                    <label className="create-user-section-title" htmlFor="suite">Suite:</label>  
                    <input 
                    className="create-user-text" 
                    type="text"  
                    name="suite" 
                    id="suite"
                    value={formData.address.suite}
                    onChange={(event) => userFormInputHandler( event, 'address')}
                    />
                </div>
                <div className="form-control">
                    <label className="create-user-section-title" htmlFor="city">City:</label>  
                    <input 
                    className="create-user-text" 
                    type="text"  
                    name="city" 
                    id="city"
                    value={formData.address.city}
                    onChange={(event) => userFormInputHandler( event, 'address')}
                    />
                </div>
                <div className="form-control">
                    <label className="create-user-section-title" htmlFor="zipcode">Zipcode:</label>  
                    <input 
                    className="create-user-text" 
                    type="text"  
                    name="zipcode" 
                    id="zipcode"
                    value={formData.address.zipcode}
                    onChange={(event) => userFormInputHandler( event, 'address')}
                    />
                </div>
            </div>

            <div className='form-control-wrapper'>
                <div className="form-control">
                    <label className="create-user-section-title" htmlFor="website">Website:</label>  
                    <input 
                    className="create-user-text" 
                    type="text"  
                    name="website" 
                    id="website"
                    value={formData.website}
                    onChange={userFormInputHandler}
                    />
                </div>
                <div className="form-control">
                    <label className="create-user-section-title" htmlFor="name">Company name:</label>  
                    <input 
                    className="create-user-text" 
                    type="text"  
                    name="name" 
                    id="company"
                    value={formData.company.name}
                    onChange={(event) => userFormInputHandler( event, 'company')}
                    />
                </div>
            </div>

            <div className='form-buttons-wrapper'>
                <div className='form-button-wrapper'>
                    <button onClick={() => setEditFormIsVisible(false)} className="user-from-button" >Discard</button>
                </div>
                <div className="form-button-wrapper">
                    <input className="user-from-button" id="submit" type="submit" value="Save Changes" />
                </div>
            </div>
            <div className='success-edited'>
                {userEdited ? (
                    <h2 className='success-created'>User was edited!</h2>
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
                    <a href={`mailto:${email}`} className='user-list-link'>{email}</a>
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

          <PostContent 
            title={post.title}
            body={post.body}
            postId={post.id}
            name={post.name} 
            username={post.username} 
            company={post.company}
            image={userImage}
            userLink={userId}
            date={post.date}
            time={post.time}
          />
          <div className='posts-delete-button-wrapper'>
            <DeleteButton id={post.id} location='posts' />
          </div>
        </div>
        ))}
      </div>
      

      <div className='albums-wrapper'>
        <h4 className='albums-title'>User albums:</h4>
        <div className='albums-all-wrapper'>
          {albums && albums.length > 0 && albums.map((album, index) => (
            <div className='albums-link-wrapper'>
              <div className='albums-delete-button-wrapper'>
                <DeleteButton id={album.id} location='albums' />
              </div>
              <AlbumTitle
                key={index}
                title={album.title}
                albumId={album.id}
                name={album.name}
                username={album.username}
                email={album.email}
                date={album.date}
                time={album.time}
              />
            </div>
          ))}
        </div>
      </div>



      <div className='movies-wrapper'>
        <h4 className='movies-title'>User movies:</h4>
        <div className='movies-all-wrapper'>
        {movies && movies.length > 0 && movies.map((movie, index) => (
            <div className='movies-link-wrapper' key={index} >
              <div className='movies-delete-button-wrapper'>
                <DeleteButton id={movie.id} location='movies' />
              </div>
              <MovieContent 
              title={movie.title}
              description={movie.description}
              author={movie.author}
              year={movie.year}
              userId={movie.userId}
              movieId={movie.id}
            />
            </div>
          ))}
        </div>
      </div>

    </PageWrapper>
  )
}

export default UserPage