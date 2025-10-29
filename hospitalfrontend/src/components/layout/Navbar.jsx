import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, Avatar, Menu, MenuItem, Badge, Chip } from '@mui/material';
import { Notifications, AccountCircle, Logout, Settings, Search } from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <AppBar 
            position="fixed" 
            sx={{ 
                zIndex: (theme) => theme.zIndex.drawer + 1,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                boxShadow: '0 4px 20px rgba(102, 126, 234, 0.3)',
            }}
        >
            <Toolbar sx={{ minHeight: 80, py: 2, px: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexGrow: 1 }}>
                    <Box
                        sx={{
                            width: 48,
                            height: 48,
                            borderRadius: 2,
                            background: 'rgba(255, 255, 255, 0.2)',
                            backdropFilter: 'blur(10px)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '2px solid rgba(255, 255, 255, 0.3)',
                        }}
                    >
                        <Typography variant="h6" sx={{ fontWeight: 900, color: 'white' }}>
                            T
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant="h5" sx={{ fontWeight: 900, letterSpacing: '-0.5px', color: 'white', lineHeight: 1 }}>
                            Tecsup Health
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)', fontWeight: 500 }}>
                            Sistema de Gestión Hospitalaria
                        </Typography>
                    </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                    <IconButton 
                        sx={{ 
                            color: 'white',
                            bgcolor: 'rgba(255,255,255,0.1)',
                            '&:hover': {
                                bgcolor: 'rgba(255,255,255,0.2)',
                            }
                        }}
                    >
                        <Search />
                    </IconButton>

                    <IconButton 
                        sx={{ 
                            color: 'white',
                            bgcolor: 'rgba(255,255,255,0.1)',
                            '&:hover': {
                                bgcolor: 'rgba(255,255,255,0.2)',
                            }
                        }}
                    >
                        <Badge badgeContent={3} color="error">
                            <Notifications />
                        </Badge>
                    </IconButton>

                    <Box 
                        sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: 2,
                            cursor: 'pointer',
                            px: 2,
                            py: 1,
                            borderRadius: 3,
                            bgcolor: 'rgba(255,255,255,0.15)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255,255,255,0.2)',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                bgcolor: 'rgba(255,255,255,0.25)',
                                transform: 'translateY(-2px)',
                            }
                        }}
                        onClick={handleMenu}
                    >
                        <Avatar 
                            sx={{ 
                                width: 42, 
                                height: 42, 
                                bgcolor: 'white',
                                color: 'primary.main',
                                fontWeight: 900,
                                fontSize: '1.2rem',
                                border: '2px solid rgba(255,255,255,0.5)',
                            }}
                        >
                            {user?.username?.charAt(0).toUpperCase()}
                        </Avatar>
                        <Box sx={{ textAlign: 'left' }}>
                            <Typography variant="body1" sx={{ fontWeight: 700, lineHeight: 1.2, color: 'white' }}>
                                {user?.username}
                            </Typography>
                            <Chip 
                                label="Admin" 
                                size="small" 
                                sx={{ 
                                    height: 20,
                                    bgcolor: 'rgba(255,255,255,0.25)',
                                    color: 'white',
                                    fontSize: '0.7rem',
                                    fontWeight: 600,
                                    mt: 0.5,
                                }}
                            />
                        </Box>
                    </Box>

                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        PaperProps={{
                            sx: { 
                                mt: 1, 
                                minWidth: 220,
                                borderRadius: 2,
                                boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                            }
                        }}
                    >
                        <MenuItem onClick={handleClose} sx={{ py: 1.5 }}>
                            <AccountCircle sx={{ mr: 2, color: 'primary.main' }} /> Mi Perfil
                        </MenuItem>
                        <MenuItem onClick={handleClose} sx={{ py: 1.5 }}>
                            <Settings sx={{ mr: 2, color: 'text.secondary' }} /> Configuración
                        </MenuItem>
                        <MenuItem onClick={handleLogout} sx={{ py: 1.5, color: 'error.main' }}>
                            <Logout sx={{ mr: 2 }} /> Cerrar Sesión
                        </MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;