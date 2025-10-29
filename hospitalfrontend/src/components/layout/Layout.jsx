import React from 'react';
import { Box } from '@mui/material';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
            <Navbar />
            <Sidebar />
            <Box 
                component="main" 
                sx={{ 
                    flexGrow: 1, 
                    p: 4,
                    width: '100%',
                    maxWidth: '100%',
                    mt: 10,
                }}
            >
                {children}
            </Box>
        </Box>
    );
};

export default Layout;