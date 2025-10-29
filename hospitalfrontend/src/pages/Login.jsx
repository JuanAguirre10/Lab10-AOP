import React, { useState } from 'react';
import { Box, Card, TextField, Button, Typography, Container, InputAdornment, IconButton, Alert, LinearProgress } from '@mui/material';
import { LockOutlined, Visibility, VisibilityOff, Person, LocalHospital } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const { login, loading } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        if (!username || !password) {
            setError('Por favor complete todos los campos');
            return;
        }

        const result = await login(username, password);
        
        if (result.success) {
            toast.success('¡Bienvenido al sistema!');
            navigate('/dashboard');
        } else {
            setError(result.error || 'Credenciales incorrectas. Intente nuevamente.');
        }
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                position: 'relative',
                overflow: 'hidden',
                background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #7e22ce 100%)',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                    opacity: 0.4,
                },
            }}
        >
            <Container 
                maxWidth={false}
                sx={{ 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    zIndex: 1,
                    px: 2,
                }}
            >
                <Box sx={{ display: 'flex', gap: 4, alignItems: 'center', maxWidth: 1200, width: '100%' }}>
                    <Box 
                        sx={{ 
                            flex: 1,
                            display: { xs: 'none', md: 'flex' },
                            flexDirection: 'column',
                            gap: 3,
                            color: 'white',
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                            <Box
                                sx={{
                                    width: 60,
                                    height: 60,
                                    borderRadius: 3,
                                    background: 'rgba(255, 255, 255, 0.15)',
                                    backdropFilter: 'blur(10px)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    border: '2px solid rgba(255, 255, 255, 0.3)',
                                }}
                            >
                                <LocalHospital sx={{ fontSize: 35, color: 'white' }} />
                            </Box>
                            <Typography variant="h4" sx={{ fontWeight: 700, letterSpacing: '-0.02em' }}>
                                Tecsup Health
                            </Typography>
                        </Box>
                        
                        <Typography variant="h3" sx={{ fontWeight: 800, lineHeight: 1.2, mb: 2 }}>
                            Sistema de Gestión Hospitalaria
                        </Typography>
                        
                        <Typography variant="h6" sx={{ fontWeight: 400, opacity: 0.9, lineHeight: 1.6, maxWidth: 500 }}>
                            Plataforma integral para la gestión eficiente de pacientes, citas médicas, consultas y facturación hospitalaria.
                        </Typography>
                    </Box>

                    <Box sx={{ flex: { xs: 1, md: 0.5 }, display: 'flex', justifyContent: 'center' }}>
                        <Card
                            elevation={0}
                            sx={{
                                p: 5,
                                width: '100%',
                                maxWidth: 450,
                                backdropFilter: 'blur(20px)',
                                backgroundColor: 'rgba(255, 255, 255, 0.98)',
                                border: '1px solid rgba(255, 255, 255, 0.5)',
                                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
                            }}
                        >
                            <Box
                                sx={{
                                    width: 80,
                                    height: 80,
                                    borderRadius: 4,
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    mb: 3,
                                    mx: 'auto',
                                    boxShadow: '0 12px 32px rgba(102, 126, 234, 0.4)',
                                }}
                            >
                                <LockOutlined sx={{ fontSize: 40, color: 'white' }} />
                            </Box>
                            
                            <Typography 
                                component="h1" 
                                variant="h4" 
                                sx={{ 
                                    mb: 1, 
                                    fontWeight: 800, 
                                    color: 'text.primary',
                                    textAlign: 'center',
                                    letterSpacing: '-0.02em',
                                }}
                            >
                                Iniciar Sesión
                            </Typography>
                            
                            <Typography 
                                variant="body1" 
                                color="text.secondary" 
                                sx={{ mb: 4, textAlign: 'center', fontWeight: 500 }}
                            >
                                Ingrese sus credenciales para continuar
                            </Typography>

                            {loading && <LinearProgress sx={{ mb: 2, borderRadius: 1 }} />}

                            {error && (
                                <Alert 
                                    severity="error" 
                                    sx={{ 
                                        width: '100%', 
                                        mb: 3,
                                        borderRadius: 2,
                                        '& .MuiAlert-icon': {
                                            fontSize: 24,
                                        },
                                    }}
                                >
                                    {error}
                                </Alert>
                            )}

                            <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
                                <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.secondary', mb: 1, display: 'block' }}>
                                    USUARIO
                                </Typography>
                                <TextField
                                    required
                                    fullWidth
                                    placeholder="Ingrese su usuario"
                                    autoComplete="username"
                                    autoFocus
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Person sx={{ color: 'primary.main' }} />
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{ mb: 3 }}
                                />
                                
                                <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.secondary', mb: 1, display: 'block' }}>
                                    CONTRASEÑA
                                </Typography>
                                <TextField
                                    required
                                    fullWidth
                                    placeholder="Ingrese su contraseña"
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LockOutlined sx={{ color: 'primary.main' }} />
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    edge="end"
                                                    sx={{ color: 'text.secondary' }}
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{ mb: 4 }}
                                />

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    size="large"
                                    disabled={loading}
                                    sx={{
                                        py: 2,
                                        fontSize: '1.05rem',
                                        fontWeight: 700,
                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                        boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            background: 'linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%)',
                                            boxShadow: '0 12px 32px rgba(102, 126, 234, 0.5)',
                                            transform: 'translateY(-2px)',
                                        },
                                        '&:disabled': {
                                            background: 'linear-gradient(135deg, #94a3b8 0%, #64748b 100%)',
                                        },
                                    }}
                                >
                                    {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                                </Button>
                            </Box>
                        </Card>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default Login;