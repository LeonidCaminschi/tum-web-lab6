import React, { useState } from 'react';
import logo from './Blockbuster_logo.svg.png';
import Modal from 'react-modal';
import './App.css';

Modal.setAppElement('#root'); // This line is needed for accessibility reasons

function App() {
  const [movies, setMovies] = useState([
    { title: 'Hitman', img: 'hitman.jpg', link: 'https://www.imdb.com/title/tt0465494/'},
    { title: 'Avatar', img: 'avatar.jpg', link: 'https://www.imdb.com/title/tt0465494/'},
  ]);
  const [newMovieTitle, setNewMovieTitle] = useState('');
  const [newMovieImage, setNewMovieImage] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleAddMovie = () => {
    const newMovie = {
      title: newMovieTitle,
      img: newMovieImage,
    };
    setMovies([...movies, newMovie]);
    setNewMovieTitle('');
    setNewMovieImage('');
    setModalIsOpen(false);
  };

  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />
      <button onClick={() => setModalIsOpen(true)}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          borderRadius: '5px',
          border: 'none',
          backgroundColor: '#007BFF',
          color: 'white',
          cursor: 'pointer',
          width: 200,
          marginTop: '20px',
          marginLeft: '20px',
        }}>Add Movie</button>

      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} 
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '25%', // adjust this value to change the size of the modal
            height: '25%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          },
        }}>
        <input
          type="text"
          placeholder="Movie Title"
          value={newMovieTitle}
          onChange={(e) => setNewMovieTitle(e.target.value)}
        /> <br/>
        <input
          type="text"
          placeholder="Image Path (e.g., avatar.jpg)"
          value={newMovieImage}
          onChange={(e) => setNewMovieImage(e.target.value)}
        /> <br/>
        <button onClick={handleAddMovie}>Submit</button>
      </Modal>

      <div className="movie-container">
        {movies.map((movie, index) => (
          <div className="movie" key={index}>
            <img src={require(`./images/${movie.img}`)} alt={movie.title} />
            <h2>{movie.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;