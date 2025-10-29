import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, ListItemButton, Toolbar, Box } from '@mui/material';
import { 
    Dashboard, 
    People, 
    LocalHospital, 
    CalendarMonth, 
    Description, 
    Hotel, 
    Receipt, 
    AccountCircle ,
    MeetingRoom,
    HealthAndSafety,
    Assessment,  
    Summarize,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';



const drawerWidth = 280;

const menuItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
    { text: 'Pacientes', icon: <People />, path: '/pacientes' },
    { text: 'Médicos', icon: <LocalHospital />, path: '/medicos' },
    { text: 'Citas', icon: <CalendarMonth />, path: '/citas' },
    { text: 'Consultas', icon: <Description />, path: '/consultas' },
    { text: 'Diagnósticos', icon: <HealthAndSafety />, path: '/diagnosticos' },
    { text: 'Habitaciones', icon: <MeetingRoom />, path: '/habitaciones' },
    { text: 'Hospitalización', icon: <Hotel />, path: '/hospitalizacion' },
    { text: 'Facturación', icon: <Receipt />, path: '/facturacion' },
    { text: 'Usuarios', icon: <AccountCircle />, path: '/usuarios' },
    { text: 'Auditoría', icon: <Assessment />, path: '/auditoria' },
    { text: 'Reportes', icon: <Summarize />, path: '/reportes' },

];

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    bgcolor: 'white',
                    borderRight: '1px solid',
                    borderColor: 'divider',
                },
            }}
        >
            <Toolbar sx={{ minHeight: 80 }} />
            <Box sx={{ overflow: 'auto', px: 2, py: 3 }}>
                <List sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {menuItems.map((item) => (
                        <ListItem key={item.text} disablePadding>
                            <ListItemButton
                                selected={location.pathname === item.path}
                                onClick={() => handleNavigation(item.path)}
                                sx={{
                                    borderRadius: 2,
                                    py: 1.5,
                                    '&.Mui-selected': {
                                        bgcolor: 'primary.main',
                                        color: 'white',
                                        '&:hover': {
                                            bgcolor: 'primary.dark',
                                        },
                                        '& .MuiListItemIcon-root': {
                                            color: 'white',
                                        },
                                    },
                                    '&:hover': {
                                        bgcolor: 'action.hover',
                                    },
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 40,
                                        color: location.pathname === item.path ? 'white' : 'text.secondary',
                                    }}
                                >
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText 
                                    primary={item.text}
                                    primaryTypographyProps={{
                                        fontWeight: location.pathname === item.path ? 700 : 500,
                                        fontSize: '0.95rem',
                                    }}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Drawer>
    );
};

export default Sidebar;