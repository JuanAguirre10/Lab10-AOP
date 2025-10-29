import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Grid,
    MenuItem,
    Box,
    IconButton,
    Autocomplete,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { createCita, updateCita } from '../../services/citaService';
import { getAllPacientes } from '../../services/pacienteService';
import { getAllMedicos } from '../../services/medicoService';
import { toast } from 'react-toastify';

const CitaForm = ({ open, onClose, onSuccess, cita, mode }) => {
    const [formData, setFormData] = useState({
        idPaciente: '',
        idMedico: '',
        fecha: '',
        hora: '',
        motivo: '',
        estado: 'programada',
    });
    const [pacientes, setPacientes] = useState([]);
    const [medicos, setMedicos] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (open) {
            loadPacientes();
            loadMedicos();
        }
    }, [open]);

    useEffect(() => {
        if (cita && mode === 'edit') {
            setFormData(cita);
        } else {
            setFormData({
                idPaciente: '',
                idMedico: '',
                fecha: '',
                hora: '',
                motivo: '',
                estado: 'programada',
            });
        }
    }, [cita, mode, open]);

    const loadPacientes = async () => {
        try {
            const response = await getAllPacientes();
            setPacientes(response.data);
        } catch (error) {
            console.error('Error al cargar pacientes');
        }
    };

    const loadMedicos = async () => {
        try {
            const response = await getAllMedicos();
            setMedicos(response.data);
        } catch (error) {
            console.error('Error al cargar médicos');
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
                await updateCita(cita.id, formData);
                toast.success('Cita actualizada exitosamente');
            } else {
                await createCita(formData);
                toast.success('Cita creada exitosamente');
            }
            onSuccess();
        } catch (error) {
            toast.error('Error al guardar cita');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 2 }}>
                <Box>
                    <span style={{ fontSize: '1.5rem', fontWeight: 700 }}>
                        {mode === 'edit' ? 'Editar Cita' : 'Nueva Cita'}
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
                                options={pacientes}
                                getOptionLabel={(option) => `${option.nombres} ${option.apellidos} - ${option.dni}`}
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
                                label="Motivo de la Cita"
                                name="motivo"
                                value={formData.motivo}
                                onChange={handleChange}
                                multiline
                                rows={3}
                                required
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                select
                                label="Estado"
                                name="estado"
                                value={formData.estado}
                                onChange={handleChange}
                                required
                            >
                                <MenuItem value="programada">Programada</MenuItem>
                                <MenuItem value="atendida">Atendida</MenuItem>
                                <MenuItem value="cancelada">Cancelada</MenuItem>
                            </TextField>
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

export default CitaForm;