import React, { useEffect, useState } from 'react';
import PageWrapper from '../PageWrapper/PageWrapper';
import CreateUserForm from './CreateUserForm';
import UserItem from './UserItem';
import './UsersPage.scss';

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
        zipcode: '',
        },
    website: '',
    company: {
        name: '',
    },
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
      <div className='button-new-user-wrapper'>

          {formIsVisible ? (
            <CreateUserForm onCreateNewUser={createNewUserHendler} onformInput={formInputHandler} formData={formData} formSetUp={setFormIsVisible} />
            ):(
            <button onClick={() => setFormIsVisible(true)} className='post-create-link'><span className='plus-symbol'>+</span><span className='plus-text'>Create User</span></button>
            )}

          {userCreated ? (
              <h2 className='success-created'>New user was created!</h2>
          ) : (
              <div className='required-fiels-messages-wrapper'>
                <p className='required-fields'>{errorMessages}</p>
              </div>
          )}
      </div>

      <ul className='users-list'>
          {users && users.length > 0 && users.map((user, index) => (

            <UserItem 
            key={index}
            name={user.name}
            postsLength={user.posts.length}
            userId={user.id}
            />
          ))}
      </ul>
    </PageWrapper>
  )
}

export default UsersPage