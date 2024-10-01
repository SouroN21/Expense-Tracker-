'use client';
import React, { useState, useEffect } from 'react';
import {
  collection,
  addDoc,
  getDoc,
  querySnapshot,
  query,
  onSnapshot,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { db } from './firebase';

export default function Home() {
  const [items, setItems] = useState([
    /*{ name: 'Coffee', price: 4.48 },
    { name: 'Movie', price: 41.48 },
    { name: 'Candy', price: 54.48 },*/
  ]);
  const [newItem, setNewItem] = useState({ name: '', price: '' });
  const [total, setTotal] = useState(0);

 // Add item to database
 const addItem = async (e) => {
  e.preventDefault();
  if (newItem.name !== '' && newItem.price !== '') {
    // setItems([...items, newItem]);
    await addDoc(collection(db, 'items'), {
      name: newItem.name.trim(),
      price: newItem.price,
    });
    setNewItem({ name: '', price: '' });
  }
};

// Read items from database
useEffect(() => {
  const q = query(collection(db, 'items'));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    let itemsArr = [];

    querySnapshot.forEach((doc) => {
      itemsArr.push({ ...doc.data(), id: doc.id });
    });
    setItems(itemsArr);

// Read total from itemsArr
      const calculateTotal = () => {
        const totalPrice = itemsArr.reduce(
          (sum, item) => sum + parseFloat(item.price),
          0
        );
        setTotal(totalPrice);
      };
      calculateTotal();
      return () => unsubscribe();
    });
  }, []);

// Delete items from database
const deleteItem = async (id) => {
  await deleteDoc(doc(db, 'items', id));
};

return (
  <main className='flex flex-col items-center justify-between min-h-screen p-4 sm:p-24'>
    <div className='z-10 items-center justify-between w-full max-w-5xl font-mono text-sm '>
      <h1 className='p-4 text-4xl text-center'>Expense Tracker</h1>
      <div className='p-4 rounded-lg bg-slate-800'>
        <form className='grid items-center grid-cols-6 text-black'>
          <input
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            className='col-span-3 p-3 border'
            type='text'
            placeholder='Enter Item'
          />
          <input
            value={newItem.price}
            onChange={(e) =>
              setNewItem({ ...newItem, price: e.target.value })
            }
            className='col-span-2 p-3 mx-3 border'
            type='number'
            placeholder='Enter $'
          />
          <button
            onClick={addItem}
            className='p-3 text-xl text-white bg-slate-950 hover:bg-slate-900'
            type='submit'
          >
            +
          </button>
        </form>
        <ul>
          {items.map((item, id) => (
            <li
              key={id}
              className='flex justify-between w-full my-4 text-white bg-slate-950'
            >
              <div className='flex justify-between w-full p-4 '>
                <span className='capitalize'>{item.name}</span>
                <span>${item.price}</span>
              </div>
              <button
                onClick={() => deleteItem(item.id)}
                className='w-16 p-4 ml-8 text-white border-l-2 border-slate-900 hover:bg-slate-900'
              >
                X
              </button>
            </li>
          ))}
        </ul>
        {items.length < 1 ? (
          ''
        ) : (
          <div className='flex justify-between p-3 text-white'>
            <span>Total</span>
            <span>${total}</span>
          </div>
        )}
      </div>
    </div>
  </main>
);
}