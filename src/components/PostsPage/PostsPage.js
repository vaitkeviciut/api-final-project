import React, { useState, useEffect } from 'react'
import PageWrapper from '../PageWrapper/PageWrapper'
import PostContent from '../partials/PostContent'
import CreatePostForm from './CreatePostForm'
import './PostsPage.scss'



const PostsPage = () => {
  const [posts, setPosts] = useState([])
  const [formIsVisible, setFormIsVisible] = useState(false)

  const formDefaults = {
    id: null,
    title: '',
    body: '',
    author: '',
    email: '',
}

const [formData, setFormData] = useState(formDefaults)


useEffect(() => {
  fetch(`http://localhost:3000/posts`)
  .then(res => res.json())
      .then(posts => {
          console.log(posts)
          setPosts(posts)
      })
}, [])

    const formInputHandler = (event) => {
      setFormData(prevState => {
          const updatedData  = {...prevState}
          updatedData[event.target.name] = event.target.value
          return updatedData 
      });
  };

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
      .then((response) => response.json())
      .then((json) => console.log(json));
      }



  return (
    <div>
      <PageWrapper>
        <div className='button-new-post-wrapper'>

          {formIsVisible ? (

          <CreatePostForm onCreateNewPost={createNewPostHendler} onFormInput={formInputHandler} formData={formData} formSetUp={setFormIsVisible} />
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
    </div>
  )
}

export default PostsPage