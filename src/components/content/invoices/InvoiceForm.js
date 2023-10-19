import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchData, addNewInvoice } from './InvoicesSlice';
import './invoiceForm.css';

function InvoiceForm({ setNewInvoice }) {
  const [invoiceId, setInvoiceId] = useState('');
  const [clientName, setClientName] = useState('');
  const [service, setService] = useState('');
  const [rate, setRate] = useState('');
  const [hour, setHour] = useState('');
  const [otherExp, setOtherExp] = useState('');
  const [notes, setNotes] = useState('');
  const [date, setDate] = useState('');

  const data = useSelector((state) => state.invoicesData.invoicesData);
  const dispatch = useDispatch();

  const handleSave = () => {
    if (
      !invoiceId.trim() ||
      !rate ||
      !hour ||
      !clientName.trim() ||
      !service.trim() ||
      !date
    ) {
      console.log('Fields marked with * are mandatory');
      return;
    }
    const invoice = {
      id: data.length,
      invoiceId: invoiceId.trim(),
      rate: rate,
      hours: hour,
      total: rate * hour + otherExp,
      clientName: clientName.trim(),
      status: 'draft',
      service: service.trim(),
      otherExpenses: otherExp || 0,
      notes: notes,
      date: date,
    };
    dispatch(addNewInvoice(invoice));
    setNewInvoice(false);
  };

  return (
    <div className='invoiceForm'>
      <div className='invoiceForm'>
        <div className='invoiceForm-content'>
          <span className='close-button' onClick={() => setNewInvoice(false)}>
            &times;
          </span>
          <h2 className='dialog-title'>
            Create New Invoice{' '}
            <p className='optional'>(Fields marked with * are mandatory)</p>
          </h2>

          <div className='edit-container'>
            <div>
              <div className='edit-inputs'>
                <p>Invoice Id*</p>
                <input
                  value={invoiceId}
                  onChange={(e) => setInvoiceId(e.target.value)}
                />
              </div>
              <div className='edit-inputs'>
                <p>Client Name*</p>
                <input
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                />
              </div>
              <div className='edit-inputs'>
                <p>Service Provided*</p>
                <input
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                />
              </div>
              <div className='edit-inputs'>
                <p>Rate/hour($)*</p>
                <input
                  value={rate}
                  onChange={(e) => {
                    e.target.value = e.target.value.replace(/[^0-9]/g, '');
                    setRate(Number(e.target.value));
                  }}
                />
              </div>
              <div className='edit-inputs'>
                <p>Hours*</p>
                <input
                  value={hour}
                  onChange={(e) => {
                    e.target.value = e.target.value.replace(/[^0-9]/g, '');
                    setHour(Number(e.target.value));
                  }}
                />
              </div>
              <div className='edit-inputs'>
                <p>Other Expenses($)</p>
                <input
                  value={otherExp}
                  onChange={(e) => {
                    e.target.value = e.target.value.replace(/[^0-9]/g, '');
                    setOtherExp(Number(e.target.value));
                  }}
                />
              </div>
              <div className='edit-inputs'>
                <p>Total</p>
                <p>${rate * hour + otherExp}</p>
              </div>
              <div className='edit-inputs'>
                <p>Invoice notes</p>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value.trim())}
                />
              </div>
              <div className='edit-inputs'>
                <p>Date*</p>
                <input
                  type='date'
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className='buttons-container'>
            <button className='buttons' onClick={() => setNewInvoice(false)}>
              Back
            </button>
            <button className='buttons' onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvoiceForm;
