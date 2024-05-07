const databaseName = "SaintsDatabase";
const databaseVersion = 2;
export const stores = { saints: "saints", words: "words", homilies: "homilies" };

function ensureObjectStoreExists(db: IDBDatabase, storeName: string, options: IDBObjectStoreParameters) {
  if (!db.objectStoreNames.contains(storeName)) {
    db.createObjectStore(storeName, options);
  }
}

export async function openDatabase(): Promise<IDBDatabase> {
  const request: IDBOpenDBRequest = indexedDB.open(databaseName, databaseVersion);

  return new Promise((resolve, reject) => {
    request.onerror = () => {
      reject("Failed to open the database");
    };

    request.onsuccess = (event: Event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      db.onversionchange = () => {
        db.close();
      };
      resolve(db);
    };

    request.onupgradeneeded = (event: Event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      ensureObjectStoreExists(db, stores.saints, { keyPath: "id" });
      ensureObjectStoreExists(db, stores.words, { keyPath: "date" });
      ensureObjectStoreExists(db, stores.homilies, { keyPath: "date" });
    };
  });
}

export async function storeSingleItemIndexDB<T>(db: IDBDatabase, storeName: string, item: T) {
  const transaction = db.transaction(storeName, "readwrite");
  const objectStore = transaction.objectStore(storeName);

  try {
    return objectStore.put(item);
  } catch (error) {
    console.error(`Error storing ${storeName} in IndexedDB:`, error);
    return 0;
  }
}

export async function storeItemsIndexDB<T>(db: IDBDatabase, storeName: string, items: T[]) {
  const transaction = db.transaction(storeName, "readwrite");
  const objectStore = transaction.objectStore(storeName);

  try {
    items.forEach((item) => {
      objectStore.put(item);
    });

    return items.length;
  } catch (error) {
    console.error(`Error storing ${storeName} in IndexedDB:`, error);
    return 0;
  }
}

export async function countItemsIndexDB(db: IDBDatabase, storeName: string) {
  const transaction = db.transaction(storeName, "readonly");
  const objectStore = transaction.objectStore(storeName);

  const countRequest = objectStore.count();

  return new Promise<number>((resolve, reject) => {
    countRequest.onsuccess = (event) => {
      const target = event.target as IDBRequest;
      if (target) {
        resolve(target.result as number);
      } else {
        reject("Error: event.target is null");
      }
    };

    countRequest.onerror = (event) => {
      const target = event.target as IDBRequest;
      console.error(`Error counting items in IndexedDB:`, target.error);
      reject(target.error);
    };
  });
}

export async function getItemsByKeyIndexDB<T>(db: IDBDatabase, storeName: string, keys: string[]): Promise<T[]> {
  const transaction = db.transaction(storeName, "readonly");
  const objectStore = transaction.objectStore(storeName);

  const requests = keys.map((key) => {
    return new Promise<T>((resolve, reject) => {
      const request: IDBRequest<IDBObjectStore> = objectStore.get(key);

      request.onsuccess = (event) => {
        const target = event.target as IDBRequest;
        if (target) {
          resolve(target.result as T);
        }
      };

      request.onerror = (event) => {
        const target = event.target as IDBRequest;
        console.error(`Error retrieving object with key ${key}:`, target.error);
        reject(target.error);
      };
    });
  });

  try {
    const items = await Promise.all(requests);
    return items;
  } catch (error) {
    console.error("Error retrieving saints from IndexedDB:", error);
    throw error;
  }
}

export async function getSingleItemIndexDB<T>(db: IDBDatabase, storeName: string, key: string): Promise<T> {
  const transaction = db.transaction(storeName, "readonly");
  const objectStore = transaction.objectStore(storeName);

  return new Promise<T>((resolve, reject) => {
    const request: IDBRequest<IDBObjectStore> = objectStore.get(key);

    request.onsuccess = (event) => {
      const target = event.target as IDBRequest;
      if (target) {
        resolve(target.result as T);
      }
    };

    request.onerror = (event) => {
      const target = event.target as IDBRequest;
      console.error(`Error retrieving object with key ${key}:`, target.error);
      reject(target.error);
    };
  });
}
