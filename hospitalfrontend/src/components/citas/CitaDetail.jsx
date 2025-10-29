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
    Grid,
    IconButton,
    Paper,
    Chip,
} from '@mui/material';
import { Close, Person, LocalHospital, CalendarMonth, AccessTime, Description } from '@mui/icons-material';
import { getPacienteById } from '../../services/pacienteService';
import { getMedicoById } from '../../services/medicoService';

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

const CitaDetail = ({ open, onClose, cita }) => {
    const [paciente, setPaciente] = useState(null);
    const [medico, setMedico] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (cita && open) {
            loadData();
        }
    }, [cita, open]);

    const loadData = async () => {
        if (!cita) return;
        
        setLoading(true);
        try {
            const [pacienteRes, medicoRes] = await Promise.all([
                getPacienteById(cita.idPaciente).catch(() => null),
                getMedicoById(cita.idMedico).catch(() => null),
            ]);
            
            setPaciente(pacienteRes?.data);
            setMedico(medicoRes?.data);
        } catch (error) {
            console.error('Error cargando datos:', error);
        } finally {
            setLoading(false);
        }
    };

    if (!cita) return null;

    const nombrePaciente = paciente 
        ? `${paciente.nombres} ${paciente.apellidos}` 
        : cita.nombrePaciente || cita.idPaciente;

    const nombreMedico = medico 
        ? `Dr(a). ${medico.nombres} ${medico.apellidos}` 
        : cita.nombreMedico || cita.idMedico;

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                        Detalle de la Cita
                    </Typography>
                    <Chip
                        label={cita.estado}
                        color={getEstadoColor(cita.estado)}
                        size="small"
                        sx={{ fontWeight: 600, textTransform: 'capitalize' }}
                    />
                </Box>
                <IconButton onClick={onClose}>
                    <Close />
                </IconButton>
            </DialogTitle>

            <DialogContent dividers>
                <Paper sx={{ p: 3, mb: 3, bgcolor: 'info.lighter' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                        <CalendarMonth sx={{ fontSize: 40, color: 'info.main' }} />
                        <Box>
                            <Typography variant="h5" sx={{ fontWeight: 700 }}>
                                {cita.fecha} - {cita.hora}
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                Cita Médica {cita.estado}
                            </Typography>
                        </Box>
                    </Box>
                </Paper>

                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <DetailItem
                            icon={Person}
                            label="PACIENTE"
                            value={nombrePaciente}
                            color="primary"
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <DetailItem
                            icon={LocalHospital}
                            label="MÉDICO"
                            value={nombreMedico}
                            color="secondary"
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <DetailItem
                            icon={CalendarMonth}
                            label="FECHA"
                            value={cita.fecha}
                            color="info"
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <DetailItem
                            icon={AccessTime}
                            label="HORA"
                            value={cita.hora}
                            color="warning"
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <DetailItem
                            icon={Description}
                            label="MOTIVO DE LA CITA"
                            value={cita.motivo}
                            color="success"
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
                            ID de la Cita
                        </Typography>
                        <Typography variant="body2" fontWeight={500}>
                            {cita.id}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
                        <Typography variant="body2" color="text.secondary" fontWeight={600}>
                            Estado
                        </Typography>
                        <Chip
                            label={cita.estado}
                            color={getEstadoColor(cita.estado)}
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

export default CitaDetail;