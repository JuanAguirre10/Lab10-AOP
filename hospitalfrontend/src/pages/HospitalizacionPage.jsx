import React, { useState, useEffect } from 'react';
import { 
    Box, 
    Button, 
    TextField, 
    InputAdornment,
    Chip,
} from '@mui/material';
import { 
    Add, 
    Search, 
} from '@mui/icons-material';
import Layout from '../components/layout/Layout';
import { getAllHospitalizaciones, deleteHospitalizacion } from '../services/hospitalizacionService';
import { getAllPacientes } from '../services/pacienteService';
import { getAllHabitaciones } from '../services/habitacionService';
import { toast } from 'react-toastify';
import HospitalizacionTable from '../components/hospitalizacion/HospitalizacionTable';
import HospitalizacionForm from '../components/hospitalizacion/HospitalizacionForm';
import HospitalizacionDetail from '../components/hospitalizacion/HospitalizacionDetail';

const HospitalizacionPage = () => {
    const [hospitalizaciones, setHospitalizaciones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [openForm, setOpenForm] = useState(false);
    const [openDetail, setOpenDetail] = useState(false);
    const [selectedHospitalizacion, setSelectedHospitalizacion] = useState(null);
    const [mode, setMode] = useState('create');

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);
            const [hospitalizacionesRes, pacientesRes, habitacionesRes] = await Promise.all([
                getAllHospitalizaciones(),
                getAllPacientes(),
                getAllHabitaciones(),
            ]);

            // Mapear hospitalizaciones con nombres reales
            const hospitalizacionesConNombres = (hospitalizacionesRes.data || []).map(h => {
                const paciente = pacientesRes.data.find(p => p.id === h.idPaciente);
                const habitacion = habitacionesRes.data.find(hab => hab.id === h.idHabitacion);

                return {
                    id: h.id,
                    idPaciente: h.idPaciente,
                    nombrePaciente: paciente ? `${paciente.nombres} ${paciente.apellidos}` : h.idPaciente,
                    idHabitacion: h.idHabitacion,
                    numeroHabitacion: habitacion ? habitacion.numero : 'N/A',
                    tipoHabitacion: habitacion ? habitacion.tipo : 'N/A',
                    fechaIngreso: h.fechaIngreso,
                    fechaAlta: h.fechaAlta || null,
                    motivo: h.diagnosticoIngreso,
                    diagnostico: h.diagnosticoIngreso,
                    estado: h.estado || 'activo',
                };
            });

            setHospitalizaciones(hospitalizacionesConNombres);
        } catch (error) {
            toast.error('Error al cargar hospitalizaciones');
            setHospitalizaciones([]);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = () => {
        setMode('create');
        setSelectedHospitalizacion(null);
        setOpenForm(true);
    };

    const handleEdit = (hospitalizacion) => {
        setMode('edit');
        setSelectedHospitalizacion(hospitalizacion);
        setOpenForm(true);
    };

    const handleView = (hospitalizacion) => {
        setSelectedHospitalizacion(hospitalizacion);
        setOpenDetail(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Está seguro de eliminar esta hospitalización?')) {
            try {
                await deleteHospitalizacion(id);
                toast.success('Hospitalización eliminada exitosamente');
                loadData();
            } catch (error) {
                toast.error('Error al eliminar hospitalización');
            }
        }
    };

    const handleCloseForm = () => {
        setOpenForm(false);
        setSelectedHospitalizacion(null);
    };

    const handleSuccess = () => {
        loadData();
        handleCloseForm();
    };

    const filteredHospitalizaciones = hospitalizaciones.filter(h => 
        h.nombrePaciente?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        h.numeroHabitacion?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Layout>
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                        <h2 style={{ margin: 0, fontSize: '2rem', fontWeight: 900 }}>Hospitalización</h2>
                        <Chip 
                            label={`${filteredHospitalizaciones.length} registros`} 
                            color="error" 
                            size="small"
                        />
                    </Box>
                    <p style={{ margin: 0, color: '#64748b', fontSize: '1.1rem' }}>
                        Gestión de hospitalizaciones del sistema
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
                    Nueva Hospitalización
                </Button>
            </Box>

            <Box sx={{ mb: 3 }}>
                <TextField
                    fullWidth
                    placeholder="Buscar por paciente o habitación..."
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
            </Box>

            <HospitalizacionTable
                hospitalizaciones={filteredHospitalizaciones}
                loading={loading}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onView={handleView}
            />

            <HospitalizacionForm
                open={openForm}
                onClose={handleCloseForm}
                onSuccess={handleSuccess}
                hospitalizacion={selectedHospitalizacion}
                mode={mode}
            />

            <HospitalizacionDetail
                open={openDetail}
                onClose={() => setOpenDetail(false)}
                hospitalizacion={selectedHospitalizacion}
            />
        </Layout>
    );
};

export default HospitalizacionPage;