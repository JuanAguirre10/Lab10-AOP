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

const DetalleRecetaTable = ({ detalles, loading, onEdit, onDelete, recetas }) => {
    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (detalles.length === 0) {
        return (
            <Paper sx={{ p: 6, textAlign: 'center' }}>
                <Typography variant="h6" color="text.secondary">
                    No hay medicamentos registrados
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Haz clic en "Nuevo Medicamento" para agregar uno
                </Typography>
            </Paper>
        );
    }

    const getRecetaInfo = (idReceta) => {
        const receta = recetas.find(r => r.id === idReceta);
        return receta ? `Receta ${receta.id.substring(0, 8)}` : idReceta;
    };

    return (
        <TableContainer component={Paper} sx={{ boxShadow: 2 }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Receta</TableCell>
                        <TableCell>Medicamento</TableCell>
                        <TableCell>Dosis</TableCell>
                        <TableCell>Frecuencia</TableCell>
                        <TableCell>Duración</TableCell>
                        <TableCell align="center">Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {detalles.map((detalle) => (
                        <TableRow 
                            key={detalle.id}
                            sx={{ 
                                '&:hover': { 
                                    bgcolor: 'action.hover',
                                    cursor: 'pointer',
                                },
                            }}
                        >
                            <TableCell>
                                <Chip 
                                    label={getRecetaInfo(detalle.idReceta)}
                                    size="small"
                                    color="success"
                                />
                            </TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>{detalle.medicamento}</TableCell>
                            <TableCell>{detalle.dosis}</TableCell>
                            <TableCell>{detalle.frecuencia}</TableCell>
                            <TableCell>{detalle.duracion}</TableCell>
                            <TableCell align="center">
                                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                                    <IconButton
                                        size="small"
                                        color="primary"
                                        onClick={() => onEdit(detalle)}
                                    >
                                        <Edit />
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        color="error"
                                        onClick={() => onDelete(detalle.id)}
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

export default DetalleRecetaTable;