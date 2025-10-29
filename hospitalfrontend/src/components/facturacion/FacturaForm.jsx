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
import { createFactura, updateFactura } from '../../services/facturaService';
import { getAllPacientes } from '../../services/pacienteService';
import { toast } from 'react-toastify';

const FacturaForm = ({ open, onClose, onSuccess, factura, mode }) => {
    const [formData, setFormData] = useState({
        idPaciente: '',
        fecha: '',
        montoTotal: 0,
        estado: 'pendiente',
    });
    const [pacientes, setPacientes] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (open) {
            loadPacientes();
        }
    }, [open]);

    useEffect(() => {
        if (factura && mode === 'edit') {
            setFormData({
                idPaciente: factura.idPaciente,
                fecha: factura.fecha,
                montoTotal: factura.montoTotal,
                estado: factura.estado,
            });
        } else {
            setFormData({
                idPaciente: '',
                fecha: '',
                montoTotal: 0,
                estado: 'pendiente',
            });
        }
    }, [factura, mode, open]);

    const loadPacientes = async () => {
        try {
            const response = await getAllPacientes();
            setPacientes(response.data);
        } catch (error) {
            console.error('Error al cargar pacientes');
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
                await updateFactura(factura.id, formData);
                toast.success('Factura actualizada exitosamente');
            } else {
                await createFactura(formData);
                toast.success('Factura creada exitosamente');
            }
            onSuccess();
        } catch (error) {
            toast.error('Error al guardar factura');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 2 }}>
                <Box>
                    <span style={{ fontSize: '1.5rem', fontWeight: 700 }}>
                        {mode === 'edit' ? 'Editar Factura' : 'Nueva Factura'}
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

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Fecha de Emisión"
                                name="fecha"
                                type="date"
                                value={formData.fecha}
                                onChange={handleChange}
                                InputLabelProps={{ shrink: true }}
                                required
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Monto Total"
                                name="montoTotal"
                                type="number"
                                value={formData.montoTotal}
                                onChange={handleChange}
                                InputProps={{
                                    startAdornment: <span style={{ marginRight: 8 }}>S/</span>,
                                }}
                                required
                            />
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
                                <MenuItem value="pendiente">Pendiente</MenuItem>
                                <MenuItem value="pagada">Pagada</MenuItem>
                                <MenuItem value="anulada">Anulada</MenuItem>
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

export default FacturaForm;