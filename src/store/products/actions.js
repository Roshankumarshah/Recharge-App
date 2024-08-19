import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';

export const fetchProducts = createAsyncThunk(
    'product/fetchProducts',
    async (product_Id, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/products?operator_id=${product_Id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);