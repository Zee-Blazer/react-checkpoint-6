import React, { useState, useEffect } from 'react';
import MovieList from './components/MovieList';
import Filter from './components/Filter';
import AddMovie from './components/AddMovie';
import './index.css';

const sampleMovies = [
  { title: 'The Matrix', description: 'A hacker discovers the world is a simulation.', posterURL: 'https://via.placeholder.com/400x600?text=The+Matrix', rating: 5 },
  { title: 'Inception', description: "A thief who steals corporate secrets through dream-sharing technology.", posterURL: 'https://via.placeholder.com/400x600?text=Inception', rating: 4 },
  { title: 'Stranger Things', description: 'Kids uncover supernatural mysteries in their town.', posterURL: 'https://via.placeholder.com/400x600?text=Stranger+Things', rating: 4 }
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

  return (
    <div className="app">
      <header>
        <h1>Movie app — React hooks checkpoint</h1>
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
}
