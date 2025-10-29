import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Grid,
    Box,
    IconButton,
    Autocomplete,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { createConsulta, updateConsulta } from '../../services/consultaService';
import { getAllPacientes } from '../../services/pacienteService';
import { getAllMedicos } from '../../services/medicoService';
import { getAllCitas } from '../../services/citaService';
import { toast } from 'react-toastify';

const ConsultaForm = ({ open, onClose, onSuccess, consulta, mode }) => {
    const [formData, setFormData] = useState({
        idCita: '',
        idMedico: '',
        idPaciente: '',
        fecha: '',
        hora: '',
        motivoConsulta: '',
        observaciones: '',
    });
    const [pacientes, setPacientes] = useState([]);
    const [medicos, setMedicos] = useState([]);
    const [citas, setCitas] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (open) {
            loadData();
        }
    }, [open]);

    useEffect(() => {
        if (consulta && mode === 'edit') {
            setFormData(consulta);
        } else {
            setFormData({
                idCita: '',
                idMedico: '',
                idPaciente: '',
                fecha: '',
                hora: '',
                motivoConsulta: '',
                observaciones: '',
            });
        }
    }, [consulta, mode, open]);

    const loadData = async () => {
        try {
            const [pacientesRes, medicosRes, citasRes] = await Promise.all([
                getAllPacientes(),
                getAllMedicos(),
                getAllCitas(),
            ]);
            setPacientes(pacientesRes.data);
            setMedicos(medicosRes.data);
            setCitas(citasRes.data);
        } catch (error) {
            console.error('Error al cargar datos');
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (mode === 'edit') {
                await updateConsulta(consulta.id, formData);
                toast.success('Consulta actualizada exitosamente');
            } else {
                await createConsulta(formData);
                toast.success('Consulta creada exitosamente');
            }
            onSuccess();
        } catch (error) {
            toast.error('Error al guardar consulta');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 2 }}>
                <Box>
                    <span style={{ fontSize: '1.5rem', fontWeight: 700 }}>
                        {mode === 'edit' ? 'Editar Consulta' : 'Nueva Consulta'}
                    </span>
                </Box>
                <IconButton onClick={onClose}>
                    <Close />
                </IconButton>
            </DialogTitle>

            <form onSubmit={handleSubmit}>
                <DialogContent dividers>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <Autocomplete
                                options={citas}
                                getOptionLabel={(option) => `Cita ${option.fecha} - ${option.motivo}`}
                                value={citas.find(c => c.id === formData.idCita) || null}
                                onChange={(e, newValue) => {
                                    setFormData({ ...formData, idCita: newValue?.id || '' });
                                }}
                                renderInput={(params) => (
                                    <TextField {...params} label="Cita" required />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Autocomplete
                                options={pacientes}
                                getOptionLabel={(option) => `${option.nombres} ${option.apellidos}`}
                                value={pacientes.find(p => p.id === formData.idPaciente) || null}
                                onChange={(e, newValue) => {
                                    setFormData({ ...formData, idPaciente: newValue?.id || '' });
                                }}
                                renderInput={(params) => (
                                    <TextField {...params} label="Paciente" required />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Autocomplete
                                options={medicos}
                                getOptionLabel={(option) => `Dr(a). ${option.nombres} ${option.apellidos}`}
                                value={medicos.find(m => m.id === formData.idMedico) || null}
                                onChange={(e, newValue) => {
                                    setFormData({ ...formData, idMedico: newValue?.id || '' });
                                }}
                                renderInput={(params) => (
                                    <TextField {...params} label="Médico" required />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Fecha"
                                name="fecha"
                                type="date"
                                value={formData.fecha}
                                onChange={handleChange}
                                InputLabelProps={{ shrink: true }}
                                required
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Hora"
                                name="hora"
                                type="time"
                                value={formData.hora}
                                onChange={handleChange}
                                InputLabelProps={{ shrink: true }}
                                required
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Motivo de Consulta"
                                name="motivoConsulta"
                                value={formData.motivoConsulta}
                                onChange={handleChange}
                                multiline
                                rows={2}
                                required
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Observaciones"
                                name="observaciones"
                                value={formData.observaciones}
                                onChange={handleChange}
                                multiline
                                rows={3}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>

                <DialogActions sx={{ px: 3, py: 2 }}>
                    <Button onClick={onClose} variant="outlined">
                        Cancelar
                    </Button>
                    <Button 
                        type="submit" 
                        variant="contained" 
                        disabled={loading}
                    >
                        {loading ? 'Guardando...' : 'Guardar'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default ConsultaForm;