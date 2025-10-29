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
import { createDiagnostico, updateDiagnostico } from '../../services/diagnosticoService';
import { toast } from 'react-toastify';

const DiagnosticoForm = ({ open, onClose, onSuccess, diagnostico, mode, consultas }) => {
    const [formData, setFormData] = useState({
        idConsulta: '',
        descripcion: '',
        tipo: 'principal',
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (diagnostico && mode === 'edit') {
            setFormData(diagnostico);
        } else {
            setFormData({
                idConsulta: '',
                descripcion: '',
                tipo: 'principal',
            });
        }
    }, [diagnostico, mode, open]);

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
                await updateDiagnostico(diagnostico.id, formData);
                toast.success('Diagnóstico actualizado exitosamente');
            } else {
                await createDiagnostico(formData);
                toast.success('Diagnóstico creado exitosamente');
            }
            onSuccess();
        } catch (error) {
            toast.error('Error al guardar diagnóstico');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 2 }}>
                <Box>
                    <span style={{ fontSize: '1.5rem', fontWeight: 700 }}>
                        {mode === 'edit' ? 'Editar Diagnóstico' : 'Nuevo Diagnóstico'}
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
                                label="Descripción del Diagnóstico"
                                name="descripcion"
                                value={formData.descripcion}
                                onChange={handleChange}
                                multiline
                                rows={4}
                                required
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                select
                                label="Tipo de Diagnóstico"
                                name="tipo"
                                value={formData.tipo}
                                onChange={handleChange}
                                required
                            >
                                <MenuItem value="principal">Principal</MenuItem>
                                <MenuItem value="secundario">Secundario</MenuItem>
                                <MenuItem value="diferencial">Diferencial</MenuItem>
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

export default DiagnosticoForm;