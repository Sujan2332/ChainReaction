import React from 'react';
import './Cell.css';

const Cell = ({ data, color, onClick }) => {
  return (
    <div
      className="cell"
      style={{ backgroundColor: color }}
      onClick={onClick}
    >
      {data.orbs > 0 && <span>{data.orbs}</span>}
    </div>
  );
};

export default Cell;
