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
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const getEstadoColor = (estado) => {
    switch (estado?.toLowerCase()) {
        case 'disponible':
            return 'success';
        case 'ocupada':
            return 'error';
        case 'mantenimiento':
            return 'warning';
        default:
            return 'default';
    }
};

const getTipoColor = (tipo) => {
    switch (tipo?.toLowerCase()) {
        case 'individual':
            return 'primary';
        case 'doble':
            return 'secondary';
        case 'uci':
            return 'error';
        case 'pediatria':
            return 'info';
        default:
            return 'default';
    }
};

const HabitacionTable = ({ habitaciones, loading, onEdit, onDelete }) => {
    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (habitaciones.length === 0) {
        return (
            <Paper sx={{ p: 6, textAlign: 'center' }}>
                <Typography variant="h6" color="text.secondary">
                    No hay habitaciones registradas
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Haz clic en "Nueva Habitación" para agregar una
                </Typography>
            </Paper>
        );
    }

    return (
        <TableContainer component={Paper} sx={{ boxShadow: 2 }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Número</TableCell>
                        <TableCell>Tipo</TableCell>
                        <TableCell>Estado</TableCell>
                        <TableCell align="center">Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {habitaciones.map((habitacion) => (
                        <TableRow 
                            key={habitacion.id}
                            sx={{ 
                                '&:hover': { 
                                    bgcolor: 'action.hover',
                                    cursor: 'pointer',
                                },
                            }}
                        >
                            <TableCell>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                        {habitacion.numero}
                                    </Typography>
                                </Box>
                            </TableCell>
                            <TableCell>
                                <Chip
                                    label={habitacion.tipo}
                                    color={getTipoColor(habitacion.tipo)}
                                    size="small"
                                    sx={{ fontWeight: 600, textTransform: 'capitalize' }}
                                />
                            </TableCell>
                            <TableCell>
                                <Chip
                                    label={habitacion.estado}
                                    color={getEstadoColor(habitacion.estado)}
                                    size="small"
                                    sx={{ fontWeight: 600, textTransform: 'capitalize' }}
                                />
                            </TableCell>
                            <TableCell align="center">
                                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                                    <IconButton
                                        size="small"
                                        color="primary"
                                        onClick={() => onEdit(habitacion)}
                                    >
                                        <Edit />
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        color="error"
                                        onClick={() => onDelete(habitacion.id)}
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

export default HabitacionTable;