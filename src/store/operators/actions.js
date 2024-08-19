import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';

export const fetchOperators = createAsyncThunk(
    'operators/fetchOperators',
    async (_, { rejectWithValue }) => {
        let allOperators = [];
        let page = 1;
        let hasMore = true;

        try {
            while (hasMore) {
                const response = await axiosInstance.get(`/operators?per_page=100&page=${page}`);
                allOperators = [...allOperators, ...response.data];

                if (response.data.length < 100) {
                    hasMore = false;
                } else {
                    page++;
                }
            }
            return allOperators;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);