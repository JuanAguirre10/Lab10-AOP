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
    List,
    ListItem,
    ListItemText,
    CircularProgress,
} from '@mui/material';
import { 
    Close, 
    Person, 
    LocalHospital, 
    CalendarMonth, 
    AccessTime, 
    Description, 
    Notes,
    Medication,
    HealthAndSafety,
} from '@mui/icons-material';
import { getPacienteById } from '../../services/pacienteService';
import { getMedicoById } from '../../services/medicoService';
import { getDiagnosticosByConsulta } from '../../services/diagnosticoService';
import { getRecetasByConsulta } from '../../services/recetaService';
import { getDetallesRecetaByReceta } from '../../services/detalleRecetaService';

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

const ConsultaDetail = ({ open, onClose, consulta }) => {
    const [paciente, setPaciente] = useState(null);
    const [medico, setMedico] = useState(null);
    const [diagnosticos, setDiagnosticos] = useState([]);
    const [recetas, setRecetas] = useState([]);
    const [detallesRecetas, setDetallesRecetas] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (consulta && open) {
            loadData();
        }
    }, [consulta, open]);

    const loadData = async () => {
        if (!consulta) return;
        
        setLoading(true);
        try {
            const [pacienteRes, medicoRes, diagnosticosRes, recetasRes] = await Promise.all([
                getPacienteById(consulta.idPaciente).catch(() => null),
                getMedicoById(consulta.idMedico).catch(() => null),
                getDiagnosticosByConsulta(consulta.id).catch(() => ({ data: [] })),
                getRecetasByConsulta(consulta.id).catch(() => ({ data: [] })),
            ]);
            
            setPaciente(pacienteRes?.data);
            setMedico(medicoRes?.data);
            setDiagnosticos(diagnosticosRes.data || []);
            setRecetas(recetasRes.data || []);

            // Cargar detalles de cada receta
            if (recetasRes.data && recetasRes.data.length > 0) {
                const detallesPromises = recetasRes.data.map(receta => 
                    getDetallesRecetaByReceta(receta.id).catch(() => ({ data: [] }))
                );
                const detallesResults = await Promise.all(detallesPromises);
                
                const detallesMap = {};
                recetasRes.data.forEach((receta, index) => {
                    detallesMap[receta.id] = detallesResults[index].data || [];
                });
                setDetallesRecetas(detallesMap);
            }
        } catch (error) {
            console.error('Error cargando datos:', error);
        } finally {
            setLoading(false);
        }
    };

    if (!consulta) return null;

    const nombrePaciente = paciente 
        ? `${paciente.nombres} ${paciente.apellidos}` 
        : consulta.nombrePaciente || consulta.idPaciente;

    const nombreMedico = medico 
        ? `Dr(a). ${medico.nombres} ${medico.apellidos}` 
        : consulta.nombreMedico || consulta.idMedico;

    return (
        <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 2 }}>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                    Detalle de la Consulta Médica
                </Typography>
                <IconButton onClick={onClose}>
                    <Close />
                </IconButton>
            </DialogTitle>

            <DialogContent dividers>
                <Paper sx={{ p: 3, mb: 3, bgcolor: 'warning.lighter' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                        <Description sx={{ fontSize: 40, color: 'warning.main' }} />
                        <Box>
                            <Typography variant="h5" sx={{ fontWeight: 700 }}>
                                Consulta Médica
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                {consulta.fecha} - {consulta.hora}
                            </Typography>
                        </Box>
                    </Box>
                </Paper>

                <Grid container spacing={3}>
                    {/* Información básica */}
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
                            value={consulta.fecha}
                            color="info"
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <DetailItem
                            icon={AccessTime}
                            label="HORA"
                            value={consulta.hora}
                            color="warning"
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <DetailItem
                            icon={Description}
                            label="MOTIVO DE CONSULTA"
                            value={consulta.motivoConsulta}
                            color="success"
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <DetailItem
                            icon={Notes}
                            label="OBSERVACIONES"
                            value={consulta.observaciones}
                            color="error"
                        />
                    </Grid>
                </Grid>

                <Divider sx={{ my: 3 }} />

                {/* Diagnósticos */}
                <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        <HealthAndSafety sx={{ color: 'error.main', fontSize: 28 }} />
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                            Diagnósticos
                        </Typography>
                        <Chip label={diagnosticos.length} color="error" size="small" />
                    </Box>

                    {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                            <CircularProgress />
                        </Box>
                    ) : diagnosticos.length > 0 ? (
                        <List>
                            {diagnosticos.map((diagnostico, index) => (
                                <ListItem 
                                    key={diagnostico.id}
                                    sx={{ 
                                        bgcolor: 'error.lighter', 
                                        borderRadius: 2, 
                                        mb: 1,
                                        border: '2px solid',
                                        borderColor: 'error.light',
                                    }}
                                >
                                    <ListItemText
                                        primary={
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Typography variant="body1" sx={{ fontWeight: 700 }}>
                                                    Diagnóstico {index + 1}
                                                </Typography>
                                                <Chip 
                                                    label={diagnostico.tipo} 
                                                    size="small" 
                                                    color="error"
                                                    sx={{ textTransform: 'capitalize' }}
                                                />
                                            </Box>
                                        }
                                        secondary={
                                            <Typography variant="body2" sx={{ mt: 1 }}>
                                                {diagnostico.descripcion}
                                            </Typography>
                                        }
                                    />
                                </ListItem>
                            ))}
                        </List>
                    ) : (
                        <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'grey.100' }}>
                            <Typography color="text.secondary">
                                No hay diagnósticos registrados para esta consulta
                            </Typography>
                        </Paper>
                    )}
                </Box>

                <Divider sx={{ my: 3 }} />

                {/* Recetas Médicas */}
                <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        <Medication sx={{ color: 'success.main', fontSize: 28 }} />
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                            Recetas Médicas
                        </Typography>
                        <Chip label={recetas.length} color="success" size="small" />
                    </Box>

                    {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                            <CircularProgress />
                        </Box>
                    ) : recetas.length > 0 ? (
                        recetas.map((receta, index) => (
                            <Paper 
                                key={receta.id} 
                                sx={{ 
                                    p: 3, 
                                    mb: 2,
                                    bgcolor: 'success.lighter',
                                    border: '2px solid',
                                    borderColor: 'success.light',
                                }}
                            >
                                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                                    📋 Receta Médica {index + 1}
                                </Typography>
                                
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, fontWeight: 600 }}>
                                    <strong>Indicaciones:</strong> {receta.indicaciones}
                                </Typography>

                                {detallesRecetas[receta.id] && detallesRecetas[receta.id].length > 0 && (
                                    <Box sx={{ mt: 2 }}>
                                        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                                            💊 Medicamentos:
                                        </Typography>
                                        <List dense>
                                            {detallesRecetas[receta.id].map((detalle) => (
                                                <ListItem 
                                                    key={detalle.id}
                                                    sx={{ 
                                                        bgcolor: 'white', 
                                                        borderRadius: 1, 
                                                        mb: 1,
                                                        border: '1px solid',
                                                        borderColor: 'success.main',
                                                    }}
                                                >
                                                    <ListItemText
                                                        primary={
                                                            <Typography variant="body1" sx={{ fontWeight: 700 }}>
                                                                {detalle.medicamento}
                                                            </Typography>
                                                        }
                                                        secondary={
                                                            <Box sx={{ mt: 0.5 }}>
                                                                <Typography variant="body2">
                                                                    <strong>Dosis:</strong> {detalle.dosis} | 
                                                                    <strong> Frecuencia:</strong> {detalle.frecuencia} | 
                                                                    <strong> Duración:</strong> {detalle.duracion}
                                                                </Typography>
                                                            </Box>
                                                        }
                                                    />
                                                </ListItem>
                                            ))}
                                        </List>
                                    </Box>
                                )}
                            </Paper>
                        ))
                    ) : (
                        <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'grey.100' }}>
                            <Typography color="text.secondary">
                                No hay recetas médicas registradas para esta consulta
                            </Typography>
                        </Paper>
                    )}
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

export default ConsultaDetail;