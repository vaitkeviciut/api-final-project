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
                <label className="create-user-section-title" htmlFor="email">Email:</label>  
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
                <label className="create-user-section-title" htmlFor="phone">Phone:</label>  
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
                <label className="create-user-section-title" htmlFor="street">Street:</label>  
                <input 
                className="create-user-text" 
                type="text"  
                name="street" 
                id="street"
                value={formData.address.street}
                onChange={(event) => onformInput( event, 'address')}
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
                onChange={(event) => onformInput( event, 'address')}
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
                onChange={(event) => onformInput( event, 'address')}
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
                onChange={(event) => onformInput( event, 'address')}
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
                onChange={onformInput}
                />
            </div>
            <div className="form-control">
                <label className="create-user-section-title" htmlFor="company">Company name:</label>  
                <input 
                className="create-user-text" 
                type="text"  
                name="company" 
                id="company"
                value={formData.company.name}
                onChange={(event) => onformInput( event, 'company')}
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