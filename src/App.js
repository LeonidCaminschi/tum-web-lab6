import logo from './Blockbuster_logo.svg.png';
import './App.css';

function App() {
  const movies = [
    { title: 'Hitman', img: 'hitman.jpg' },
    { title: 'Avatar', img: 'avatar.jpg' },
    // add more movies here
  ];

  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />
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