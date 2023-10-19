import React from 'react';
import './sidebar.css';

function Sidebar() {
  return (
    <div className='sidebar'>
      <div className='title'>Heading</div>
      <div>
        <div className='item'>
          <span class='material-symbols-outlined'>dashboard</span>Dashboard
        </div>
        <div className='item'>
          <span class='material-symbols-outlined'>paid</span>Transactions
        </div>
        <div className='item active'>
          <span class='material-symbols-outlined'>receipt</span>Invoices
        </div>
        <div className='item'>
          <span class='material-symbols-outlined'>contract</span>Expenses
        </div>
        <div className='item'>
          <span class='material-symbols-outlined'>account_balance</span>Banking
        </div>
        <div className='item'>
          <span class='material-symbols-outlined'>credit_card</span>Cards
        </div>
        <div className='item'>
          <span class='material-symbols-outlined'>settings</span>Settings
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
