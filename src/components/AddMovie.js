import React, { useState } from 'react';

export default function AddMovie({ onAdd }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [posterURL, setPosterURL] = useState('');
  const [rating, setRating] = useState(4);
  const [trailerLink, setTrailerLink] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return alert('Please enter a title.');

    const movie = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      posterURL: posterURL.trim() || 'https://via.placeholder.com/400x600?text=No+Image',
      rating: Number(rating) || 0,
      trailerLink: trailerLink.trim()
    };

    onAdd(movie);
    setTitle('');
    setDescription('');
    setPosterURL('');
    setRating(4);
    setTrailerLink('');
  }

  return (
    <form className="add-movie" onSubmit={handleSubmit}>
      <h3>Add movie</h3>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title*" required />
      <input value={posterURL} onChange={e => setPosterURL(e.target.value)} placeholder="Poster URL (optional)" />
      <input value={trailerLink} onChange={e => setTrailerLink(e.target.value)} placeholder="Trailer link (YouTube)" />
      <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Short description" rows={3} />
      <label style={{ display: 'block', marginTop: 6 }}>
        Rating:
        <select value={rating} onChange={e => setRating(Number(e.target.value))}>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </label>
      <div style={{ marginTop: 8 }}>
        <button type="submit">Add movie</button>
      </div>
    </form>
  );
} 
