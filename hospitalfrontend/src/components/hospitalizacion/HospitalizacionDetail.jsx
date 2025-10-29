import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box,
    Typography,
    Divider,
    Grid,
    IconButton,
    Paper,
    Chip,
} from '@mui/material';
import { Close, Person, Hotel, CalendarMonth, LocalHospital, Description } from '@mui/icons-material';

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

const HospitalizacionDetail = ({ open, onClose, hospitalizacion }) => {
    if (!hospitalizacion) return null;

    const estaActiva = !hospitalizacion.fechaAlta;

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                        Detalle de Hospitalización
                    </Typography>
                    <Chip
                        label={estaActiva ? 'En curso' : 'Finalizada'}
                        color={estaActiva ? 'error' : 'success'}
                        size="small"
                        sx={{ fontWeight: 600 }}
                    />
                </Box>
                <IconButton onClick={onClose}>
                    <Close />
                </IconButton>
            </DialogTitle>

            <DialogContent dividers>
                <Paper sx={{ p: 3, mb: 3, bgcolor: 'error.lighter' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                        <Hotel sx={{ fontSize: 40, color: 'error.main' }} />
                        <Box>
                            <Typography variant="h5" sx={{ fontWeight: 700 }}>
                                Hospitalización
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                Paciente: {hospitalizacion.nombrePaciente}
                            </Typography>
                        </Box>
                    </Box>
                </Paper>

                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <DetailItem
                            icon={Person}
                            label="PACIENTE"
                            value={hospitalizacion.nombrePaciente}
                            color="primary"
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <DetailItem
                            icon={Hotel}
                            label="HABITACIÓN"
                            value={`Habitación ${hospitalizacion.numeroHabitacion}`}
                            color="secondary"
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <DetailItem
                            icon={CalendarMonth}
                            label="FECHA DE INGRESO"
                            value={hospitalizacion.fechaIngreso}
                            color="info"
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <DetailItem
                            icon={CalendarMonth}
                            label="FECHA DE ALTA"
                            value={hospitalizacion.fechaAlta || 'En curso'}
                            color="warning"
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <DetailItem
                            icon={LocalHospital}
                            label="DIAGNÓSTICO DE INGRESO"
                            value={hospitalizacion.diagnostico}
                            color="error"
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
                            ID de Hospitalización
                        </Typography>
                        <Typography variant="body2" fontWeight={500}>
                            {hospitalizacion.id}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
                        <Typography variant="body2" color="text.secondary" fontWeight={600}>
                            Estado
                        </Typography>
                        <Chip
                            label={estaActiva ? 'En curso' : 'Finalizada'}
                            color={estaActiva ? 'error' : 'success'}
                            size="small"
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

export default HospitalizacionDetail;