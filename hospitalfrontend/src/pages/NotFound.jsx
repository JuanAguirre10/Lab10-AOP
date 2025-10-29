import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Home } from '@mui/icons-material';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            }}
        >
            <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
                <Typography variant="h1" sx={{ fontSize: '8rem', fontWeight: 700, color: 'white' }}>
                    404
                </Typography>
                <Typography variant="h4" sx={{ mb: 2, color: 'white' }}>
                    Página no encontrada
                </Typography>
                <Typography variant="body1" sx={{ mb: 4, color: 'rgba(255,255,255,0.8)' }}>
                    Lo sentimos, la página que buscas no existe o ha sido movida.
                </Typography>
                <Button
                    variant="contained"
                    size="large"
                    startIcon={<Home />}
                    onClick={() => navigate('/dashboard')}
                    sx={{ bgcolor: 'white', color: 'primary.main', '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' } }}
                >
                    Volver al Dashboard
                </Button>
            </Container>
        </Box>
    );
};

export default NotFound;