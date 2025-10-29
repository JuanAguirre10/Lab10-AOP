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

const MedicoTable = ({ medicos, loading, onEdit, onDelete, onView }) => {
    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (medicos.length === 0) {
        return (
            <Paper sx={{ p: 6, textAlign: 'center' }}>
                <Typography variant="h6" color="text.secondary">
                    No hay médicos registrados
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Haz clic en "Nuevo Médico" para agregar uno
                </Typography>
            </Paper>
        );
    }

    return (
        <TableContainer component={Paper} sx={{ boxShadow: 2 }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Colegiatura</TableCell>
                        <TableCell>Nombres</TableCell>
                        <TableCell>Apellidos</TableCell>
                        <TableCell>Teléfono</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Estado</TableCell>
                        <TableCell align="center">Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {medicos.map((medico) => (
                        <TableRow 
                            key={medico.id}
                            sx={{ 
                                '&:hover': { 
                                    bgcolor: 'action.hover',
                                    cursor: 'pointer',
                                },
                            }}
                        >
                            <TableCell sx={{ fontWeight: 600 }}>{medico.colegiatura}</TableCell>
                            <TableCell>{medico.nombres}</TableCell>
                            <TableCell>{medico.apellidos}</TableCell>
                            <TableCell>{medico.telefono}</TableCell>
                            <TableCell>{medico.correo}</TableCell>
                            <TableCell>
                                <Chip
                                    label={medico.estado}
                                    color={medico.estado === 'activo' ? 'success' : 'default'}
                                    size="small"
                                    sx={{ fontWeight: 600 }}
                                />
                            </TableCell>
                            <TableCell align="center">
                                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                                    <IconButton
                                        size="small"
                                        color="info"
                                        onClick={() => onView(medico)}
                                    >
                                        <Visibility />
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        color="primary"
                                        onClick={() => onEdit(medico)}
                                    >
                                        <Edit />
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        color="error"
                                        onClick={() => onDelete(medico.id)}
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

export default MedicoTable;