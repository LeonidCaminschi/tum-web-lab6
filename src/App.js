import logo from './Blockbuster_logo.svg.png';
import './App.css';

function App() {
  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />
      <div className="movie-container">
      <div className="movie">
          <img src="movie1.jpg" alt="Movie 1" />
          <h2>Movie 1 Title</h2>
        </div>
        <div className="movie">
          <img src="movie2.jpg" alt="Movie 2" />
          <h2>Movie 2 Title</h2>
        </div>
      </div>
    </div>
  );
}

export default App;
