import React, { useState } from 'react'
import './CreatePostForm.scss'

const CreatePostForm = () => {
    const [formIsVisible, setFormIsVisible] = useState(false)

    const [formData, setFormData] = useState({
        title: '',
        body: '',
        author: '',
        email: '',
    })

    const formInputHandler = (event) => {
        setFormData(prevState => {
            const newData = {...prevState}
            newData[event.target.name] = event.target.value
            return newData
        })
    }

    const createNewPostHendler = () => {
        fetch(`http://localhost:3000/posts`, {
        method: 'POST',
        body: JSON.stringify(
            {...formData}
        ),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        })
        .then((res) => res.json())
        .then((data) => {
            setFormData((formData) => [...formData, data])
        });
    }

  return (
    <>
    {formIsVisible ?
        <form id="create-post-form" onSubmit={createNewPostHendler}>
            <div className="form-control">
                <label className="create-post-section-title" htmlFor="title">Post title:</label>
                <input 
                className="create-post-text" 
                type="text" 
                name="title" 
                id="title" 
                value={formData.title}
                onChange={formInputHandler}
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
                onChange={formInputHandler} >
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
                onChange={formInputHandler}
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
                onChange={formInputHandler}
                />
            </div>
            <div className="edit-post-button-wrapper">
                <input className="edit-post-button" id="submit" type="submit" value="Create Post" />
            </div>
            <div className='discard-form-button-wrapper'>
                <button onClick={() => setFormIsVisible(false)} >Discard</button>
            </div>
        </form>:
        <button onClick={() => setFormIsVisible(true)} className='post-create-link'>
            <span className='plus-symbol'>+</span>
            <span className='plus-text'>Create Post</span>
        </button>
        }
    </>
    
  )
}

export default CreatePostForm