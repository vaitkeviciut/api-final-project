import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'

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
    <>
        <div>{post.title}</div>
        <div>{user.name}</div>
        
    </>
    
  )
}
export default PostPage;
