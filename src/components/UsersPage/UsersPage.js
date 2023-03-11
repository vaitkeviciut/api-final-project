import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header/Header'
import PageWrapper from '../PageWrapper/PageWrapper'
import './UsersPage.scss';

const UsersPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/users?_embed=posts`)
    .then(res => res.json())
        .then(users => {
            console.log(users)
            setUsers(users)
        })
  }, [])

  return (
    <div>
      <Header />
      <div id='page-content'>
        <PageWrapper>
          <ul className='users-list'>
            {users && users.length > 0 && users.map((user, index) => (
              <li className='users-list-item' key={index}>
              <Link className='users-list-item-link' to={'/users/' + user.id}>
                {user.name}
              </Link>
              <span className='user-posts-count'>({user.posts.length} posts)</span>
            </li>
            ))}
          </ul>
        </PageWrapper>
      </div>
      

    </div>
  )
}

export default UsersPage