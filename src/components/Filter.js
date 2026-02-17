import React from 'react';

export default function Filter({ filterTitle, setFilterTitle, filterRate, setFilterRate }) {
  return (
    <div className="filter">
      <input
        type="text"
        placeholder="Search by title..."
        value={filterTitle}
        onChange={e => setFilterTitle(e.target.value)}
      />

      <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        Min rating:
        <select value={filterRate} onChange={e => setFilterRate(Number(e.target.value))}>
          <option value={0}>All</option>
          <option value={1}>1+</option>
          <option value={2}>2+</option>
          <option value={3}>3+</option>
          <option value={4}>4+</option>
          <option value={5}>5</option>
        </select>
      </label>
    </div>
  );
}
