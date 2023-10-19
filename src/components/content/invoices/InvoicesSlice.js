import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  invoicesData: [],
  error: '',
};

export const fetchData = createAsyncThunk('fetchInvoicesData', async () => {
  return fetch('data.json')
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
});

export const invoicesDataSlice = createSlice({
  name: 'invoicesData',
  initialState,
  reducers: {
    updateInvoice: (state, action) => {
      const id = action.payload['id'];
      state.invoicesData[id].status = action.payload['status'];
    },
    addNewInvoice: (state, action) => {
      state.invoicesData.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.loading = false;
      state.invoicesData = action.payload;
      state.error = '';
    });
    builder.addCase(fetchData.rejected, (state, action) => {
      state.loading = false;
      state.invoicesData = [];
      state.error = action.error.message;
    });
  },
});

export const { updateInvoice, addNewInvoice } = invoicesDataSlice.actions;

export default invoicesDataSlice.reducer;
