import React from 'react';
import MovieCard from './MovieCard';

export default function MovieList({ movies }) {
  if (!movies.length) return <p className="no-results">No movies match your filters.</p>;

  return (
    <section className="movie-list">
      {movies.map((m, i) => (
        <MovieCard key={`${m.title}-${i}`} movie={m} />
      ))}
    </section>
  );
}
