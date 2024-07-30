const dbName = 'AuthDB';
const userStoreName = 'users';
const orderStoreName = 'orders';

// Open the database and create object stores if they don't exist
const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, 2); // Update version number

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      // Create users object store if it doesn't exist
      if (!db.objectStoreNames.contains(userStoreName)) {
        const userStore = db.createObjectStore(userStoreName, { keyPath: 'id', autoIncrement: true });
        userStore.createIndex('email', 'email', { unique: true });
        userStore.createIndex('phone', 'phone', { unique: true });
      }

      // Create orders object store if it doesn't exist
      if (!db.objectStoreNames.contains(orderStoreName)) {
        const orderStore = db.createObjectStore(orderStoreName, { keyPath: 'id', autoIncrement: true });
        orderStore.createIndex('userId', 'userId', { unique: false });
      }
    };

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
};

// Add or update a user in the 'users' object store
export const addUser = (user, type) => {
  return new Promise(async (resolve, reject) => {
    try {
      const db = await openDB();
      const transaction = db.transaction([userStoreName], 'readwrite');
      const store = transaction.objectStore(userStoreName);
      user.type = type;
      const request = store.put(user);

      request.onsuccess = () => resolve();
      request.onerror = (event) => reject(event.target.error);
    } catch (error) {
      reject(error);
    }
  });
};

// Get a user by email
export const getUserByEmail = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      const db = await openDB();
      const transaction = db.transaction([userStoreName], 'readonly');
      const store = transaction.objectStore(userStoreName);
      const index = store.index('email');
      const request = index.get(email);

      request.onsuccess = (event) => resolve(event.target.result);
      request.onerror = (event) => reject(event.target.error);
    } catch (error) {
      reject(error);
    }
  });
};

// Get a user by phone number
export const getUserByPhone = (phone) => {
  return new Promise(async (resolve, reject) => {
    try {
      const db = await openDB();
      const transaction = db.transaction([userStoreName], 'readonly');
      const store = transaction.objectStore(userStoreName);
      const index = store.index('phone');
      const request = index.get(phone);

      request.onsuccess = (event) => resolve(event.target.result);
      request.onerror = (event) => reject(event.target.error);
    } catch (error) {
      reject(error);
    }
  });
};

// Check if a user exists by email or phone
export const userExists = (value, type) => {
  return new Promise(async (resolve, reject) => {
    try {
      const db = await openDB();
      const transaction = db.transaction([userStoreName], 'readonly');
      const store = transaction.objectStore(userStoreName);
      const index = store.index(type);
      const request = index.get(value);

      request.onsuccess = (event) => resolve(!!event.target.result);
      request.onerror = (event) => reject(event.target.error);
    } catch (error) {
      reject(error);
    }
  });
};

// Add an order to the 'orders' object store
export const addOrder = (order) => {
  return new Promise(async (resolve, reject) => {
    try {
      const db = await openDB();
      const transaction = db.transaction([orderStoreName], 'readwrite');
      const store = transaction.objectStore(orderStoreName);
      const request = store.put(order);

      request.onsuccess = () => resolve();
      request.onerror = (event) => reject(event.target.error);
    } catch (error) {
      reject(error);
    }
  });
};
