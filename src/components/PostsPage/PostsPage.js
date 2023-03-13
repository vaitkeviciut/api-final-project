import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import PageWrapper from '../PageWrapper/PageWrapper'
import PostContent from '../partials/PostContent'
import './PostsPage.scss'
import './CreatePostForm.scss'



const PostsPage = () => {
  const { userId } = useParams();
  const [posts, setPosts] = useState([])
  const [postCreated, setPostCreated] = useState(false)
  const [formIsVisible, setFormIsVisible] = useState(false)
  const [errorMessages, setErrorMessages] = useState([])


  const formDefaults = {
    title: '',
    body: '',
    userId: '',
    email: '',
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
  if (!formData.email) {
    messages.push('Email is required')
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

      const userNameInputHandler = (event, property) => {
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


  return (
    <PageWrapper>
      <div className='button-new-post-wrapper'>

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
          <div className="form-control">
              <label className="create-post-section-title" htmlFor="userId">Post Author:</label>  
              <select className="create-post-text" name="userId"  id="user" value={formData.userId} onChange={userNameInputHandler}>
                ({posts && posts.length > 0 && posts.map((post, index) => <option key={index}>{post.userId}</option>)})
              </select>
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
              <PostContent 
                key={index}
                title={post.title}
                body={post.body}
                postId={post.id}
              />
            ))}
          </div>
      
    </PageWrapper>
  )
}

export default PostsPage