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
import { createReceta, updateReceta } from '../../services/recetaService';
import { toast } from 'react-toastify';

const RecetaForm = ({ open, onClose, onSuccess, receta, mode, consultas }) => {
    const [formData, setFormData] = useState({
        idConsulta: '',
        indicaciones: '',
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (receta && mode === 'edit') {
            setFormData(receta);
        } else {
            setFormData({
                idConsulta: '',
                indicaciones: '',
            });
        }
    }, [receta, mode, open]);

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
                await updateReceta(receta.id, formData);
                toast.success('Receta actualizada exitosamente');
            } else {
                await createReceta(formData);
                toast.success('Receta creada exitosamente');
            }
            onSuccess();
        } catch (error) {
            toast.error('Error al guardar receta');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 2 }}>
                <Box>
                    <span style={{ fontSize: '1.5rem', fontWeight: 700 }}>
                        {mode === 'edit' ? 'Editar Receta Médica' : 'Nueva Receta Médica'}
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
                                options={consultas}
                                getOptionLabel={(option) => `Consulta ${option.fecha} - ${option.hora}`}
                                value={consultas.find(c => c.id === formData.idConsulta) || null}
                                onChange={(e, newValue) => {
                                    setFormData({ ...formData, idConsulta: newValue?.id || '' });
                                }}
                                renderInput={(params) => (
                                    <TextField {...params} label="Consulta" required />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Indicaciones Generales"
                                name="indicaciones"
                                value={formData.indicaciones}
                                onChange={handleChange}
                                multiline
                                rows={4}
                                placeholder="Ej: Tomar con abundante agua, evitar alcohol, etc."
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

export default RecetaForm;