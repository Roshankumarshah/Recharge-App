import { createSlice } from '@reduxjs/toolkit';
import { fetchOperators } from './actions';

const initialState = {
  loading: false,
  operators: [],
  error: '',
};

const operatorSlice = createSlice({
  name: 'operators',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOperators.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchOperators.fulfilled, (state, action) => {
        state.loading = false;
        state.operators = action.payload;
        state.error = '';
      })
      .addCase(fetchOperators.rejected, (state, action) => {
        state.loading = false;
        state.operators = [];
        state.error = action.payload;
      });
  },
});

export default operatorSlice.reducer;