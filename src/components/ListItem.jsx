import React from 'react';
import '../styles/list.css'; // Make sure your styles are modular

const ListItem = ({ text, description, onDelete, onEdit }) => (
  <div className="list-item">
    <div className="item-content">
      <strong className="item-title">{text}</strong>
      <p className="item-description">{description}</p>
    </div>
    <div className="item-footer">
      <button className="action-button edit-button" onClick={onEdit}>
        ✏️ Edit
      </button>
      <button className="action-button delete-button" onClick={onDelete}>
        ❌ Delete
      </button>
    </div>
  </div>
);

export default ListItem;