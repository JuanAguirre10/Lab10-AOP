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
    Box,
    CircularProgress,
    Typography,
    Chip,
} from '@mui/material';
import { Edit, Delete, Visibility } from '@mui/icons-material';

const HospitalizacionTable = ({ hospitalizaciones, loading, onEdit, onDelete, onView }) => {
    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (hospitalizaciones.length === 0) {
        return (
            <Paper sx={{ p: 6, textAlign: 'center' }}>
                <Typography variant="h6" color="text.secondary">
                    No hay hospitalizaciones registradas
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Haz clic en "Nueva Hospitalización" para agregar una
                </Typography>
            </Paper>
        );
    }

    return (
        <TableContainer component={Paper} sx={{ boxShadow: 2 }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Paciente</TableCell>
                        <TableCell>Habitación</TableCell>
                        <TableCell>Tipo</TableCell>
                        <TableCell>Fecha Ingreso</TableCell>
                        <TableCell>Fecha Alta</TableCell>
                        <TableCell>Diagnóstico</TableCell>
                        <TableCell>Estado</TableCell>
                        <TableCell align="center">Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {hospitalizaciones.map((hospitalizacion) => (
                        <TableRow 
                            key={hospitalizacion.id}
                            sx={{ 
                                '&:hover': { 
                                    bgcolor: 'action.hover',
                                    cursor: 'pointer',
                                },
                            }}
                        >
                            <TableCell sx={{ fontWeight: 600 }}>{hospitalizacion.nombrePaciente}</TableCell>
                            <TableCell>
                                <Chip 
                                    label={`Hab. ${hospitalizacion.numeroHabitacion}`}
                                    color="secondary"
                                    size="small"
                                    sx={{ fontWeight: 600 }}
                                />
                            </TableCell>
                            <TableCell>
                                <Chip 
                                    label={hospitalizacion.tipoHabitacion}
                                    color="info"
                                    size="small"
                                    variant="outlined"
                                    sx={{ textTransform: 'capitalize' }}
                                />
                            </TableCell>
                            <TableCell>{hospitalizacion.fechaIngreso}</TableCell>
                            <TableCell>
                                {hospitalizacion.fechaAlta ? (
                                    hospitalizacion.fechaAlta
                                ) : (
                                    <Chip label="En curso" color="warning" size="small" />
                                )}
                            </TableCell>
                            <TableCell>{hospitalizacion.diagnostico}</TableCell>
                            <TableCell>
                                <Chip
                                    label={hospitalizacion.estado}
                                    color={hospitalizacion.fechaAlta ? 'default' : 'error'}
                                    size="small"
                                    sx={{ fontWeight: 600, textTransform: 'capitalize' }}
                                />
                            </TableCell>
                            <TableCell align="center">
                                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                                    <IconButton
                                        size="small"
                                        color="info"
                                        onClick={() => onView(hospitalizacion)}
                                    >
                                        <Visibility />
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        color="primary"
                                        onClick={() => onEdit(hospitalizacion)}
                                    >
                                        <Edit />
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        color="error"
                                        onClick={() => onDelete(hospitalizacion.id)}
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

export default HospitalizacionTable;