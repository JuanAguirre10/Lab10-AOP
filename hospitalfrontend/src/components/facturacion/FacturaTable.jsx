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
    switch (estado?.toLowerCase()) {
        case 'pendiente':
            return 'warning';
        case 'pagada':
        case 'pagado':
            return 'success';
        case 'anulada':
        case 'anulado':
            return 'error';
        default:
            return 'default';
    }
};

const FacturaTable = ({ facturas, loading, onEdit, onDelete, onView }) => {
    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (facturas.length === 0) {
        return (
            <Paper sx={{ p: 6, textAlign: 'center' }}>
                <Typography variant="h6" color="text.secondary">
                    No hay facturas registradas
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Haz clic en "Nueva Factura" para agregar una
                </Typography>
            </Paper>
        );
    }

    return (
        <TableContainer component={Paper} sx={{ boxShadow: 2 }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Nº Factura</TableCell>
                        <TableCell>Fecha</TableCell>
                        <TableCell>Paciente</TableCell>
                        <TableCell>Monto Total</TableCell>
                        <TableCell>Estado</TableCell>
                        <TableCell>Método Pago</TableCell>
                        <TableCell align="center">Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {facturas.map((factura) => (
                        <TableRow 
                            key={factura.id}
                            sx={{ 
                                '&:hover': { 
                                    bgcolor: 'action.hover',
                                    cursor: 'pointer',
                                },
                            }}
                        >
                            <TableCell sx={{ fontWeight: 600 }}>{factura.numeroFactura}</TableCell>
                            <TableCell>{factura.fecha}</TableCell>
                            <TableCell>{factura.nombrePaciente}</TableCell>
                            <TableCell sx={{ fontWeight: 600, color: 'success.main' }}>
                                S/ {factura.montoTotal?.toFixed(2)}
                            </TableCell>
                            <TableCell>
                                <Chip
                                    label={factura.estado}
                                    color={getEstadoColor(factura.estado)}
                                    size="small"
                                    sx={{ fontWeight: 600, textTransform: 'capitalize' }}
                                />
                            </TableCell>
                            <TableCell>{factura.metodoPago}</TableCell>
                            <TableCell align="center">
                                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                                    <IconButton
                                        size="small"
                                        color="info"
                                        onClick={() => onView(factura)}
                                    >
                                        <Visibility />
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        color="primary"
                                        onClick={() => onEdit(factura)}
                                    >
                                        <Edit />
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        color="error"
                                        onClick={() => onDelete(factura.id)}
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

export default FacturaTable;