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
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { createPaciente, updatePaciente } from '../../services/pacienteService';
import { toast } from 'react-toastify';

const PacienteForm = ({ open, onClose, onSuccess, paciente, mode }) => {
    const [formData, setFormData] = useState({
        dni: '',
        nombres: '',
        apellidos: '',
        fechaNacimiento: '',
        sexo: '',
        direccion: '',
        telefono: '',
        correo: '',
        estado: 'activo',
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (paciente && mode === 'edit') {
            setFormData(paciente);
        } else {
            setFormData({
                dni: '',
                nombres: '',
                apellidos: '',
                fechaNacimiento: '',
                sexo: '',
                direccion: '',
                telefono: '',
                correo: '',
                estado: 'activo',
            });
        }
    }, [paciente, mode, open]);

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
                await updatePaciente(paciente.id, formData);
                toast.success('Paciente actualizado exitosamente');
            } else {
                await createPaciente(formData);
                toast.success('Paciente creado exitosamente');
            }
            onSuccess();
        } catch (error) {
            toast.error('Error al guardar paciente');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 2 }}>
                <Box>
                    <span style={{ fontSize: '1.5rem', fontWeight: 700 }}>
                        {mode === 'edit' ? 'Editar Paciente' : 'Nuevo Paciente'}
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
                            <TextField
                                fullWidth
                                label="DNI"
                                name="dni"
                                value={formData.dni}
                                onChange={handleChange}
                                required
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Nombres"
                                name="nombres"
                                value={formData.nombres}
                                onChange={handleChange}
                                required
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Apellidos"
                                name="apellidos"
                                value={formData.apellidos}
                                onChange={handleChange}
                                required
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Fecha de Nacimiento"
                                name="fechaNacimiento"
                                type="date"
                                value={formData.fechaNacimiento}
                                onChange={handleChange}
                                InputLabelProps={{ shrink: true }}
                                required
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                select
                                label="Sexo"
                                name="sexo"
                                value={formData.sexo}
                                onChange={handleChange}
                                required
                            >
                                <MenuItem value="M">Masculino</MenuItem>
                                <MenuItem value="F">Femenino</MenuItem>
                            </TextField>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Teléfono"
                                name="telefono"
                                value={formData.telefono}
                                onChange={handleChange}
                                required
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Dirección"
                                name="direccion"
                                value={formData.direccion}
                                onChange={handleChange}
                                required
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Correo Electrónico"
                                name="correo"
                                type="email"
                                value={formData.correo}
                                onChange={handleChange}
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
                                <MenuItem value="inactivo">Inactivo</MenuItem>
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

export default PacienteForm;