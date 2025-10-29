import React, { useState, useEffect } from 'react';
import { 
    Box, 
    Button, 
    TextField, 
    InputAdornment,
    Chip,
    MenuItem,
} from '@mui/material';
import { 
    Add, 
    Search, 
} from '@mui/icons-material';
import Layout from '../components/layout/Layout';
import { getAllHabitaciones, deleteHabitacion } from '../services/habitacionService';
import { toast } from 'react-toastify';
import HabitacionTable from '../components/habitaciones/HabitacionTable';
import HabitacionForm from '../components/habitaciones/HabitacionForm';

const HabitacionesPage = () => {
    const [habitaciones, setHabitaciones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterEstado, setFilterEstado] = useState('todos');
    const [openForm, setOpenForm] = useState(false);
    const [selectedHabitacion, setSelectedHabitacion] = useState(null);
    const [mode, setMode] = useState('create');

    useEffect(() => {
        loadHabitaciones();
    }, []);

    const loadHabitaciones = async () => {
        try {
            setLoading(true);
            const response = await getAllHabitaciones();
            setHabitaciones(response.data || []);
        } catch (error) {
            toast.error('Error al cargar habitaciones');
            setHabitaciones([]);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = () => {
        setMode('create');
        setSelectedHabitacion(null);
        setOpenForm(true);
    };

    const handleEdit = (habitacion) => {
        setMode('edit');
        setSelectedHabitacion(habitacion);
        setOpenForm(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Está seguro de eliminar esta habitación?')) {
            try {
                await deleteHabitacion(id);
                toast.success('Habitación eliminada exitosamente');
                loadHabitaciones();
            } catch (error) {
                toast.error('Error al eliminar habitación');
            }
        }
    };

    const handleCloseForm = () => {
        setOpenForm(false);
        setSelectedHabitacion(null);
    };

    const handleSuccess = () => {
        loadHabitaciones();
        handleCloseForm();
    };

    const filteredHabitaciones = habitaciones.filter(h => {
        const matchSearch = 
            h.numero?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            h.tipo?.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchEstado = filterEstado === 'todos' || h.estado === filterEstado;
        
        return matchSearch && matchEstado;
    });

    return (
        <Layout>
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                        <h2 style={{ margin: 0, fontSize: '2rem', fontWeight: 900 }}>Habitaciones</h2>
                        <Chip 
                            label={`${filteredHabitaciones.length} registros`} 
                            color="info" 
                            size="small"
                        />
                    </Box>
                    <p style={{ margin: 0, color: '#64748b', fontSize: '1.1rem' }}>
                        Gestión de habitaciones del hospital
                    </p>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    size="large"
                    onClick={handleCreate}
                    sx={{ 
                        px: 3,
                        py: 1.5,
                        fontWeight: 700,
                    }}
                >
                    Nueva Habitación
                </Button>
            </Box>

            <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
                <TextField
                    fullWidth
                    placeholder="Buscar por número o tipo..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search />
                            </InputAdornment>
                        ),
                    }}
                    sx={{ maxWidth: 500 }}
                />
                <TextField
                    select
                    value={filterEstado}
                    onChange={(e) => setFilterEstado(e.target.value)}
                    sx={{ minWidth: 200 }}
                >
                    <MenuItem value="todos">Todos los estados</MenuItem>
                    <MenuItem value="disponible">Disponible</MenuItem>
                    <MenuItem value="ocupada">Ocupada</MenuItem>
                    <MenuItem value="mantenimiento">Mantenimiento</MenuItem>
                </TextField>
            </Box>

            <HabitacionTable
                habitaciones={filteredHabitaciones}
                loading={loading}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <HabitacionForm
                open={openForm}
                onClose={handleCloseForm}
                onSuccess={handleSuccess}
                habitacion={selectedHabitacion}
                mode={mode}
            />
        </Layout>
    );
};

export default HabitacionesPage;