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
  <main 
      style={{
        backgroundImage: 'url("https://images.pexels.com/photos/8442431/pexels-photo-8442431.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
      }}
      className='flex flex-col items-center justify-between min-h-screen p-4 sm:p-24'>
    <div className='z-10 items-center justify-between w-full max-w-5xl font-mono text-sm '>
    <h1 className="p-4 text-5xl text-center text-white transition duration-300 transform rounded-lg shadow-lg bg-gradient-to-r from-blue-500 to-purple-600 ">
      Expense Tracker
    </h1>
    <br/>
    <div className='p-6 rounded-lg shadow-lg bg-slate-800'>
  <form className='grid items-center grid-cols-6 gap-4 text-black'>
    <input
      value={newItem.name}
      onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
      className='col-span-3 p-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
      type='text'
      placeholder='Enter Item'
    />
    <input
      value={newItem.price}
      onChange={(e) =>
        setNewItem({ ...newItem, price: e.target.value })
      }
      className='col-span-2 p-4 mx-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
      type='number'
      placeholder='Enter $'
    />
    <button
      onClick={addItem}
      className='p-4 text-xl text-white transition duration-200 bg-blue-600 rounded hover:bg-blue-700'
      type='submit'
    >
      +
    </button>
  </form>
  
  <ul className='mt-6'>
    {items.map((item) => (
      <li
        key={item.id}
        className='flex justify-between w-full my-4 text-white transition duration-200 rounded-lg bg-slate-950 hover:bg-slate-700'
      >
        <div className='flex justify-between w-full p-4 text-xl'>
          <span className='capitalize'>{item.name}</span>
          <span>${item.price}</span>
        </div>
        <button
          onClick={() => deleteItem(item.id)}
          className='w-16 p-4 ml-8 text-xl text-white transition duration-200 border-l-2 rounded-lg border-slate-900 hover:bg-red-600'
        >
          X
        </button>
      </li>
    ))}
  </ul>

  {items.length > 0 && (
    <div className='flex justify-between p-3 mt-4 text-xl text-white'>
      <span>Total</span>
      <span>${total}</span>
    </div>
  )}
</div>
    </div>
  </main>
);
}