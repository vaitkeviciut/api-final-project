import React from 'react'

import './DeleteButton.scss'

const DeleteButton = ({ location, id }) => {

    const deleteHandler = (id) => {
        fetch(`http://localhost:3000/${location}/${id}`, {
            method: 'DELETE',
        });
    }

  return (
    
        <button className='delete-button' onClick={() => deleteHandler(id)}>x</button>
    
  )
}

export default DeleteButton