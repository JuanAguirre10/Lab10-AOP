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
import { Visibility } from '@mui/icons-material';

const getAccionColor = (accion) => {
    const colors = {
        CREATE: 'success',
        UPDATE: 'info',
        DELETE: 'error',
    };
    return colors[accion] || 'default';
};

const AuditoriaTable = ({ auditorias, loading, onVerDetalle }) => {
    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (auditorias.length === 0) {
        return (
            <Paper sx={{ p: 6, textAlign: 'center' }}>
                <Typography variant="h6" color="text.secondary">
                    No hay registros de auditoría
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Los registros aparecerán cuando se realicen operaciones en el sistema
                </Typography>
            </Paper>
        );
    }

    const formatearFecha = (fechaISO) => {
        if (!fechaISO) return 'N/A';
        const fecha = new Date(fechaISO);
        return fecha.toLocaleString('es-PE', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <TableContainer component={Paper} sx={{ boxShadow: 2 }}>
            <Table>
                <TableHead>
                    <TableRow sx={{ bgcolor: 'primary.main' }}>
                        <TableCell sx={{ color: 'black', fontWeight: 700 }}>Fecha/Hora</TableCell>
                        <TableCell sx={{ color: 'black', fontWeight: 700 }}>Usuario</TableCell>
                        <TableCell sx={{ color: 'black', fontWeight: 700 }}>Acción</TableCell>
                        <TableCell sx={{ color: 'black', fontWeight: 700 }}>Tabla</TableCell>
                        <TableCell sx={{ color: 'black', fontWeight: 700 }}>ID Registro</TableCell>
                        <TableCell sx={{ color: 'black', fontWeight: 700 }}>IP</TableCell>
                        <TableCell sx={{ color: 'black', fontWeight: 700 }} align="center">Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {auditorias.map((auditoria) => (
                        <TableRow 
                            key={auditoria.id}
                            sx={{ 
                                '&:hover': { 
                                    bgcolor: 'action.hover',
                                },
                            }}
                        >
                            <TableCell>{formatearFecha(auditoria.fecha)}</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>{auditoria.usuario}</TableCell>
                            <TableCell>
                                <Chip
                                    label={auditoria.accion}
                                    color={getAccionColor(auditoria.accion)}
                                    size="small"
                                    sx={{ fontWeight: 600 }}
                                />
                            </TableCell>
                            <TableCell sx={{ textTransform: 'capitalize' }}>{auditoria.tabla}</TableCell>
                            <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>
                                {auditoria.idRegistro?.substring(0, 12)}...
                            </TableCell>
                            <TableCell>{auditoria.ip}</TableCell>
                            <TableCell align="center">
                                <IconButton
                                    size="small"
                                    color="primary"
                                    onClick={() => onVerDetalle(auditoria)}
                                >
                                    <Visibility />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default AuditoriaTable;