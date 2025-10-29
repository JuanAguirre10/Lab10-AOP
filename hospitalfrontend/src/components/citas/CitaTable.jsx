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
import { Edit, Delete, Visibility } from '@mui/icons-material';

const getEstadoColor = (estado) => {
    switch (estado) {
        case 'programada':
            return 'info';
        case 'atendida':
            return 'success';
        case 'cancelada':
            return 'error';
        default:
            return 'default';
    }
};

const CitaTable = ({ citas, loading, onEdit, onDelete, onView }) => {
    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (citas.length === 0) {
        return (
            <Paper sx={{ p: 6, textAlign: 'center' }}>
                <Typography variant="h6" color="text.secondary">
                    No hay citas registradas
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Haz clic en "Nueva Cita" para agregar una
                </Typography>
            </Paper>
        );
    }

    return (
        <TableContainer component={Paper} sx={{ boxShadow: 2 }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Fecha</TableCell>
                        <TableCell>Hora</TableCell>
                        <TableCell>Paciente</TableCell>
                        <TableCell>Médico</TableCell>
                        <TableCell>Motivo</TableCell>
                        <TableCell>Estado</TableCell>
                        <TableCell align="center">Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {citas.map((cita) => (
                        <TableRow 
                            key={cita.id}
                            sx={{ 
                                '&:hover': { 
                                    bgcolor: 'action.hover',
                                    cursor: 'pointer',
                                },
                            }}
                        >
                            <TableCell sx={{ fontWeight: 600 }}>{cita.fecha}</TableCell>
                            <TableCell>{cita.hora}</TableCell>
                            <TableCell>{cita.nombrePaciente}</TableCell>
                            <TableCell>{cita.nombreMedico}</TableCell>
                            <TableCell>{cita.motivo}</TableCell>
                            <TableCell>
                                <Chip
                                    label={cita.estado}
                                    color={getEstadoColor(cita.estado)}
                                    size="small"
                                    sx={{ fontWeight: 600, textTransform: 'capitalize' }}
                                />
                            </TableCell>
                            <TableCell align="center">
                                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                                    <IconButton
                                        size="small"
                                        color="info"
                                        onClick={() => onView(cita)}
                                    >
                                        <Visibility />
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        color="primary"
                                        onClick={() => onEdit(cita)}
                                    >
                                        <Edit />
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        color="error"
                                        onClick={() => onDelete(cita.id)}
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

export default CitaTable;