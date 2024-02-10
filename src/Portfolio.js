import React, { useState, useEffect } from 'react';

const Portfolio=({ token, onLogout }) =>{
  const [items, setItems] = useState([]);
  const [newItemName, setNewItemName] = useState('');
  const [newItemDescription, setNewItemDescription] = useState('');

  // Fetch portfolio items on component mount or when token changes
  useEffect(() => {
    fetch('http://localhost:3001/api/portfolio/items', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(data => {
       if (Array.isArray(data)) {
           setItems(data);
       } else {
           console.error('Unexpected data structure received:', data);
       }
    })
    .catch(error => console.error("Error fetching items:", error));
  }, [token]);

  // Function to handle adding of new items
  const handleAddItem = (name, description) => {
    fetch('http://localhost:3001/api/portfolio/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ name, description })
    })
    .then(response => response.json())
    .then(data => {
      if(data.success) {
        console.log('Adding item:', name, description);

        // Update the state with the new item
        setItems(prevItems => [...prevItems, { name, description }]);
      } else {
        alert('Failed to add item.');
      }
    })
    .catch(error => console.error("Error adding item:", error));
  };

  // Function to handle removal of items
  const handleRemoveItem = (id) => {
    fetch(`http://localhost:3001/api/portfolio/remove/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(data => {
      if(data.success) {
        // Update the state by filtering out the removed item
        setItems(prevItems => prevItems.filter(item => item._id !== id));
      } else {
        alert('Failed to remove item.');
      }
    })
    .catch(error => console.error("Error removing item:", error));
  };

  return (
    <div>
      <h2>Portfolio</h2>
      <button onClick={onLogout}>Logout</button>
      
      {/* Display list of items */}
      <ul>
        {items.map(item => (
          <li key={item._id}>
            {item.name} - {item.description}
            <button onClick={() => handleRemoveItem(item._id)}>Remove</button>
          </li>
        ))}
      </ul>

      {/* Add New Item Form */}
      <div>
        <input 
          type="text" 
          placeholder="Item Name" 
          value={newItemName} 
          onChange={e => setNewItemName(e.target.value)}
        />
        <input 
          type="text" 
          placeholder="Description" 
          value={newItemDescription} 
          onChange={e => setNewItemDescription(e.target.value)}
        />
        <button onClick={() => {
          handleAddItem(newItemName, newItemDescription);
          setNewItemName('');
          setNewItemDescription('');
        }}>
          Add Item
        </button>
      </div>
    </div>
  );
}

export default Portfolio;
