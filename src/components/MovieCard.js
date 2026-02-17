import React from 'react';

export default function MovieCard({ movie }) {
  const { title, description, posterURL, rating } = movie;
  return (
    <article className="movie-card">
      <img src={posterURL} alt={title} />
      <div className="movie-info">
        <h3>{title}</h3>
        <div className="rating">{'★'.repeat(rating) + '☆'.repeat(5 - rating)}</div>
        <p>{description}</p>
      </div>
    </article>
  );
}
