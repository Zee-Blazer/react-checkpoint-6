import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import MovieList from './components/MovieList';
import Filter from './components/Filter';
import AddMovie from './components/AddMovie';
import MovieDetails from './components/MovieDetails';
import './index.css';

const sampleMovies = [
  { id: 1, title: 'The Matrix', description: 'A hacker discovers the world is a simulation.', posterURL: 'https://via.placeholder.com/400x600?text=The+Matrix', rating: 5, trailerLink: 'https://www.youtube.com/embed/vKQi3bBA1y8' },
  { id: 2, title: 'Inception', description: "A thief who steals corporate secrets through dream-sharing technology.", posterURL: 'https://via.placeholder.com/400x600?text=Inception', rating: 4, trailerLink: 'https://www.youtube.com/embed/YoHD9XEInc0' },
  { id: 3, title: 'Stranger Things', description: 'Kids uncover supernatural mysteries in their town.', posterURL: 'https://via.placeholder.com/400x600?text=Stranger+Things', rating: 4, trailerLink: 'https://www.youtube.com/embed/b9EkMc79ZSU' }
];

export default function App() {
  const STORAGE_KEY = 'movieApp.movies';

  const [movies, setMovies] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : sampleMovies;
    } catch (e) {
      return sampleMovies;
    }
  });

  const [filterTitle, setFilterTitle] = useState('');
  const [filterRate, setFilterRate] = useState(0);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(movies));
    } catch (e) {
      /* ignore storage errors */
    }
  }, [movies]);

  function addMovie(movie) {
    setMovies(prev => [movie, ...prev]);
  }

  const filtered = movies.filter(m =>
    m.title.toLowerCase().includes(filterTitle.toLowerCase()) && m.rating >= filterRate
  );

  const Home = (
    <div className="app">
      <header>
        <h1>Movie app — React Router demo</h1>
      </header>

      <div className="controls">
        <Filter
          filterTitle={filterTitle}
          setFilterTitle={setFilterTitle}
          filterRate={filterRate}
          setFilterRate={setFilterRate}
        />

        <AddMovie onAdd={addMovie} />
      </div>

      <MovieList movies={filtered} />
    </div>
  );

  return (
    <Routes>
      <Route path="/" element={Home} />
      <Route path="/movies/:id" element={<MovieDetails movies={movies} />} />
    </Routes>
  );
}
