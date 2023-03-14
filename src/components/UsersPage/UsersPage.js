import React, { useEffect, useState } from 'react';
import PageWrapper from '../PageWrapper/PageWrapper';
import UserItem from './UserItem';
import DeleteButton from '../partials/DeleteButton'
import './UsersPage.scss';
import './CreateUserForm.scss';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [userCreated, setUserCreated] = useState(false)
  const [formIsVisible, setFormIsVisible] = useState(false)
  const [errorMessages, setErrorMessages] = useState([])

  const formDefaults = {
    name: '',
    username: '',
    email: '',
    phone: '',
    address: {
        street: '',
        suite: '',
        city: '',
        zipcode: ''
        },
    website: '',
    company: {
        name: ''
    }
}
const [formData, setFormData] = useState(formDefaults)

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
      setErrorMessages(messages.reduce((str, current) => (str + '; ' + current)))
      return false
  }
}


  useEffect(() => {
    fetch(`http://localhost:3000/users?_embed=posts`)
    .then(res => res.json())
        .then(users => {
            console.log(users)
            setUsers(users)
        })
  }, [])


    const formInputHandler = (event, property) => {
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


  const createNewUserHendler = (event) => {
    event.preventDefault()

    if (!validateForm()) {
    return
    }

    fetch(`http://localhost:3000/users/`, {
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
      setUserCreated(true)
    }

    

  return (
    <PageWrapper>

        <div className='page-title-wrapper'>
            <h1 className='page-title'>Users...</h1>
        </div>

      <div className='button-new-user-wrapper'>

          {formIsVisible ? (
            <form id="create-user-form" onSubmit={createNewUserHendler}>
              <div className='form-control-wrapper'>
                  <div className="form-control">
                      <label className="create-user-section-title" htmlFor="name">Name:</label>
                      <input 
                      className="create-user-text" 
                      type="text" 
                      name="name" 
                      id="name" 
                      value={formData.name}
                      onChange={formInputHandler}
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
                      onChange={formInputHandler}
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
                      onChange={formInputHandler}
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
                      onChange={formInputHandler}
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
                      onChange={(event) => formInputHandler( event, 'address')}
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
                      onChange={(event) => formInputHandler( event, 'address')}
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
                      onChange={(event) => formInputHandler( event, 'address')}
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
                      onChange={(event) => formInputHandler( event, 'address')}
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
                      onChange={formInputHandler}
                      />
                  </div>
                  <div className="form-control">
                      <label className="create-user-section-title" htmlFor="name">Company name:</label>  
                      <input 
                      className="create-user-text" 
                      type="text"  
                      name="name" 
                      id="cpmpany"
                      value={formData.company.name}
                      onChange={(event) => formInputHandler( event, 'company')}
                      />
                  </div>
              </div>
      
              <div className='form-buttons-wrapper'>
                  <div className='form-button-wrapper'>
                      <button onClick={() => setFormIsVisible(false)} className="user-from-button" >Discard</button>
                  </div>
                  <div className="form-button-wrapper">
                      <input className="user-from-button" id="submit" type="submit" value="Create User" />
                  </div>
              </div>
              <div className='success-created-user'>
                {userCreated ? (
                    <h2 className='success-created'>User was created!</h2>
                ) : (
                  <div className='required-fiels-messages-wrapper'>
                    <p className='required-fields'>{errorMessages}</p>
                  </div>
                )}
            </div>
              
            </form>
            ):(
            <button onClick={() => setFormIsVisible(true)} className='user-create-link'><span className='plus-symbol'>+</span><span className='plus-text'>Create User</span></button>
            )}
      </div>

      <ul className='users-list'>
          {users && users.length > 0 && users.map((user, index) => (
            <li className='users-list-item'>
                <UserItem 
                key={index}
                name={user.name}
                postsLength={user.posts.length}
                userId={user.id}
                />
                <DeleteButton id={user.id} location='users' />
            </li>
          ))}
      </ul>
    </PageWrapper>
  )
}

export default UsersPage