import React from 'react'
import './EditUserForm.scss'

const EditUserForm = ({ onEditUser, onformInput, formData, formSetUp }) => {
  return (
    <form id="create-user-form" onSubmit={onEditUser}>
        <div className='form-control-wrapper'>
            <div className="form-control">
                <label className="create-user-section-title" htmlFor="name">Name:</label>
                <input 
                className="create-user-text" 
                type="text" 
                name="name" 
                id="name" 
                value={formData.name}
                onChange={onformInput}
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
                onChange={onformInput}
                />
            </div>
        </div>
        
        <div className='form-control-wrapper'>
            <div className="form-control">
                <label className="create-user-section-title" htmlFor="user">Email:</label>  
                <input 
                className="create-user-text" 
                type="text"  
                name="email" 
                id="email"
                value={formData.email}
                onChange={onformInput}
                />
            </div>
            <div className="form-control">
                <label className="create-user-section-title" htmlFor="user">Phone:</label>  
                <input 
                className="create-user-text" 
                type="text"  
                name="phone" 
                id="phone"
                value={formData.phone}
                onChange={onformInput}
                />
            </div>
        </div>

        <div className='form-control-wrapper'>
            <div className="form-control">
                <label className="create-user-section-title" htmlFor="user">Street:</label>  
                <input 
                className="create-user-text" 
                type="text"  
                name="street" 
                id="street"
                value={formData.street}
                onChange={onformInput}
                />
            </div>
            <div className="form-control">
                <label className="create-user-section-title" htmlFor="user">Suite:</label>  
                <input 
                className="create-user-text" 
                type="text"  
                name="suite" 
                id="suite"
                value={formData.suite}
                onChange={onformInput}
                />
            </div>
            <div className="form-control">
                <label className="create-user-section-title" htmlFor="user">City:</label>  
                <input 
                className="create-user-text" 
                type="text"  
                name="city" 
                id="city"
                value={formData.city}
                onChange={onformInput}
                />
            </div>
            <div className="form-control">
                <label className="create-user-section-title" htmlFor="user">Zipcode:</label>  
                <input 
                className="create-user-text" 
                type="text"  
                name="zipcode" 
                id="zipcode"
                value={formData.zipcode}
                onChange={onformInput}
                />
            </div>
        </div>

        <div className='form-control-wrapper'>
            <div className="form-control">
                <label className="create-user-section-title" htmlFor="user">Website:</label>  
                <input 
                className="create-user-text" 
                type="text"  
                name="website" 
                id="website"
                value={formData.website}
                onChange={onformInput}
                />
            </div>
            <div className="form-control">
                <label className="create-user-section-title" htmlFor="user">Company name:</label>  
                <input 
                className="create-user-text" 
                type="text"  
                name="companyName" 
                id="companyName"
                value={formData.companyName}
                onChange={onformInput}
                />
            </div>
        </div>

        <div className='form-buttons-wrapper'>
            <div className='form-button-wrapper'>
                <button onClick={() => formSetUp(false)} className="user-from-button" >Discard</button>
            </div>
            <div className="form-button-wrapper">
                <input className="user-from-button" id="submit" type="submit" value="Save Changes" />
            </div>
        </div>
        
    </form>
  )
}

export default EditUserForm