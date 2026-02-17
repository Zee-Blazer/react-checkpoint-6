import React from 'react';
import { Link } from 'react-router-dom';

export default function MovieCard({ movie }) {
  const { id, title, description, posterURL, rating } = movie;
  return (
    <Link to={`/movies/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <article className="movie-card">
        <img src={posterURL} alt={title} />
        <div className="movie-info">
          <h3>{title}</h3>
          <div className="rating">{'★'.repeat(rating) + '☆'.repeat(5 - rating)}</div>
          <p>{description}</p>
        </div>
      </article>
    </Link>
  );
} 
