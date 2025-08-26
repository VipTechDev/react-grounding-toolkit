import React, { useState, useEffect } from 'react';
import ListItem from './ListItem';
import '../styles/list.css';

const GroundingList = ({ heading, items, onDeleteList }) => {
    const [listItems, setListItems] = useState(items);
    const [showModal, setShowModal] = useState(false);

    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);


    const [editIndex, setEditIndex] = useState(null);
    const [editText, setEditText] = useState('');
    const [editDescription, setEditDescription] = useState('');

    useEffect(() => {
        console.log("Mounted:", heading);
        return () => {
            console.log("Unmounted:", heading);
        };
    }, []);

    const handleEditClick = (index) => {
        const item = listItems[index];
        setEditIndex(index);
        setEditText(item.text);
        setEditDescription(item.description);
        setShowModal(true); // Reuse your modal for editing
    };

    const handleDelete = (index) => {
        const updated = listItems.filter((_, i) => i !== index);
        setListItems(updated);
    };

    const handleAddClick = () => {
        setEditIndex(null)
        setEditText('')
        setEditDescription('')
        setShowModal(true);
    };

    const handleDeleteListClick = () => {
        setShowDeleteConfirm(true);
    };

    const confirmDeleteList = () => {
        if (onDeleteList) {
            onDeleteList(); // parent handles actual removal
        }
        setShowDeleteConfirm(false);
    };

    const handleSave = () => {
        if (editIndex !== null) {
            // Editing existing item
            const updatedItems = [...listItems];
            updatedItems[editIndex] = {
                text: editText,
                description: editDescription,
            };
            setListItems(updatedItems);
        } else {
            // Adding new item
            const newItem = {
                text: editText,
                description: editDescription,
            };
            setListItems([...listItems, newItem]);
        }

        // Reset modal state
        setEditIndex(null);
        setEditText('');
        setEditDescription('');
        setShowModal(false);
    };


    return (
        <section className="list-container">
            <div className="list-heading-row">
                <h2 className="list-heading">{heading}</h2>
                <div className='spacer' />
                <div className="list-actions">
                    <button className="add-button" onClick={handleAddClick}>
                        ➕ Add to List
                    </button>
                    <button className="delete-list-button" onClick={handleDeleteListClick}>
                        ❌ Delete List
                    </button>
                </div>
            </div>

            {
                listItems.map((item, index) => (
                    <ListItem
                        key={index}
                        text={item.text}
                        description={item.description}
                        onDelete={() => handleDelete(index)}
                        onEdit={() => handleEditClick(index)}
                    />
                ))
            }

            {/* Modal logic goes here */}
            {
                showModal && (
                    <>
                        <div className="modal-backdrop" onClick={() => setShowModal(false)} />
                        <div className="modal">
                            <h3>{editIndex !== null ? 'Edit Item' : 'Add New Item'}</h3>
                            <input
                                type="text"
                                placeholder="Technique title"
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                            />
                            <textarea
                                placeholder="Optional description"
                                value={editDescription}
                                onChange={(e) => setEditDescription(e.target.value)}
                            />
                            <button onClick={handleSave}>💾 Save</button>
                            <button onClick={() => setShowModal(false)}>❌ Cancel</button>
                        </div>
                    </>
                )




            }
            {showDeleteConfirm && (
                <>
                    <div className="modal-backdrop" onClick={() => setShowDeleteConfirm(false)} />
                    <div className="modal">
                        <h3>Are you sure you want to delete this list?</h3>
                        <p>This action cannot be undone.</p>
                        <button onClick={confirmDeleteList}>✅ Yes, Delete</button>
                        <button onClick={() => setShowDeleteConfirm(false)}>❌ Cancel</button>
                    </div>
                </>
            )}

        </section >
    );
};

export default GroundingList;