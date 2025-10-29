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
    Chip,
    Grid,
    IconButton,
    Paper,
} from '@mui/material';
import { Close, Person, Email, Phone, Home, Cake, Wc } from '@mui/icons-material';

const DetailItem = ({ icon: Icon, label, value }) => (
    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
        <Box
            sx={{
                width: 40,
                height: 40,
                borderRadius: 2,
                bgcolor: 'primary.light',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Icon sx={{ color: 'primary.main', fontSize: 20 }} />
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

const PacienteDetail = ({ open, onClose, paciente }) => {
    if (!paciente) return null;

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                        Detalle del Paciente
                    </Typography>
                    <Chip
                        label={paciente.estado}
                        color={paciente.estado === 'activo' ? 'success' : 'default'}
                        size="small"
                        sx={{ fontWeight: 600 }}
                    />
                </Box>
                <IconButton onClick={onClose}>
                    <Close />
                </IconButton>
            </DialogTitle>

            <DialogContent dividers>
                <Paper sx={{ p: 3, mb: 3, bgcolor: 'primary.lighter' }}>
                    <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
                        {paciente.nombres} {paciente.apellidos}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 500 }}>
                        DNI: {paciente.dni}
                    </Typography>
                </Paper>

                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <DetailItem
                            icon={Person}
                            label="NOMBRES COMPLETOS"
                            value={`${paciente.nombres} ${paciente.apellidos}`}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <DetailItem
                            icon={Cake}
                            label="FECHA DE NACIMIENTO"
                            value={paciente.fechaNacimiento}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <DetailItem
                            icon={Wc}
                            label="SEXO"
                            value={paciente.sexo === 'M' ? 'Masculino' : 'Femenino'}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <DetailItem
                            icon={Phone}
                            label="TELÉFONO"
                            value={paciente.telefono}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <DetailItem
                            icon={Email}
                            label="CORREO ELECTRÓNICO"
                            value={paciente.correo}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <DetailItem
                            icon={Home}
                            label="DIRECCIÓN"
                            value={paciente.direccion}
                        />
                    </Grid>
                </Grid>

                <Divider sx={{ my: 3 }} />

                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                    Información Adicional
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
                        <Typography variant="body2" color="text.secondary" fontWeight={600}>
                            ID del Sistema
                        </Typography>
                        <Typography variant="body2" fontWeight={500}>
                            {paciente.id}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
                        <Typography variant="body2" color="text.secondary" fontWeight={600}>
                            Estado
                        </Typography>
                        <Chip
                            label={paciente.estado}
                            color={paciente.estado === 'activo' ? 'success' : 'default'}
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

export default PacienteDetail;