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
import { createHabitacion, updateHabitacion } from '../../services/habitacionService';
import { toast } from 'react-toastify';

const HabitacionForm = ({ open, onClose, onSuccess, habitacion, mode }) => {
    const [formData, setFormData] = useState({
        numero: '',
        tipo: 'individual',
        estado: 'disponible',
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (habitacion && mode === 'edit') {
            setFormData(habitacion);
        } else {
            setFormData({
                numero: '',
                tipo: 'individual',
                estado: 'disponible',
            });
        }
    }, [habitacion, mode, open]);

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
                await updateHabitacion(habitacion.id, formData);
                toast.success('Habitación actualizada exitosamente');
            } else {
                await createHabitacion(formData);
                toast.success('Habitación creada exitosamente');
            }
            onSuccess();
        } catch (error) {
            toast.error('Error al guardar habitación');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 2 }}>
                <Box>
                    <span style={{ fontSize: '1.5rem', fontWeight: 700 }}>
                        {mode === 'edit' ? 'Editar Habitación' : 'Nueva Habitación'}
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
                            <TextField
                                fullWidth
                                label="Número de Habitación"
                                name="numero"
                                value={formData.numero}
                                onChange={handleChange}
                                placeholder="Ej: 101, 205, UCI-01"
                                required
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                select
                                label="Tipo de Habitación"
                                name="tipo"
                                value={formData.tipo}
                                onChange={handleChange}
                                required
                            >
                                <MenuItem value="individual">Individual</MenuItem>
                                <MenuItem value="doble">Doble</MenuItem>
                                <MenuItem value="uci">UCI</MenuItem>
                                <MenuItem value="pediatria">Pediatría</MenuItem>
                                <MenuItem value="emergencia">Emergencia</MenuItem>
                            </TextField>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                select
                                label="Estado"
                                name="estado"
                                value={formData.estado}
                                onChange={handleChange}
                                required
                            >
                                <MenuItem value="disponible">Disponible</MenuItem>
                                <MenuItem value="ocupada">Ocupada</MenuItem>
                                <MenuItem value="mantenimiento">Mantenimiento</MenuItem>
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

export default HabitacionForm;