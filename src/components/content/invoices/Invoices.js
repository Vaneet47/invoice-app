import React, {useEffect} from 'react';
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
        <div>Invoices</div>
        <div>
          Preferences
          <button>Create New</button>
          <img />
        </div>
      </div>
      <div>Table content</div>
    </div>
  );
}

export default Invoices;
