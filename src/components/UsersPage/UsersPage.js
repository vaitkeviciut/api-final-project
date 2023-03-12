import React, { useEffect, useState } from 'react';
import PageWrapper from '../PageWrapper/PageWrapper';
import CreateUserForm from './CreateUserForm';
import UserItem from './UserItem';
import './UsersPage.scss';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [formIsVisible, setFormIsVisible] = useState(false)

  const formDefaults = {
    name: '',
    username: '',
    email: '',
    phone: '',
    street: '',
    suite: '',
    city: '',
    zipcode: '',
    website: '',
    companyName: '',

}

const [formData, setFormData] = useState(formDefaults)

  useEffect(() => {
    fetch(`http://localhost:3000/users?_embed=posts`)
    .then(res => res.json())
        .then(users => {
            console.log(users)
            setUsers(users)
        })
  }, [])


  const formInputHandler = (event) => {
    setFormData(prevState => {
        const updatedData  = {...prevState}
        updatedData[event.target.name] = event.target.value
        return updatedData 
    });
};


  const createNewUserHendler = () => {
    fetch(`http://localhost:3000/users`, {
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
    }

    

  return (
    <div>
      <div id='page-content'>
        <PageWrapper>
        <div className='button-new-user-wrapper'>

        {formIsVisible ? (

          <CreateUserForm onCreateNewUser={createNewUserHendler} onformInput={formInputHandler} formData={formData} formSetUp={setFormIsVisible} />
          ):(
          <button onClick={() => setFormIsVisible(true)} className='post-create-link'><span className='plus-symbol'>+</span><span className='plus-text'>Create User</span></button>
          )
        }


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
      </div>
      

    </div>
  )
}

export default UsersPage