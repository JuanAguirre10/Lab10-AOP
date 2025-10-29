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

const PacienteTable = ({ pacientes, loading, onEdit, onDelete, onView }) => {
    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (pacientes.length === 0) {
        return (
            <Paper sx={{ p: 6, textAlign: 'center' }}>
                <Typography variant="h6" color="text.secondary">
                    No hay pacientes registrados
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Haz clic en "Nuevo Paciente" para agregar uno
                </Typography>
            </Paper>
        );
    }

    return (
        <TableContainer component={Paper} sx={{ boxShadow: 2 }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>DNI</TableCell>
                        <TableCell>Nombres</TableCell>
                        <TableCell>Apellidos</TableCell>
                        <TableCell>Fecha Nac.</TableCell>
                        <TableCell>Teléfono</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Estado</TableCell>
                        <TableCell align="center">Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {pacientes.map((paciente) => (
                        <TableRow 
                            key={paciente.id}
                            sx={{ 
                                '&:hover': { 
                                    bgcolor: 'action.hover',
                                    cursor: 'pointer',
                                },
                            }}
                        >
                            <TableCell sx={{ fontWeight: 600 }}>{paciente.dni}</TableCell>
                            <TableCell>{paciente.nombres}</TableCell>
                            <TableCell>{paciente.apellidos}</TableCell>
                            <TableCell>{paciente.fechaNacimiento}</TableCell>
                            <TableCell>{paciente.telefono}</TableCell>
                            <TableCell>{paciente.correo}</TableCell>
                            <TableCell>
                                <Chip
                                    label={paciente.estado}
                                    color={paciente.estado === 'activo' ? 'success' : 'default'}
                                    size="small"
                                    sx={{ fontWeight: 600 }}
                                />
                            </TableCell>
                            <TableCell align="center">
                                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                                    <IconButton
                                        size="small"
                                        color="info"
                                        onClick={() => onView(paciente)}
                                    >
                                        <Visibility />
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        color="primary"
                                        onClick={() => onEdit(paciente)}
                                    >
                                        <Edit />
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        color="error"
                                        onClick={() => onDelete(paciente.id)}
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

export default PacienteTable;