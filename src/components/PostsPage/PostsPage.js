import React from 'react'
import { useState, useEffect } from "react"
import PageWrapper from '../PageWrapper/PageWrapper'
import UserShortcutWrapper from '../partials/UserShortcutWrapper';
import PostContent from '../partials/PostContent'
import CreatePostForm from './CreatePostForm'
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


  

  // const editPostHandler = () => {
  //   fetch('http://localhost:3000/posts/2', {
  //   method: 'PUT',
  //   body: JSON.stringify({
  //       id: 2,
  //       title: 'Edited post',
  //       body: 'Edited post content',
  //       userId: 1,
  //   }),
  //   headers: {
  //       'Content-type': 'application/json; charset=UTF-8',
  //   },
  //   })
  //   .then((response) => response.json())
  //   .then((json) => console.log(json));
  //   }


  return (
    <div>
      <PageWrapper>
        <div className='button-new-post-wrapper'>
          
              <CreatePostForm />

        </div>
        
        {posts && posts.length > 0 && posts.map((post, index) => (
            <div className="one-posts-all-wrapper" key={index}>
                <div className="one-post-wrapper">
                  


                    <UserShortcutWrapper
                    image={userImage}
                    userId={post.userId}
                    name={post.user.name}
                    username={post.user.username}
                    companyName={post.user.company.name}
                    postId={post.id}
                    />
                    
                    <PostContent 
                    title={post.title}
                    body={post.body}
                    postId={post.id}
                    />
                    
                </div>
                
                
            </div>
        ))}
        
      </PageWrapper>
    </div>
  )
}

export default PostsPage