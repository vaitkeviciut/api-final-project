import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import PageWrapper from '../PageWrapper/PageWrapper'
import UserShortcutWrapper from '../partials/UserShortcutWrapper';
import PostContent from '../partials/PostContent';
import AlbumTitle from '../partials/AlbumTitle';
import MovieContent from '../partials/MovieContent';
import axios from 'axios';
import './HomePage.scss';

import userImage from '../images/user-picture-small.jpg';


const HomePage = () => {
  const { userId } = useParams()
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [movies, setMovies] = useState([]);

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
    axios.get(`http://localhost:3000/movies?_limit=10`).then((movies) => {
      const moviesData = movies.data;
      setMovies(moviesData);
    });
  }, []);

  return (
    <PageWrapper>
      <div className='all-sections-wrapper'>


          <div className='all-posts-wrapper'>
            <div className='section-title-wrapper'>
              <Link to={`/posts`}>
                <h2 className='section-title'>Posts</h2>
              </Link>
            </div>
            <div className='one-post-all-wrapper'>{posts && posts.length > 0 && posts.map((post, index) => (
              <div className='post-item' key={index}>
                <PostContent 
                    title={post.title}
                    body={post.body}
                    postId={post.id}
                    name={post.name} 
                    username={post.username} 
                    company={post.company}
                    image={userImage}
                    userLink={userId}
                    date={post.date}
                    time={post.time}
                    userId={post.userId}
                  />
              </div>
            ))}
            </div>
          </div>

          <div className='all-users-wrapper'>
            <div className='section-title-wrapper'>
              <Link to={`/users`}>
                <h2 className='section-title'>Users</h2>
              </Link>
            </div>
            <div className='one-users-all-wrapper'>{users && users.length > 0 && users.map((user, index) => (
                <div className='user-item' key={index}>
                  <UserShortcutWrapper 
                    name={user.name} 
                    username={user.username} 
                    companyName={user.company.name} 
                    image={userImage} 
                    userId={user.id} 
                    postId={user.postId} 
                  />
                </div>
              ))}
            </div>
          </div>

          <div className='all-albums-wrapper'>
            <div className='section-title-wrapper'>
              <Link to={`/albums`}>
                <h2 className='section-title'>Albums</h2>
              </Link>
            </div>
            <div className='one-album-all-wrapper'>{albums && albums.length > 0 && albums.map((album, index) => (
              <div className='post-item' key={index}>
                  <AlbumTitle 
                    title={album.title}
                    name={album.name}
                    username={album.username}
                    email={album.email}
                    date={album.date}
                    time={album.time}
                  />
              </div>
            ))}
            </div>
          </div>

          <div className='all-comments-wrapper'>
            <div className='section-title-wrapper'>
              <Link to={`/movies`}>
                <h2 className='section-title'>Movies</h2>
              </Link>
            </div>
            <div className='one-album-all-wrapper'>{movies && movies.length > 0 && movies.map((movie, index) => (
              <div className='post-item' key={index}>
                  <MovieContent 
                    title={movie.title}
                    description={movie.description}
                    author={movie.author}
                    year={movie.year}
                    userId={movie.userId}
                  />
              </div>
            ))}
            </div>
          </div>
      </div>
      
    </PageWrapper>
  )
}

export default HomePage