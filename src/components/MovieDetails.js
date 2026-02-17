import React from 'react';
import { useParams, Link } from 'react-router-dom';

function toEmbedUrl(url) {
  if (!url) return null;
  try {
    if (url.includes('youtube.com/watch')) {
      const u = new URL(url);
      const id = u.searchParams.get('v');
      return id ? `https://www.youtube.com/embed/${id}` : url;
    }
    if (url.includes('youtu.be/')) {
      const id = url.split('youtu.be/')[1].split(/[?&]/)[0];
      return `https://www.youtube.com/embed/${id}`;
    }
    return url; // assume already embed or direct src
  } catch (e) {
    return url;
  }
}

export default function MovieDetails({ movies }) {
  const { id } = useParams();
  const movie = movies.find(m => String(m.id) === String(id));

  if (!movie) {
    return (
      <div style={{ padding: 20 }}>
        <p>Movie not found.</p>
        <Link to="/">Back to home</Link>
      </div>
    );
  }

  const embed = toEmbedUrl(movie.trailerLink);

  return (
    <div style={{ maxWidth: 900, margin: '28px auto', padding: 20 }}>
      <Link to="/">← Back</Link>
      <h2 style={{ marginTop: 12 }}>{movie.title}</h2>
      <div style={{ display: 'flex', gap: 20, marginTop: 16 }}>
        <img src={movie.posterURL} alt={movie.title} style={{ width: 260, borderRadius: 8 }} />
        <div style={{ flex: 1 }}>
          <p style={{ marginTop: 0 }}>{movie.description}</p>
          <p className="rating">{'★'.repeat(movie.rating) + '☆'.repeat(5 - movie.rating)}</p>
          {embed ? (
            <div style={{ marginTop: 12 }}>
              <div style={{ position: 'relative', paddingTop: '56.25%' }}>
                <iframe
                  title={`${movie.title} trailer`}
                  src={embed}
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          ) : (
            <p style={{ color: '#666' }}>No trailer link provided.</p>
          )}
        </div>
      </div>
    </div>
  );
}
