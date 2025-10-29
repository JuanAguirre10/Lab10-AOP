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
import { createMedico, updateMedico } from '../../services/medicoService';
import { toast } from 'react-toastify';

const MedicoForm = ({ open, onClose, onSuccess, medico, mode }) => {
    const [formData, setFormData] = useState({
        nombres: '',
        apellidos: '',
        colegiatura: '',
        telefono: '',
        correo: '',
        estado: 'activo',
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (medico && mode === 'edit') {
            setFormData(medico);
        } else {
            setFormData({
                nombres: '',
                apellidos: '',
                colegiatura: '',
                telefono: '',
                correo: '',
                estado: 'activo',
            });
        }
    }, [medico, mode, open]);

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
                await updateMedico(medico.id, formData);
                toast.success('Médico actualizado exitosamente');
            } else {
                await createMedico(formData);
                toast.success('Médico creado exitosamente');
            }
            onSuccess();
        } catch (error) {
            toast.error('Error al guardar médico');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 2 }}>
                <Box>
                    <span style={{ fontSize: '1.5rem', fontWeight: 700 }}>
                        {mode === 'edit' ? 'Editar Médico' : 'Nuevo Médico'}
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
                                label="Número de Colegiatura"
                                name="colegiatura"
                                value={formData.colegiatura}
                                onChange={handleChange}
                                required
                            />
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

export default MedicoForm;