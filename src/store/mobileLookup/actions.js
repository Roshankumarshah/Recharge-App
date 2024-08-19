import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';

export const fetchMobileNumLookup = createAsyncThunk(
    'mobileNumber/fetchLookupMobileNum',
    async ({ mobile_number, page = 1, per_page = 100 }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(`/lookup/mobile-number`, {
                mobile_number,
                page,
                per_page,
            });
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.status === 400
                ? "Mobile number entered and country selected incorrect"
                : error.response?.data?.message || error.message;

            return rejectWithValue(errorMessage);
        }
    }
);