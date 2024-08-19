import React from 'react';
import { CircularProgress } from '@mui/material';

export const CircularFullLoading = () => {
    return (
        <div className='full-loading'>
            <CircularProgress />
        </div>
    );
};

export const CircularInnerLoading = () => {
    return (
        <div className='Inner-loading'>
            <CircularProgress />
        </div>
    );
};

export const Loader = () => {
    return (
        <div className='loader'>
            <CircularProgress />
        </div>
    );
};