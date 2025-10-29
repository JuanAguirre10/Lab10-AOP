import React, { useState } from 'react';
import {
    Paper,
    Grid,
    TextField,
    MenuItem,
    Button,
} from '@mui/material';
import { Search, Clear } from '@mui/icons-material';

const AuditoriaFiltros = ({ onFiltrar }) => {
    const [filtros, setFiltros] = useState({
        usuario: '',
        accion: '',
        tabla: '',
        fechaInicio: '',
        fechaFin: '',
    });

    const handleChange = (e) => {
        setFiltros({
            ...filtros,
            [e.target.name]: e.target.value,
        });
    };

    const aplicar = () => {
        onFiltrar(filtros);
    };

    const limpiar = () => {
        setFiltros({
            usuario: '',
            accion: '',
            tabla: '',
            fechaInicio: '',
            fechaFin: '',
        });
        onFiltrar({});
    };

    return (
        <Paper sx={{ p: 3, mb: 3 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        fullWidth
                        label="Usuario"
                        name="usuario"
                        value={filtros.usuario}
                        onChange={handleChange}
                        size="small"
                        placeholder="Ej: admin"
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={2}>
                    <TextField
                        fullWidth
                        select
                        label="Acción"
                        name="accion"
                        value={filtros.accion}
                        onChange={handleChange}
                        size="small"
                    >
                        <MenuItem value="">Todas</MenuItem>
                        <MenuItem value="CREATE">CREATE</MenuItem>
                        <MenuItem value="UPDATE">UPDATE</MenuItem>
                        <MenuItem value="DELETE">DELETE</MenuItem>
                    </TextField>
                </Grid>

                <Grid item xs={12} sm={6} md={2}>
                    <TextField
                        fullWidth
                        select
                        label="Tabla"
                        name="tabla"
                        value={filtros.tabla}
                        onChange={handleChange}
                        size="small"
                    >
                        <MenuItem value="">Todas</MenuItem>
                        <MenuItem value="pacientes">Pacientes</MenuItem>
                        <MenuItem value="medicos">Médicos</MenuItem>
                        <MenuItem value="citas">Citas</MenuItem>
                        <MenuItem value="consultas">Consultas</MenuItem>
                        <MenuItem value="hospitalizaciones">Hospitalizaciones</MenuItem>
                        <MenuItem value="habitaciones">Habitaciones</MenuItem>
                        <MenuItem value="facturas">Facturas</MenuItem>
                        <MenuItem value="usuarios">Usuarios</MenuItem>
                    </TextField>
                </Grid>

                <Grid item xs={12} sm={6} md={2}>
                    <TextField
                        fullWidth
                        type="date"
                        label="Fecha Inicio"
                        name="fechaInicio"
                        value={filtros.fechaInicio}
                        onChange={handleChange}
                        size="small"
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={2}>
                    <TextField
                        fullWidth
                        type="date"
                        label="Fecha Fin"
                        name="fechaFin"
                        value={filtros.fechaFin}
                        onChange={handleChange}
                        size="small"
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>

                <Grid item xs={12} md={1}>
                    <Button
                        fullWidth
                        variant="contained"
                        startIcon={<Search />}
                        onClick={aplicar}
                        sx={{ height: '40px' }}
                    >
                        Filtrar
                    </Button>
                </Grid>

                <Grid item xs={12}>
                    <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<Clear />}
                        onClick={limpiar}
                    >
                        Limpiar Filtros
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default AuditoriaFiltros;