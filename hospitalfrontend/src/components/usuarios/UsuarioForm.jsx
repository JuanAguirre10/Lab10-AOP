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
    FormControlLabel,
    Switch,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { createUsuario, updateUsuario } from '../../services/usuarioService';
import { toast } from 'react-toastify';

const UsuarioForm = ({ open, onClose, onSuccess, usuario, mode }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        rol: 'recepcionista',
        activo: true,
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (usuario && mode === 'edit') {
            setFormData({
                ...usuario,
                password: '', // No mostrar la contraseña al editar
            });
        } else {
            setFormData({
                username: '',
                password: '',
                email: '',
                rol: 'recepcionista',
                activo: true,
            });
        }
    }, [usuario, mode, open]);

    const handleChange = (e) => {
        const { name, value, checked } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'activo' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Si estamos editando y no se ingresó nueva contraseña, eliminarla del objeto
            const dataToSend = { ...formData };
            if (mode === 'edit' && !dataToSend.password) {
                delete dataToSend.password;
            }

            if (mode === 'edit') {
                await updateUsuario(usuario.id, dataToSend);
                toast.success('Usuario actualizado exitosamente');
            } else {
                await createUsuario(dataToSend);
                toast.success('Usuario creado exitosamente');
            }
            onSuccess();
        } catch (error) {
            toast.error('Error al guardar usuario');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 2 }}>
                <Box>
                    <span style={{ fontSize: '1.5rem', fontWeight: 700 }}>
                        {mode === 'edit' ? 'Editar Usuario' : 'Nuevo Usuario'}
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
                                label="Nombre de Usuario"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label={mode === 'edit' ? 'Nueva Contraseña (opcional)' : 'Contraseña'}
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                required={mode === 'create'}
                                helperText={mode === 'edit' ? 'Dejar vacío para mantener la actual' : ''}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                select
                                label="Rol"
                                name="rol"
                                value={formData.rol}
                                onChange={handleChange}
                                required
                            >
                                <MenuItem value="admin">Administrador</MenuItem>
                                <MenuItem value="medico">Médico</MenuItem>
                                <MenuItem value="recepcionista">Recepcionista</MenuItem>
                            </TextField>
                        </Grid>

                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={formData.activo}
                                        onChange={handleChange}
                                        name="activo"
                                        color="primary"
                                    />
                                }
                                label="Usuario Activo"
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

export default UsuarioForm;