import React, { useState } from 'react';
import Header from './components/Header';
import GroundingList from './components/GroundingList';
import MediaSection from './components/MediaSection';
import { exampleLists as initialExampleLists } from './data/exampleLists';
import './styles/global.css';

const App = () => {
  const [customLists, setCustomLists] = useState([]);
  const [showListModal, setShowListModal] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [exampleListsState, setExampleListsState] = useState(initialExampleLists);

  const handleCreateList = () => {
    setNewListName('');
    setShowListModal(true);
  };

  const handleSaveList = () => {
    if (!newListName.trim()) return; // prevent empty names

    const newList = {
      id: Date.now(),
      heading: newListName,
      items: [],
    };

    setCustomLists([...customLists, newList]);
    setShowListModal(false);
  };

  return (
    <>
      <div className="demo-banner">
         🚧 This is a demo site built for educational purposes. This demo allows you to create and delete lists, but data won't be saved after refresh.
      </div>
    <div className="app-wrapper">
      <Header />
      <div className="custom-list-button-row">
        <button className="custom-list-button" onClick={handleCreateList}>
          🧠 Create Your Own List
        </button>
      </div>
      {showListModal && (
        <>
          <div className="modal-backdrop" onClick={() => setShowListModal(false)} />
          <div className="modal">
            <h3>Name Your New List</h3>
            <input
              type="text"
              placeholder="e.g. Music Vibes, Morning Rituals"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
            />
            <button onClick={handleSaveList}>💾 Create List</button>
            <button onClick={() => setShowListModal(false)}>❌ Cancel</button>
          </div>
        </>
      )}
      <main>
        {exampleListsState.map((list) => (
          <GroundingList
            key={list.id}
            heading={list.heading}
            items={list.items}
            onDeleteList={() => {
              setExampleListsState(exampleListsState.filter((l) => l.id !== list.id));
            }}
          />
        ))}

        {customLists.map((list) => (
          <GroundingList
            key={list.id}
            heading={list.heading}
            items={list.items}
            onDeleteList={() => {
              setCustomLists(customLists.filter((l) => l.id !== list.id));
            }}
          />
        ))}
        <MediaSection />
      </main>
    </div>
    </>
  );
};

export default App;