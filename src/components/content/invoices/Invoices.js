import React, { useEffect, useState } from 'react';
import './invoices.css';
import { useSelector, useDispatch } from 'react-redux';
import { fetchData, updateInvoice } from './InvoicesSlice';
import InvoiceForm from './InvoiceForm';

function Invoices() {
  const [newInvoice, setNewInvoice] = useState(false);

  const [verifyInvoice, setVerifyInvoice] = useState(false);
  const [invoiceId, setInvoiceId] = useState();

  const [emailTo, setEmailTo] = useState('');
  const [emailSubject, setEmailSubject] = useState('');

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

  const handleSendEmail = (id) => {
    setInvoiceId(id);
    setEmailTo(data[id].clientName.replace(' ', '') + '@xyz.com');
    setVerifyInvoice(true);
  };

  const handleEmailSend = (id) => {
    dispatch(updateInvoice({ id, status: 'sent' }));
    setVerifyInvoice(false);
  };

  const handleEmailToChange = (e) => {
    setEmailTo(e.target.value);
  };

  const handleEmailSubjectChange = (e) => {
    setEmailSubject(e.target.value);
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
                  <button
                    className={`status-item ${
                      item.status === 'paid' ? '' : 'btn'
                    }`}
                    onClick={() => handleSendEmail(item.id)}
                    disabled={item.status === 'paid'}
                  >
                    Send Email
                  </button>
                </td>
              </tr>
            );
          })}
        </table>
      </div>
      {newInvoice && <InvoiceForm setNewInvoice={setNewInvoice} />}
      {verifyInvoice && (
        <div className='invoiceForm'>
          <div className='invoiceForm'>
            <div className='invoiceForm-content'>
              <span
                className='close-button'
                onClick={() => setVerifyInvoice(false)}
              >
                &times;
              </span>
              <h2 className='dialog-title'>Email Invoice</h2>

              <div>
                <p>To</p>
                <input
                  value={emailTo}
                  className='verifyEmail'
                  onChange={handleEmailToChange}
                />
              </div>
              <div>
                <p>Subject</p>
                <input
                  className='verifyEmail'
                  value={emailSubject}
                  placeholder={`Reminder: Invoice ${data[invoiceId].invoiceId} from WebWizards Inc.`}
                  onChange={handleEmailSubjectChange}
                />
              </div>

              <h3 className='title2'>Invoice Details</h3>

              <div className='edit-container'>
                <div>
                  <div className='edit-inputs'>
                    <p>Invoice Id</p>
                    <input value={data[invoiceId].invoiceId} disabled />
                  </div>
                  <div className='edit-inputs'>
                    <p>Client Name</p>
                    <input value={data[invoiceId].clientName} disabled />
                  </div>
                  <div className='edit-inputs'>
                    <p>Service Provided</p>
                    <input value={data[invoiceId].service} disabled />
                  </div>
                  <div className='edit-inputs'>
                    <p>Rate/hour($)</p>
                    <input value={data[invoiceId].rate} disabled />
                  </div>
                  <div className='edit-inputs'>
                    <p>Hours</p>
                    <input value={data[invoiceId].hours} disabled />
                  </div>
                  <div className='edit-inputs'>
                    <p>Other Expenses($)</p>
                    <input value={data[invoiceId].otherExpenses} disabled />
                  </div>
                  <div className='edit-inputs'>
                    <p>Total</p>
                    <p>${data[invoiceId].total}</p>
                  </div>
                  <div className='edit-inputs'>
                    <p>Invoice notes</p>
                    <textarea value={data[invoiceId].notes} disabled />
                  </div>
                  <div className='edit-inputs'>
                    <p>Date</p>
                    <input value={data[invoiceId].date} disabled />
                  </div>
                </div>
              </div>
              <div className='buttons-container'>
                <button
                  className='buttons'
                  onClick={() => setVerifyInvoice(false)}
                >
                  Back
                </button>
                <button
                  className='buttons'
                  onClick={() => handleEmailSend(invoiceId)}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Invoices;
