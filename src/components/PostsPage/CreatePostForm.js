import React from 'react'
import './CreatePostForm.scss'


const CreatePostForm = ({ onCreateNewPost, onFormInput, formData, formSetUp }) => {

  return (
    <>
      <form id="create-post-form" onSubmit={onCreateNewPost}>
        <div className="form-control">
            <label className="create-post-section-title" htmlFor="title">Post title:</label>
            <input 
            className="create-post-text" 
            type="text" 
            name="title" 
            id="title" 
            value={formData.title}
            onChange={onFormInput}
            />
        </div>
        <div className="form-control">
            <label className="create-post-section-title" htmlFor="body">Post body:</label>
            <textarea 
            className="create-post-text" 
            name="body" 
            id="body" 
            cols="30" 
            rows="10" 
            value={formData.body} 
            onChange={onFormInput} >
            </textarea>
        </div>
        <div className="form-control">
            <label className="create-post-section-title" htmlFor="user">Post Author:</label>  
            <input 
            className="create-post-text" 
            type="text"  
            name="author" 
            id="user"
            value={formData.author}
            onChange={onFormInput}
            />
        </div>
        <div className="form-control">
            <label className="create-post-section-title" htmlFor="user">Email address:</label>  
            <input 
            className="create-post-text" 
            type="text"  
            name="email" 
            id="user"
            value={formData.email}
            onChange={onFormInput}
            />
        </div>

        <div className='form-buttons-wrapper'>
          <div className='form-button-wrapper'>
              <button className="user-from-button" onClick={() => formSetUp(false)} >Discard</button>
          </div>
          <div className="form-button-wrapper">
              <input className="user-from-button" id="submit" type="submit" value="Create Post" />
          </div>
        </div>
      </form>
    </>
    
  )
}

export default CreatePostForm