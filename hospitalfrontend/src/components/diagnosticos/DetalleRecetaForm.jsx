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
import { createDetalleReceta, updateDetalleReceta } from '../../services/detalleRecetaService';
import { toast } from 'react-toastify';

const DetalleRecetaForm = ({ open, onClose, onSuccess, detalle, mode, recetas }) => {
    const [formData, setFormData] = useState({
        idReceta: '',
        medicamento: '',
        dosis: '',
        frecuencia: '',
        duracion: '',
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (detalle && mode === 'edit') {
            setFormData(detalle);
        } else {
            setFormData({
                idReceta: '',
                medicamento: '',
                dosis: '',
                frecuencia: '',
                duracion: '',
            });
        }
    }, [detalle, mode, open]);

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
                await updateDetalleReceta(detalle.id, formData);
                toast.success('Medicamento actualizado exitosamente');
            } else {
                await createDetalleReceta(formData);
                toast.success('Medicamento agregado exitosamente');
            }
            onSuccess();
        } catch (error) {
            toast.error('Error al guardar medicamento');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 2 }}>
                <Box>
                    <span style={{ fontSize: '1.5rem', fontWeight: 700 }}>
                        {mode === 'edit' ? 'Editar Medicamento' : 'Nuevo Medicamento'}
                    </span>
                </Box>
                <IconButton onClick={onClose}>
                    <Close />
                </IconButton>
            </DialogTitle>

            <form onSubmit={handleSubmit}>
                <DialogContent dividers>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Autocomplete
                                options={recetas}
                                getOptionLabel={(option) => `Receta ${option.id.substring(0, 8)} - ${option.indicaciones.substring(0, 50)}...`}
                                value={recetas.find(r => r.id === formData.idReceta) || null}
                                onChange={(e, newValue) => {
                                    setFormData({ ...formData, idReceta: newValue?.id || '' });
                                }}
                                renderInput={(params) => (
                                    <TextField {...params} label="Receta Médica" required />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Medicamento"
                                name="medicamento"
                                value={formData.medicamento}
                                onChange={handleChange}
                                placeholder="Ej: Paracetamol 500mg"
                                required
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Dosis"
                                name="dosis"
                                value={formData.dosis}
                                onChange={handleChange}
                                placeholder="Ej: 1 tableta"
                                required
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Frecuencia"
                                name="frecuencia"
                                value={formData.frecuencia}
                                onChange={handleChange}
                                placeholder="Ej: Cada 8 horas"
                                required
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Duración del Tratamiento"
                                name="duracion"
                                value={formData.duracion}
                                onChange={handleChange}
                                placeholder="Ej: 7 días"
                                required
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

export default DetalleRecetaForm;