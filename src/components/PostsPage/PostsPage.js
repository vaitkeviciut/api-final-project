import React from 'react'
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Header from '../Header/Header'
import PageWrapper from '../PageWrapper/PageWrapper'
import './PostsPage.scss'

import userImage from '../images/user-picture-small.jpg';

const PostsPage = () => {
  const [posts, setPosts] = useState([])


    useEffect(() => {
      fetch(`http://localhost:3000/posts?_expand=user`)
      .then(res => res.json())
      .then(postsData => {
          console.log(postsData)
          setPosts(postsData)
      })
    }, [])

  const newPostHandler = () => {
    fetch(`http://localhost:3000/posts`, {
    method: 'POST',
    body: JSON.stringify({
        title: 'Sukurtas pirmas postas',
        body: 'Sukurto posto turinys',
        userId: 1,
    }),
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
    })
    .then((response) => response.json())
    .then((json) => console.log(json));
  }

  const deletePostHandler = (id) => {
    fetch(`http://localhost:3000/posts/${id}`, {
        method: 'DELETE',
        });
  	}

  const editPostHandler = () => {
    fetch('http://localhost:3000/posts/2', {
    method: 'PUT',
    body: JSON.stringify({
        id: 2,
        title: 'Edited post',
        body: 'Edited post content',
        userId: 1,
    }),
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
    })
    .then((response) => response.json())
    .then((json) => console.log(json));
    }


  return (
    <div>
      <Header />
      <PageWrapper>
        <div className='button-new-post-wrapper'>
          <a className='post-create-link' href='./#'>
            <button onClick={newPostHandler}>Add Post</button>
            <span className='plus-symbol'>+</span>
            <span className='plus-text'>Create Post</span>
            </a>
          
          <button onClick={editPostHandler}>Edit 2</button>
        </div>
        
        
        {posts && posts.length > 0 && posts.map((post, index) => (
            <div className="one-posts-all-wrapper" key={index}>
                <div className="one-post-wrapper">
                    <div className="user-shortcut-wrapper">
                        <img className="user-photo-small" src={userImage} alt={userImage} width='60' />
                        <div className="user-shortcut-near-photo-wrapper">
                            <Link className="user-name-link" to={`apipage/users/` + post.userId}>
                                <div className="user-name-username-wrapper">
                                    <h3 className="user-name-post">{post.user.name}</h3>
                                    <span className="username-text-post">({post.user.username})</span>
                                </div>
                                <div className="user-company-wrapper">
                                    <span className="user-company-item">Works @ {post.user.company.name}</span>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className='post-button-wrapper'>
                        <button onClick={() => deletePostHandler(post.id)}>Delete</button>
                    </div>
                    <div className="post-text-wrapper">
                        <Link className='posts-list-item-link' to={`apipage/posts/` + post.id}>
                            <h2 className="post-title">{post.title}</h2>
                            <p className="post-body">{post.body}</p>
                        </Link>
                    </div>
                </div>
                
                
            </div>
        ))}
        
      </PageWrapper>
    </div>
  )
}

export default PostsPage