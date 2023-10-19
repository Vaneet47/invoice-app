import React, { useEffect, useState } from 'react';
import './invoices.css';
import { useSelector, useDispatch } from 'react-redux';
import { fetchData, updateInvoice } from './InvoicesSlice';
import InvoiceForm from './InvoiceForm';

function Invoices() {
  const [newInvoice, setNewInvoice] = useState(false);

  const data = useSelector((state) => state.invoicesData.invoicesData);
  const dispatch = useDispatch();

  const getData = () => {
    dispatch(fetchData());
  };

  useEffect(() => {
    getData();
  }, []);

  const handleNewInvoice = () => {
    setNewInvoice(true);
  };

  const handleStatusChange = (id) => {
    dispatch(updateInvoice({ id, status: 'paid' }));
  };

  return (
    <div>
      <div className='header'>
        <div className='title2'>Invoices</div>
        <div className='container'>
          <button className='pref'>
            <span className='material-symbols-outlined settings'>settings</span>
            Preferences
          </button>
          <button className='pref btn' onClick={handleNewInvoice}>
            <span className='material-symbols-outlined settings'>
              add_circle
            </span>
            Create New
          </button>
          <img src='profile-pic.jpeg' />
        </div>
      </div>
      <div className='table'>
        <table>
          <tr>
            <th>Invoice Id</th>
            <th>Client name</th>
            <th>Date</th>
            <th>Total</th>
            <th>Status</th>
            <th></th>
            <th></th>
          </tr>
          {data.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.invoiceId}</td>
                <td>{item.clientName}</td>
                <td>{item.date}</td>
                <td>${item.total}</td>
                <td className='flex'>
                  <p className={`status-item ${item.status}`}>{item.status}</p>
                </td>
                <td>
                  <button
                    className={`status-item btn`}
                    onClick={() => handleStatusChange(item.id)}
                  >
                    Mark Paid
                  </button>
                </td>
                <td>
                  <button className={`status-item btn`}>Send Email</button>
                </td>
              </tr>
            );
          })}
        </table>
      </div>
      {newInvoice && <InvoiceForm setNewInvoice={setNewInvoice} />}
    </div>
  );
}

export default Invoices;
