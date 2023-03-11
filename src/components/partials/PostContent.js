import React from 'react'
import { Link } from "react-router-dom"
import './PostContent.scss'

const PostContent = ({ postId, title, body }) => {
  return (
    <div className="post-text-wrapper">
        <Link className='posts-list-item-link' to={`apipage/posts/` + postId}>
            <h2 className="post-title">{title}</h2>
            <p className="post-body">{body}</p>
        </Link>
    </div>
  )
}

export default PostContent