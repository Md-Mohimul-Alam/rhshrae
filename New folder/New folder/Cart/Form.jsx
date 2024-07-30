import React, { useState } from 'react';
import { getUserByEmail, getUserByPhone, addUser } from '../indexedDB'; // Adjust the import path as necessary

const DataForm = () => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [userId, setUserId] = useState('');
  const [field1, setField1] = useState('');
  const [field2, setField2] = useState('');
  const [field3, setField3] = useState('');
  const [field4, setField4] = useState('');
  const [field5, setField5] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      let user;
      if (emailOrPhone.includes('@')) {
        user = await getUserByEmail(emailOrPhone);
      } else {
        user = await getUserByPhone(emailOrPhone);
      }

      if (user) {
        setUserId(user.id);
        setField1(user.field1 || '');
        setField2(user.field2 || '');
        setField3(user.field3 || '');
        setField4(user.field4 || '');
        setField5(user.field5 || '');
      } else {
        alert('User not found');
        setUserId('');
        setField1('');
        setField2('');
        setField3('');
        setField4('');
        setField5('');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      alert('Error fetching user data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure userId is valid before updating
    if (!userId) {
      alert('No user selected. Please search for a user first.');
      return;
    }

    const order = {
      userId,
      field1,
      field2,
      field3,
      field4,
      field5,
    };

    try {
      // Open IndexedDB and save data to the 'order' table
      const request = indexedDB.open('AuthDB', 2);

      request.onsuccess = () => {
        const db = request.result;
        const transaction = db.transaction('order', 'readwrite');
        const store = transaction.objectStore('order');
        store.add(order);

        transaction.oncomplete = () => {
          alert('Order data saved successfully');
        };

        transaction.onerror = (error) => {
          console.error('Error saving order data:', error);
          alert('Error saving order data');
        };
      };

      request.onerror = (error) => {
        console.error('Error opening database:', error);
        alert('Error opening database');
      };
    } catch (error) {
      console.error('Error saving order data:', error);
      alert('Error saving order data');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>User ID:</label>
          <input style={{color:'black'}}
            type="text"
            value={userId}
            readOnly
          />
        </div>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={field1}
            onChange={(e) => setField1(e.target.value)}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="text"
            value={field2}
            onChange={(e) => setField2(e.target.value)}
          />
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            value={field3}
            onChange={(e) => setField3(e.target.value)}
          />
        </div>
        <div>
          <label>Address (area):</label>
          <input
            type="text"
            value={field4}
            onChange={(e) => setField4(e.target.value)}
          />
        </div>
        <div>
          <label>House/Road/Block:</label>
          <input
            type="text"
            value={field5}
            onChange={(e) => setField5(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default DataForm;
