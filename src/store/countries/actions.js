import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';

export const fetchCountries = createAsyncThunk(
    'countries/fetchCountries',
    async (_, { rejectWithValue }) => {
        try {
            const responsePage1 = await axiosInstance.get(`/countries?per_page=100&page=1`);
            const page1Data = responsePage1.data;

            const responsePage2 = await axiosInstance.get(`/countries?per_page=100&page=2`);
            const page2Data = responsePage2.data;

            // Combine both page data
            const combinedData = [...page1Data, ...page2Data];

            return combinedData;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);