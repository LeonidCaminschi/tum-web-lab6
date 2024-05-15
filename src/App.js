import React, { useState, useEffect } from 'react';
import logo from './Blockbuster_logo.svg.png';
import Modal from 'react-modal';
import './App.css';
import axios from 'axios';

Modal.setAppElement('#root');

function App() {
  //axios.get('http://localhost:8000/api/hello-world/');

  const [movies, setMovies] = useState(() => {
    const localData = localStorage.getItem('movies');
    return localData ? JSON.parse(localData) : [];
  });
  const [newMovieTitle, setNewMovieTitle] = useState('');
  const [newMovieImage, setNewMovieImage] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [newMovieLink, setNewMovieLink] = useState('');
  const [theme, setTheme] = useState('light');

  const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    localStorage.setItem('movies', JSON.stringify(movies));
  }, [movies]);

  useEffect(() => {
    document.documentElement.style.setProperty('--background-color', theme === 'light' ? 'white' : 'black');
    document.documentElement.style.setProperty('--text-color', theme === 'light' ? 'black' : 'white');
  }, [theme]);

  const handleAddMovie = () => {
    const newMovie = {
      title: newMovieTitle,
      img: newMovieImage,
      link: newMovieLink,
    };
    const updatedMovies = [...movies, newMovie];
    setMovies([...movies, newMovie]);
    localStorage.setItem('movies', JSON.stringify(updatedMovies));
    setNewMovieTitle('');
    setNewMovieImage('');
    setNewMovieLink('');
    setModalIsOpen(false);
  };

  const handleUser = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', {
        username: username,
        password: password,
      });
  
      if (response.status === 200) {
        localStorage.setItem('refreshToken', response.data.refresh);
        localStorage.setItem('accessToken', response.data.access);
        setIsLoggedIn(true);
        setLoginModalIsOpen(false);
      }
    } catch (error) {
      console.error('Failed to log in', error);
    }
  };

  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />

      {!isLoggedIn && (
      <button onClick={() => setLoginModalIsOpen(true)}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          borderRadius: '5px',
          border: 'none',
          backgroundColor: theme === 'light' ? '#007BFF' : '#FFA500',
          color: 'white',
          cursor: 'pointer',
          marginTop: '20px',
          position: 'absolute',
          right: '0',
          marginRight: '170px',
        }}>Login</button>
      )}

      {isLoggedIn && (
        <div style={{
          padding: '10px 20px',
          fontSize: '16px',
          borderRadius: '5px',
          border: 'none',
          backgroundColor: theme === 'light' ? '#007BFF' : '#FFA500',
          color: 'white',
          cursor: 'initial',
          marginTop: '20px',
          position: 'absolute',
          right: '0',
          marginRight: '170px',
        }}>Welcome, {username}!</div>
      )}

      <Modal isOpen={loginModalIsOpen} onRequestClose={() => setLoginModalIsOpen(false)}
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          width: '25%',
          height: '25%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: theme === 'light' ? 'white' : 'black',
          color: theme === 'light' ? 'black' : 'white',
        },
        overlay: {
          backgroundColor: theme === 'light' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)',
        }
      }}>
        <h2>Login</h2>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}
        style={{
          padding: '10px',
          fontSize: '16px',
          borderRadius: '5px',
          border: '1px solid #ccc',
          width: '200px',
          marginRight: '20px',
          margionBottom: '50px',
          backgroundColor: theme === 'light' ? 'white' : '#FFA500',
        }} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
        style={{
          padding: '10px',
          fontSize: '16px',
          borderRadius: '5px',
          border: '1px solid #ccc',
          width: '200px',
          marginRight: '20px',
          marginTop: '20px',
          marginBottom: '10px',
          backgroundColor: theme === 'light' ? 'white' : '#FFA500',
        }} />
        <button onClick={handleUser}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            borderRadius: '5px',
            border: 'none',
            backgroundColor: theme === 'light' ? '#007BFF' : '#FFA500',
            color: 'white',
            cursor: 'pointer',
            marginTop: '10px',
          }}>Submit</button>
      </Modal>

      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      style={{
        padding: '10px 20px',
        fontSize: '16px',
        borderRadius: '5px',
        border: 'none',
        backgroundColor: theme === 'light' ? '#007BFF' : '#FFA500',
        color: 'white',
        cursor: 'pointer',
        marginTop: '20px',
        position: 'absolute',
        right: '0',
        marginRight: '20px',
      }}>
        Toggle theme
      </button>
      <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'center', margin: '20px' }}>
    <input
      type="text"
      placeholder="Search"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      style={{
        padding: '10px',
        fontSize: '16px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        width: '200px',
        marginRight: '20px',
        backgroundColor: theme === 'light' ? 'white' : '#FFA500',
      }}
    />
    <button onClick={() => setModalIsOpen(true)}
      style={{
        padding: '10px 20px',
        fontSize: '16px',
        borderRadius: '5px',
        border: 'none',
        backgroundColor: theme === 'light' ? '#007BFF' : '#FFA500',
        color: 'white',
        cursor: 'pointer',
        width: 200,
      }}>Add Movie</button>
  </div>

      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} 
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '25%',
            height: '25%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme === 'light' ? 'white' : 'black',
            color: theme === 'light' ? 'black' : 'white',
          },
          overlay: {
            backgroundColor: theme === 'light' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)',
          }
        }}>
        <input
          type="text"
          placeholder="Movie Title"
          value={newMovieTitle}
          onChange={(e) => setNewMovieTitle(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '16px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            width: '200px',
            marginRight: '20px',
            backgroundColor: theme === 'light' ? 'white' : '#FFA500',
          }}
        /> <br/>
        <input
          type="text"
          placeholder="Online Image URL"
          value={newMovieImage}
          onChange={(e) => setNewMovieImage(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '16px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            width: '200px',
            marginRight: '20px',
            backgroundColor: theme === 'light' ? 'white' : '#FFA500',
          }}
        /> <br/>
        <input
          type="text"
          placeholder="Movie Link (e.g., https://www.imdb.com/title/tt0111161/)"
          value={newMovieLink}
          onChange={(e) => setNewMovieLink(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '16px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            width: '200px',
            marginRight: '20px',
            backgroundColor: theme === 'light' ? 'white' : '#FFA500',
          }}
        /> <br/>
        <button onClick={handleAddMovie}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          borderRadius: '5px',
          border: 'none',
          backgroundColor: theme === 'light' ? '#007BFF' : '#FFA500',
          color: 'white',
          cursor: 'pointer',
          width: 200,
        }}>Submit</button>
      </Modal>

      <div className="movie-container" style={{ backgroundColor: theme === 'light' ? '#808080' : '#FFA500' }}>
        {movies.filter(movie => movie.title.toLowerCase().includes(searchTerm.toLowerCase())).map((movie, index) => (
          <div className="movie" key={index}>
            <a href={movie.link} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
            <img src={movie.img} alt={movie.title} />
            <h2>{movie.title}</h2>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;