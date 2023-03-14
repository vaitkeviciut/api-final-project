import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import PageWrapper from '../PageWrapper/PageWrapper'
import PostContent from '../partials/PostContent'
import DeleteButton from '../partials/DeleteButton'
import './PostsPage.scss'
import './CreatePostForm.scss'

import userImage from '../images/user-picture-small.jpg';



const PostsPage = () => {
  const { userId } = useParams();
  const [posts, setPosts] = useState([])
  const [postCreated, setPostCreated] = useState(false)
  const [formIsVisible, setFormIsVisible] = useState(false)
  const [errorMessages, setErrorMessages] = useState([])


  const formDefaults = {
    title: '',
    body: '',
    name: '',
    username: '',
    email: '',
    company: '',
    date: '2023-03-14',
    time: '14:05'
}

const [formData, setFormData] = useState(formDefaults)


const validateForm = () => {
  let messages = []

  if (!formData.title) {
      messages.push('Title is required')
  }
  if (!formData.body) {
      messages.push('Post is required')
  }
  if (!formData.name) {
    messages.push('Name is required')
  }
  if (!formData.username) {
    messages.push('Username is required')
  }
  if (!formData.email) {
    messages.push('Email is required')
  }
  if (!formData.company) {
    messages.push('Company is required')
  }

  if (messages.length === 0) {
      return true
  } else {
      setErrorMessages(messages.reduce((str, current) => (str + '; ' + current)))
      return false
  }
}

useEffect(() => {
  fetch(`http://localhost:3000/posts`)
  .then(res => res.json())
      .then(posts => {
          console.log(posts)
          setPosts(posts)
      })
}, [userId])

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

    const createNewPostHendler = (event) => {
      event.preventDefault()

      if (!validateForm()) {
        return
        }

      fetch(`http://localhost:3000/posts/`, {
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
        setPostCreated(true)
      }


  return (
    <PageWrapper>
      <div className='page-title-wrapper'>
        <h1 className='page-title'>Posts...</h1>
      </div>

      <div className='button-new-user-wrapper'>

        {formIsVisible ? (
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
          <div className='form-control-row'>
            <div className="form-control">
                <label className="create-post-section-title" htmlFor="name">Post author name:</label>
                <input 
                className="create-post-text" 
                type="text" 
                name="name" 
                id="name" 
                value={formData.name}
                onChange={formInputHandler}
                />
            </div>
            <div className="form-control">
                <label className="create-post-section-title" htmlFor="username">Post author username:</label>
                <input 
                className="create-post-text" 
                type="text" 
                name="username" 
                id="username" 
                value={formData.username}
                onChange={formInputHandler}
                />
            </div>
          </div>
          <div className='form-control-row'>
            <div className="form-control">
                <label className="create-post-section-title" htmlFor="email">Post author email:</label>
                <input 
                className="create-post-text" 
                type="text" 
                name="email" 
                id="email" 
                value={formData.email}
                onChange={formInputHandler}
                />
            </div>
            <div className="form-control">
                <label className="create-post-section-title" htmlFor="company">Post author company:</label>
                <input 
                className="create-post-text" 
                type="text" 
                name="company" 
                id="company" 
                value={formData.company}
                onChange={formInputHandler}
                />
            </div>

            <div className="form-control">
                <label className="create-post-section-title" htmlFor="date">Date:</label>
                <input 
                className="create-post-text" 
                type="text" 
                name="date" 
                id="date" 
                value={formData.date}
                onChange={formInputHandler}
                />
            </div>
            <div className="form-control">
                <label className="create-post-section-title" htmlFor="time">Time:</label>
                <input 
                className="create-post-text" 
                type="text" 
                name="time" 
                id="time" 
                value={formData.time}
                onChange={formInputHandler}
                />
            </div>
          </div>

          <div className='form-buttons-wrapper'>
            <div className='form-button-wrapper'>
                <button className="user-from-button" onClick={() => setFormIsVisible(false)} >Discard</button>
            </div>
            <div className="form-button-wrapper">
                <input className="user-from-button" id="submit" type="submit" value="Create Post" />
            </div>
          </div>
          <div className='success-created-post'>
                {postCreated ? (
                    <h2 className='success-created'>Post was created!</h2>
                ) : (
                  <div className='required-fiels-messages-wrapper'>
                    <p className='required-fields'>{errorMessages}</p>
                  </div>
                )}
          </div>
        </form>
        ):(
          <button onClick={() => setFormIsVisible(true)} className='post-create-link'><span className='plus-symbol'>+</span><span className='plus-text'>Create Post</span></button>
        )}
      </div>
    
          <div className="one-posts-all-wrapper" >
          {posts && posts.length > 0 && posts.map((post, index) => (
            <div className="one-post-wrapper">
              <PostContent 
                key={index}
                title={post.title}
                body={post.body}
                postId={post.id}
                name={post.name} 
                username={post.username} 
                company={post.company}
                image={userImage}
                userLink={userId}
                date={post.date}
                time={post.time}
                userId={post.userId}
              />
              <div className='post-delete-button-wrapper'>
              <DeleteButton id={post.id} location='posts' />
              </div>
              </div>
            ))}
          </div>
      
    </PageWrapper>
  )
}

export default PostsPage