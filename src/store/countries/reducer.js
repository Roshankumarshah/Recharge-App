import { createSlice } from '@reduxjs/toolkit';
import { fetchCountries } from './actions';

const initialState = {
  loading: false,
  countries: [],
  error: '',
};

const countrySlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.loading = false;
        state.countries = action.payload;
        state.error = '';
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.loading = false;
        state.countries = [];
        state.error = action.payload;
      });
  },
});

export default countrySlice.reducer;