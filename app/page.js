'use client';
import React ,{useState, useEffect} from 'react';

export default function Home() {
  const[items,setItems] = useState([
    {name:'Coffee' , price:4.48},
    {name:'Movie' , price:41.48},
    {name:'Candy' , price:54.48},
  ]) ;

  const [total,setTotal] = useState(0)


  return (
    <div >
      <main className="flex min-h-screen flex-col items-center justify-between sm:p-24 p-4">
        <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
            <h1 className="text-4xl p-4 text-center">Expense Tracker</h1>
            <div className="bg-slate-800 p-4 rounded-lg">
              <form className="grid grid-cols-6 items-center text-black">
                <input 
                    className="col-span-3 p-3 border"
                    type="text" 
                    placeholder="Enter Item"/>
                <input 
                    className="col-span-2 p-3 border mx-3"
                    type="text" 
                    placeholder="Enter $"/>
                <button 
                    className="text-white bg-slate-950 hover:bg-slate-900 p-3 text-xl" 
                    type="submit"
                >
                  +
                </button>
              </form>

              <ul>
                {items.map((item,id)=>{
                  <li key={id} className=''>
                    <div>
                      <span>{item.name}</span>
                      <span>{item.price}</span>
                    </div>
                  </li>
                })}
              </ul>
            </div>
        </div>
      

      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
      
      </footer>
    </div>
  );
}
