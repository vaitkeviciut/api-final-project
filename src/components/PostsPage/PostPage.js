import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom'
import PageWrapper from '../PageWrapper/PageWrapper';
import './PostPage.scss'

import userImage from '../images/user-picture-small.jpg'

const PostPage = () => {
    const { postId } = useParams();
    const [post, setPost] = useState('');
    const [user, setUser] = useState('');
    const [comments, setComments] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3000/posts/${postId}?_expand=user&_embed=comments`)
            .then(res => res.json())
            .then(posts => {
                console.log(posts)
                setPost(posts)
                setUser(posts.user)
                setComments(posts.comments)
            })
    }, [])


  return (
    <PageWrapper>
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
                              <span className='user-company-item'>Works @ {user.company.name}</span>
                          </div>
                      </Link>
                  </div>
              </div>
              <div className='user-edit-button-wrapper'>
                  <button className='edit-button'>Edit</button>
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
                          <button className='delete-button'>x</button>
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
