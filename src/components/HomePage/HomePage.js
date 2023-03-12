import React, { useState, useEffect } from 'react'
import PageWrapper from '../PageWrapper/PageWrapper'
import UserShortcutWrapper from '../partials/UserShortcutWrapper';
import axios from 'axios';

import userImage from '../images/user-picture-small.jpg';


const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3000/posts?_limit=10`).then((posts) => {
      const postsData = posts.data;
      setPosts(postsData);
      console.log(postsData)
    });
  }, []);

  useEffect(() => {
    axios.get(`http://localhost:3000/users?_limit=10`).then((users) => {
      const usersData = users.data;
      setUsers(usersData);
    });
  }, []);

  useEffect(() => {
    axios.get(`http://localhost:3000/albums?_limit=10`).then((albums) => {
      const albumsData = albums.data;
      setAlbums(albumsData);
    });
  }, []);

  useEffect(() => {
    axios.get(`http://localhost:3000/comments?_limit=10`).then((comments) => {
      const commentsData = comments.data;
      setComments(commentsData);
    });
  }, []);

  return (
    <PageWrapper>
      <div>Share your moments!</div>
      <div>{posts && posts.length > 0 && posts.map((post, index) => <p key={index}>{post.title}</p>)}</div>

      <div>{users && users.length > 0 && users.map((user, index) => (
      <div key={index}>
        <UserShortcutWrapper 
        name={user.name} 
        username={user.username} 
        companyName={user.company.name} 
        image={userImage} 
        userId={user.id} 
        postId={user.postId} 
        />
      </div>
      ))}</div>
      

      <div>{albums && albums.length > 0 && albums.map((album, index) => <p key={index}>{album.title}</p>)}</div>
      <div>{comments && comments.length > 0 && comments.map((comment, index) => <p key={index}>{comment.title}</p>)}</div>
    </PageWrapper>
  )
}

export default HomePage