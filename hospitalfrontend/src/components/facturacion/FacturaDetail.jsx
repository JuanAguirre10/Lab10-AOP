import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box,
    Typography,
    Divider,
    Chip,
    Grid,
    IconButton,
    Paper,
} from '@mui/material';
import { Close, Receipt, Person, CalendarMonth, AttachMoney, CreditCard } from '@mui/icons-material';
import { getPacienteById } from '../../services/pacienteService';

const DetailItem = ({ icon: Icon, label, value, color = 'primary' }) => (
    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
        <Box
            sx={{
                width: 40,
                height: 40,
                borderRadius: 2,
                bgcolor: `${color}.light`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Icon sx={{ color: `${color}.main`, fontSize: 20 }} />
        </Box>
        <Box sx={{ flex: 1 }}>
            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                {label}
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {value || 'No especificado'}
            </Typography>
        </Box>
    </Box>
);

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

const FacturaDetail = ({ open, onClose, factura }) => {
    const [paciente, setPaciente] = useState(null);

    useEffect(() => {
        if (factura && open) {
            loadData();
        }
    }, [factura, open]);

    const loadData = async () => {
        if (!factura) return;
        
        try {
            const pacienteRes = await getPacienteById(factura.idPaciente).catch(() => null);
            setPaciente(pacienteRes?.data);
        } catch (error) {
            console.error('Error cargando datos:', error);
        }
    };

    if (!factura) return null;

    const nombrePaciente = paciente 
        ? `${paciente.nombres} ${paciente.apellidos}` 
        : factura.nombrePaciente || factura.idPaciente;

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                        Detalle de Factura
                    </Typography>
                    <Chip
                        label={factura.estado}
                        color={getEstadoColor(factura.estado)}
                        size="small"
                        sx={{ fontWeight: 600, textTransform: 'capitalize' }}
                    />
                </Box>
                <IconButton onClick={onClose}>
                    <Close />
                </IconButton>
            </DialogTitle>

            <DialogContent dividers>
                <Paper sx={{ p: 3, mb: 3, bgcolor: 'success.lighter' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                        <Receipt sx={{ fontSize: 40, color: 'success.main' }} />
                        <Box>
                            <Typography variant="h5" sx={{ fontWeight: 700 }}>
                                Factura N° {factura.numeroFactura}
                            </Typography>
                            <Typography variant="h4" color="success.main" sx={{ fontWeight: 900 }}>
                                S/ {factura.montoTotal?.toFixed(2)}
                            </Typography>
                        </Box>
                    </Box>
                </Paper>

                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <DetailItem
                            icon={Receipt}
                            label="NÚMERO DE FACTURA"
                            value={factura.numeroFactura}
                            color="primary"
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <DetailItem
                            icon={Person}
                            label="PACIENTE"
                            value={nombrePaciente}
                            color="secondary"
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <DetailItem
                            icon={CalendarMonth}
                            label="FECHA DE EMISIÓN"
                            value={factura.fecha}
                            color="info"
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <DetailItem
                            icon={AttachMoney}
                            label="MONTO TOTAL"
                            value={`S/ ${factura.montoTotal?.toFixed(2)}`}
                            color="success"
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <DetailItem
                            icon={CreditCard}
                            label="MÉTODO DE PAGO"
                            value={factura.metodoPago}
                            color="warning"
                        />
                    </Grid>
                </Grid>

                <Divider sx={{ my: 3 }} />

                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                    Información del Sistema
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
                        <Typography variant="body2" color="text.secondary" fontWeight={600}>
                            ID de la Factura
                        </Typography>
                        <Typography variant="body2" fontWeight={500}>
                            {factura.id}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
                        <Typography variant="body2" color="text.secondary" fontWeight={600}>
                            Estado
                        </Typography>
                        <Chip
                            label={factura.estado}
                            color={getEstadoColor(factura.estado)}
                            size="small"
                            sx={{ textTransform: 'capitalize' }}
                        />
                    </Box>
                </Box>
            </DialogContent>

            <DialogActions sx={{ px: 3, py: 2 }}>
                <Button onClick={onClose} variant="contained">
                    Cerrar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default FacturaDetail;