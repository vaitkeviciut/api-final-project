import React from 'react'

import './DeleteButton.scss'

const DeleteButton = ({ userId }) => {

    const deleteUserHandler = (userId) => {
        fetch(`http://localhost:3000/users/${userId}`, {
            method: 'DELETE',
        });
    }

  return (
    <div className='user-delete-button-wrapper'>
        <button className='delete-button' onClick={() => deleteUserHandler(userId)}>x</button>
    </div>
  )
}

export default DeleteButton