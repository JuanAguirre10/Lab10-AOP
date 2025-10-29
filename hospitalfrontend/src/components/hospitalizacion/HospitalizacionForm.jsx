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
    MenuItem,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { createHospitalizacion, updateHospitalizacion } from '../../services/hospitalizacionService';
import { getAllPacientes } from '../../services/pacienteService';
import { getAllHabitaciones } from '../../services/habitacionService';
import { toast } from 'react-toastify';

const HospitalizacionForm = ({ open, onClose, onSuccess, hospitalizacion, mode }) => {
    const [formData, setFormData] = useState({
        idPaciente: '',
        idHabitacion: '',
        fechaIngreso: '',
        fechaAlta: '',
        diagnostico: '',
        estado: 'activo',
    });
    const [pacientes, setPacientes] = useState([]);
    const [habitaciones, setHabitaciones] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (open) {
            loadData();
        }
    }, [open]);

    useEffect(() => {
        if (hospitalizacion && mode === 'edit') {
            setFormData({
                idPaciente: hospitalizacion.idPaciente,
                idHabitacion: hospitalizacion.idHabitacion,
                fechaIngreso: hospitalizacion.fechaIngreso,
                fechaAlta: hospitalizacion.fechaAlta || '',
                diagnostico: hospitalizacion.diagnostico,
                estado: hospitalizacion.estado || 'activo',
            });
        } else {
            setFormData({
                idPaciente: '',
                idHabitacion: '',
                fechaIngreso: '',
                fechaAlta: '',
                diagnostico: '',
                estado: 'activo',
            });
        }
    }, [hospitalizacion, mode, open]);

    const loadData = async () => {
        try {
            const [pacientesRes, habitacionesRes] = await Promise.all([
                getAllPacientes(),
                getAllHabitaciones().catch(() => ({ data: [] })), // Si no existe el servicio de habitaciones
            ]);
            setPacientes(pacientesRes.data);
            setHabitaciones(habitacionesRes.data);
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
                await updateHospitalizacion(hospitalizacion.id, formData);
                toast.success('Hospitalización actualizada exitosamente');
            } else {
                await createHospitalizacion(formData);
                toast.success('Hospitalización creada exitosamente');
            }
            onSuccess();
        } catch (error) {
            toast.error('Error al guardar hospitalización');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 2 }}>
                <Box>
                    <span style={{ fontSize: '1.5rem', fontWeight: 700 }}>
                        {mode === 'edit' ? 'Editar Hospitalización' : 'Nueva Hospitalización'}
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
                            {habitaciones.length > 0 ? (
                                <Autocomplete
                                    options={habitaciones}
                                    getOptionLabel={(option) => `Habitación ${option.numero} - ${option.tipo}`}
                                    value={habitaciones.find(h => h.id === formData.idHabitacion) || null}
                                    onChange={(e, newValue) => {
                                        setFormData({ ...formData, idHabitacion: newValue?.id || '' });
                                    }}
                                    renderInput={(params) => (
                                        <TextField {...params} label="Habitación" required />
                                    )}
                                />
                            ) : (
                                <TextField
                                    fullWidth
                                    label="ID Habitación"
                                    name="idHabitacion"
                                    value={formData.idHabitacion}
                                    onChange={handleChange}
                                    required
                                />
                            )}
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Fecha de Ingreso"
                                name="fechaIngreso"
                                type="date"
                                value={formData.fechaIngreso}
                                onChange={handleChange}
                                InputLabelProps={{ shrink: true }}
                                required
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Fecha de Alta"
                                name="fechaAlta"
                                type="date"
                                value={formData.fechaAlta}
                                onChange={handleChange}
                                InputLabelProps={{ shrink: true }}
                                helperText="Opcional - Dejar vacío si está en curso"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Diagnóstico de Ingreso"
                                name="diagnostico"
                                value={formData.diagnostico}
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
                                <MenuItem value="activo">Activo</MenuItem>
                                <MenuItem value="alta">Alta</MenuItem>
                                <MenuItem value="transferido">Transferido</MenuItem>
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

export default HospitalizacionForm;