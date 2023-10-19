import { configureStore } from '@reduxjs/toolkit';
import invoicesDataReducer from '../components/content/invoices/InvoicesSlice';

const store = configureStore({
  reducer: {
    invoicesData: invoicesDataReducer,
  },
});

export default store;
