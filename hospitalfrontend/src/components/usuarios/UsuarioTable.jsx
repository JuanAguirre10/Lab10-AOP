import React from 'react';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Chip,
    Box,
    CircularProgress,
    Typography,
    Avatar,
} from '@mui/material';
import { Edit, Delete, Visibility } from '@mui/icons-material';

const getRolColor = (rol) => {
    switch (rol) {
        case 'admin':
            return 'error';
        case 'medico':
            return 'primary';
        case 'recepcionista':
            return 'info';
        default:
            return 'default';
    }
};

const UsuarioTable = ({ usuarios, loading, onEdit, onDelete, onView }) => {
    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (usuarios.length === 0) {
        return (
            <Paper sx={{ p: 6, textAlign: 'center' }}>
                <Typography variant="h6" color="text.secondary">
                    No hay usuarios registrados
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Haz clic en "Nuevo Usuario" para agregar uno
                </Typography>
            </Paper>
        );
    }

    return (
        <TableContainer component={Paper} sx={{ boxShadow: 2 }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Usuario</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Rol</TableCell>
                        <TableCell>Estado</TableCell>
                        <TableCell align="center">Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {usuarios.map((usuario) => (
                        <TableRow 
                            key={usuario.id}
                            sx={{ 
                                '&:hover': { 
                                    bgcolor: 'action.hover',
                                    cursor: 'pointer',
                                },
                            }}
                        >
                            <TableCell>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Avatar sx={{ bgcolor: 'primary.main', width: 36, height: 36 }}>
                                        {usuario.username?.charAt(0).toUpperCase()}
                                    </Avatar>
                                    <Typography sx={{ fontWeight: 600 }}>
                                        {usuario.username}
                                    </Typography>
                                </Box>
                            </TableCell>
                            <TableCell>{usuario.email}</TableCell>
                            <TableCell>
                                <Chip
                                    label={usuario.rol}
                                    color={getRolColor(usuario.rol)}
                                    size="small"
                                    sx={{ fontWeight: 600, textTransform: 'capitalize' }}
                                />
                            </TableCell>
                            <TableCell>
                                <Chip
                                    label={usuario.activo ? 'Activo' : 'Inactivo'}
                                    color={usuario.activo ? 'success' : 'default'}
                                    size="small"
                                    sx={{ fontWeight: 600 }}
                                />
                            </TableCell>
                            <TableCell align="center">
                                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                                    <IconButton
                                        size="small"
                                        color="info"
                                        onClick={() => onView(usuario)}
                                    >
                                        <Visibility />
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        color="primary"
                                        onClick={() => onEdit(usuario)}
                                    >
                                        <Edit />
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        color="error"
                                        onClick={() => onDelete(usuario.id)}
                                    >
                                        <Delete />
                                    </IconButton>
                                </Box>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default UsuarioTable;