import { createSlice } from '@reduxjs/toolkit';
import { products } from '../../data/products';
import { loadState, saveState } from '../../utils/localStorage';

const initialState = loadState() || {
  products,
  rows: [],
};

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    addRow: (state) => {
      state.rows.push({ id: Date.now(), productId: '', quantity: 1, price: 0 });
      // saveState(state);
    },
    updateRow: (state, action) => {
      const { id, field, value } = action.payload;
      const row = state.rows.find((r) => r.id === id);
      if (row) {
        row[field] = value;
        if (field === 'productId') {
          const product = state.products.find((p) => p.id === value);
          row.price = product ? product.price : 0;
        }
      }
      // saveState(state);
    },
    deleteRow: (state, action) => {
      state.rows = state.rows.filter((r) => r.id !== action.payload);
      // saveState(state);
    },
    saveAll: (state) => {
      saveState(state);
    },
  },
});

export const { addRow, updateRow, deleteRow, saveAll } = tableSlice.actions;
export default tableSlice.reducer;