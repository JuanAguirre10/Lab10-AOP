import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box,
    Typography,
    IconButton,
    Grid,
    Paper,
    Chip,
} from '@mui/material';
import { Close } from '@mui/icons-material';

const AuditoriaDetalle = ({ open, onClose, auditoria }) => {
    if (!auditoria) return null;

    const formatearJSON = (jsonString) => {
        if (!jsonString) return 'N/A';
        try {
            const obj = JSON.parse(jsonString);
            return JSON.stringify(obj, null, 2);
        } catch {
            return jsonString;
        }
    };

    const formatearFecha = (fechaISO) => {
        if (!fechaISO) return 'N/A';
        const fecha = new Date(fechaISO);
        return fecha.toLocaleString('es-PE', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });
    };

    const getAccionColor = (accion) => {
        const colors = {
            CREATE: 'success',
            UPDATE: 'info',
            DELETE: 'error',
        };
        return colors[accion] || 'default';
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 2 }}>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                    📋 Detalle de Auditoría
                </Typography>
                <IconButton onClick={onClose}>
                    <Close />
                </IconButton>
            </DialogTitle>

            <DialogContent dividers>
                <Paper sx={{ p: 3, mb: 3, bgcolor: 'grey.50' }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                        Información General
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                                Usuario
                            </Typography>
                            <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                {auditoria.usuario}
                            </Typography>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                                Acción
                            </Typography>
                            <Box sx={{ mt: 0.5 }}>
                                <Chip
                                    label={auditoria.accion}
                                    color={getAccionColor(auditoria.accion)}
                                    sx={{ fontWeight: 700 }}
                                />
                            </Box>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                                Tabla
                            </Typography>
                            <Typography variant="body1" sx={{ fontWeight: 600, textTransform: 'capitalize' }}>
                                {auditoria.tabla}
                            </Typography>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                                ID Registro
                            </Typography>
                            <Typography variant="body2" sx={{ fontFamily: 'monospace', wordBreak: 'break-all' }}>
                                {auditoria.idRegistro}
                            </Typography>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                                Fecha/Hora
                            </Typography>
                            <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                {formatearFecha(auditoria.fecha)}
                            </Typography>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                                Dirección IP
                            </Typography>
                            <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                {auditoria.ip}
                            </Typography>
                        </Grid>
                    </Grid>
                </Paper>

                {auditoria.datosAnteriores && (
                    <Box sx={{ mb: 3 }}>
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                            📝 Datos Anteriores
                        </Typography>
                        <Paper 
                            sx={{ 
                                p: 2, 
                                bgcolor: '#fff3cd',
                                border: '1px solid #ffc107',
                                maxHeight: 300,
                                overflow: 'auto',
                            }}
                        >
                            <pre style={{ 
                                margin: 0, 
                                fontFamily: 'monospace', 
                                fontSize: '0.85rem',
                                whiteSpace: 'pre-wrap',
                                wordBreak: 'break-word',
                            }}>
                                {formatearJSON(auditoria.datosAnteriores)}
                            </pre>
                        </Paper>
                    </Box>
                )}

                {auditoria.datosNuevos && (
                    <Box>
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                            ✨ Datos Nuevos
                        </Typography>
                        <Paper 
                            sx={{ 
                                p: 2, 
                                bgcolor: '#d1ecf1',
                                border: '1px solid #0dcaf0',
                                maxHeight: 300,
                                overflow: 'auto',
                            }}
                        >
                            <pre style={{ 
                                margin: 0, 
                                fontFamily: 'monospace', 
                                fontSize: '0.85rem',
                                whiteSpace: 'pre-wrap',
                                wordBreak: 'break-word',
                            }}>
                                {formatearJSON(auditoria.datosNuevos)}
                            </pre>
                        </Paper>
                    </Box>
                )}

                {!auditoria.datosAnteriores && !auditoria.datosNuevos && (
                    <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'grey.100' }}>
                        <Typography color="text.secondary">
                            No hay datos adicionales para mostrar
                        </Typography>
                    </Paper>
                )}
            </DialogContent>

            <DialogActions sx={{ px: 3, py: 2 }}>
                <Button onClick={onClose} variant="contained">
                    Cerrar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AuditoriaDetalle;