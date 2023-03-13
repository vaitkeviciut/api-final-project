import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom'
import PageWrapper from '../PageWrapper/PageWrapper';

import userImage from '../images/user-picture-small.jpg'

import './PostPage.scss'
import '../UsersPage/CreateUserForm.scss'


const PostPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState('');
  const [user, setUser] = useState('');
  const [companyName, setCompanyName] = useState('')
  const [comments, setComments] = useState([]);
  const [postEdited, setPostEdited] = useState(false)
  const [errorMessages, setErrorMessages] = useState([])
  const [editFormIsVisible, setEditFormIsVisible] = useState(false)

  const [formData, setFormData] = useState({})

  useEffect(() => {
    fetch(`http://localhost:3000/posts/${postId}?_expand=user&_embed=comments`)
        .then(res => res.json())
        .then(post => {
            console.log(post)
            setPost(post)
            setUser(post.user)
            setCompanyName(post.user.company.name)
            setComments(post.comments)
            setFormData(post)
        })
  }, [])

  const validateForm = () => {
    let messages = []

    if (!formData.title) {
      messages.push('Title is required')
    }
    if (!formData.body) {
        messages.push('Post is required')
    }
  
    if (messages.length === 0) {
        return true
    } else {
        setErrorMessages(messages.reduce((str, current) => (str + '; ' + current)))
        return false
    }
  }

  const postFormInputHandler = (event, property) => {
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

  const deleteCommentHandler = (id) => {
    fetch(`http://localhost:3000/comments/${id}`, {
        method: 'DELETE',
    });
  }

  const editPostHandler = (event) => {
    event.preventDefault()

      if (!validateForm()) {
      return
      }

      fetch(`http://localhost:3000/posts/${postId}`, {
        method: 'PUT',
        body: JSON.stringify(
          {...formData}
          
          ),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((json) => console.log(json));

        setPostEdited(true)
  }


  return (
    <PageWrapper>

      <div className='user-edit-button-wrapper'>

          {editFormIsVisible ? (
            <form id="create-post-form" onSubmit={editPostHandler}>
            <div className="form-control">
                <label className="create-post-section-title" htmlFor="title">Post title:</label>
                <input 
                className="create-post-text" 
                type="text" 
                name="title" 
                id="title" 
                value={formData.title}
                onChange={postFormInputHandler}
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
                onChange={postFormInputHandler} >
                </textarea>
            </div>
  
            <div className='form-buttons-wrapper'>
              <div className='form-button-wrapper'>
                  <button className="post-from-button" onClick={() => setEditFormIsVisible(false)} >Discard</button>
              </div>
              <div className="form-button-wrapper">
                  <input className="post-from-button" id="submit" type="submit" value="Edit Post" />
              </div>
            </div>
            <div className='success-created-post'>
                  {postEdited ? (
                      <h2 className='success-created'>Post was edited!</h2>
                  ) : (
                    <div className='required-fiels-messages-wrapper'>
                      <p className='required-fields'>{errorMessages}</p>
                    </div>
                  )}
            </div>
          </form>
          ):(
              <button onClick={() => setEditFormIsVisible(true)} className='edit-button'>Edit</button>
          )}

      </div>

      <div className='post-and-comments-wrapper'>
        <div className='post-content-wrapper'>
          <div className='post-header-wrapper'>
              <div className='user-shortcut-wrapper'>
                  <img className='user-photo-small' src={userImage} alt='user' width='60' />
                  <div className='user-shortcut-near-photo-wrapper'>
                      <Link className='user-name-link' to={'/users/' + user.id}>
                          <div className='user-name-username-wrapper'>
                              <h3 className='user-name-post'>{user.name}</h3>
                              <span className='username-text-post'>({user.username})</span>
                          </div>
                          <div className='user-company-wrapper'>
                              <span className='user-company-item'>Works @ {companyName}</span>
                          </div>
                      </Link>
                  </div>
              </div>

          </div>
          
              

          <div className='post-link-wrapper'>
              <h4 className='post-title'>{post.title}</h4>
              <p className='post-body'>{post.body}</p>
          </div>
        </div>

        <div className='comments-content-wrapper'>
            <h2 className='comments-title'>Comments:</h2>
            <div className='comments-wrapper'>

              {comments && comments.length > 0 && comments.map((comment, index) => (
                <div key={index} className='one-comment-wrapper'>
                    <div className='one-comment-header-wrapper'>
                        <p className='comment-email'>{comment.email}</p>
                      <div className='user-delete-button-wrapper'>
                          <button className='delete-button' onClick={() => deleteCommentHandler(comment.id)} >x</button>
                    </div>
                    </div>
                    <div className='comments-content-wrapper'>
                        <h5 className='comment-name'>{comment.name}</h5>
                        <p className='comment-body'>{comment.body}</p>
                    </div>
                </div>
              ))}
                
            </div>
        </div>
      </div>
      
    </PageWrapper>
    
  )
}
export default PostPage;
