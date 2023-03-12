import React from 'react'
import { Link } from "react-router-dom"
// import UserShortcutWrapper from '../partials/UserShortcutWrapper';
import './PostContent.scss'

// import userImage from '../images/user-picture-small.jpg';

const PostContent = ({ postId, title, body }) => {

//   const deleteUserHandler = (postId) => {
//     fetch(`http://localhost:3000/posts/${postId}`, {
//         method: 'DELETE',
//     });
// }

  return (
    <div className="one-post-wrapper">
      <div className="post-text-wrapper">
        <div className='posts-list-item-link-wrapper'>
          <Link className='posts-list-item-link' to={`/posts/` + postId}>
              <h2 className="post-title">{title}</h2>
              <p className="post-body">{body}</p>
          </Link>
        </div>
              
        {/* <div className='user-delete-button-wrapper'>
            <button className='delete-button' onClick={() => deleteUserHandler(postId)}>x</button>
        </div> */}
      </div>
    </div>
  )
}

export default PostContent