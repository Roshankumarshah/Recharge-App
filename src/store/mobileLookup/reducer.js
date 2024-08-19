import { createSlice } from '@reduxjs/toolkit';
import { fetchMobileNumLookup } from './actions';

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const mobileNumLookupSlice = createSlice({
  name: 'mobileNumLookup',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMobileNumLookup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMobileNumLookup.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchMobileNumLookup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default mobileNumLookupSlice.reducer;