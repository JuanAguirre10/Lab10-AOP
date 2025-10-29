import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box,
    Typography,
    Divider,
    Chip,
    Grid,
    IconButton,
    Paper,
    Avatar,
} from '@mui/material';
import { Close, Person, Email, Badge, AdminPanelSettings } from '@mui/icons-material';

const getRolColor = (rol) => {
    switch (rol) {
        case 'admin':
            return 'error';
        case 'medico':
            return 'primary';
        case 'recepcionista':
            return 'info';
        default:
            return 'default';
    }
};

const DetailItem = ({ icon: Icon, label, value, color = 'primary' }) => (
    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
        <Box
            sx={{
                width: 40,
                height: 40,
                borderRadius: 2,
                bgcolor: `${color}.light`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Icon sx={{ color: `${color}.main`, fontSize: 20 }} />
        </Box>
        <Box sx={{ flex: 1 }}>
            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                {label}
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {value || 'No especificado'}
            </Typography>
        </Box>
    </Box>
);

const UsuarioDetail = ({ open, onClose, usuario }) => {
    if (!usuario) return null;

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                        Detalle del Usuario
                    </Typography>
                    <Chip
                        label={usuario.activo ? 'Activo' : 'Inactivo'}
                        color={usuario.activo ? 'success' : 'default'}
                        size="small"
                        sx={{ fontWeight: 600 }}
                    />
                </Box>
                <IconButton onClick={onClose}>
                    <Close />
                </IconButton>
            </DialogTitle>

            <DialogContent dividers>
                <Paper sx={{ p: 3, mb: 3, bgcolor: 'secondary.lighter' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 2 }}>
                        <Avatar 
                            sx={{ 
                                width: 80, 
                                height: 80, 
                                bgcolor: 'secondary.main',
                                fontSize: '2rem',
                                fontWeight: 900,
                            }}
                        >
                            {usuario.username?.charAt(0).toUpperCase()}
                        </Avatar>
                        <Box>
                            <Typography variant="h4" sx={{ fontWeight: 800 }}>
                                {usuario.username}
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 500 }}>
                                {usuario.email}
                            </Typography>
                            <Box sx={{ mt: 1 }}>
                                <Chip
                                    label={usuario.rol}
                                    color={getRolColor(usuario.rol)}
                                    size="small"
                                    sx={{ fontWeight: 600, textTransform: 'capitalize' }}
                                />
                            </Box>
                        </Box>
                    </Box>
                </Paper>

                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <DetailItem
                            icon={Person}
                            label="NOMBRE DE USUARIO"
                            value={usuario.username}
                            color="primary"
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <DetailItem
                            icon={Email}
                            label="CORREO ELECTRÓNICO"
                            value={usuario.email}
                            color="secondary"
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <DetailItem
                            icon={AdminPanelSettings}
                            label="ROL"
                            value={usuario.rol}
                            color="warning"
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <DetailItem
                            icon={Badge}
                            label="ESTADO"
                            value={usuario.activo ? 'Activo' : 'Inactivo'}
                            color="success"
                        />
                    </Grid>
                </Grid>

                <Divider sx={{ my: 3 }} />

                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                    Información del Sistema
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
                        <Typography variant="body2" color="text.secondary" fontWeight={600}>
                            ID del Usuario
                        </Typography>
                        <Typography variant="body2" fontWeight={500}>
                            {usuario.id}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
                        <Typography variant="body2" color="text.secondary" fontWeight={600}>
                            Rol Asignado
                        </Typography>
                        <Chip
                            label={usuario.rol}
                            color={getRolColor(usuario.rol)}
                            size="small"
                            sx={{ textTransform: 'capitalize' }}
                        />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
                        <Typography variant="body2" color="text.secondary" fontWeight={600}>
                            Estado
                        </Typography>
                        <Chip
                            label={usuario.activo ? 'Activo' : 'Inactivo'}
                            color={usuario.activo ? 'success' : 'default'}
                            size="small"
                        />
                    </Box>
                </Box>
            </DialogContent>

            <DialogActions sx={{ px: 3, py: 2 }}>
                <Button onClick={onClose} variant="contained">
                    Cerrar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default UsuarioDetail;