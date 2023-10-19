import React, { useEffect } from 'react';
import './invoices.css';
import { useSelector, useDispatch } from 'react-redux';
import { fetchData, updateData } from './InvoicesSlice';

function Invoices() {
  const data = useSelector((state) => state.invoicesData.invoicesData);
  const dispatch = useDispatch();

  const getData = () => {
    dispatch(fetchData());
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className='header'>
        <div className='title2'>Invoices</div>
        <div className='container'>
          <button className='pref'>
            <span class='material-symbols-outlined settings'>settings</span>
            Preferences
          </button>
          <button className='pref btn'>
            <span class='material-symbols-outlined settings'>add_circle</span>Create New
          </button>
          <img src='profile-pic.jpeg' />
        </div>
      </div>
      <div>Table content</div>
    </div>
  );
}

export default Invoices;
