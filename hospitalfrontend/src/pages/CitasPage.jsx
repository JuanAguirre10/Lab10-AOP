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
import { getAllCitas, deleteCita } from '../services/citaService';
import { getAllPacientes } from '../services/pacienteService';
import { getAllMedicos } from '../services/medicoService';
import { toast } from 'react-toastify';
import CitaTable from '../components/citas/CitaTable';
import CitaForm from '../components/citas/CitaForm';
import CitaDetail from '../components/citas/CitaDetail';
import { descargarCitasPDF, descargarCitasExcel } from '../services/reporteService';
import { PictureAsPdf, TableChart } from '@mui/icons-material';

const CitasPage = () => {
    const [citas, setCitas] = useState([]);
    const [pacientes, setPacientes] = useState([]);
    const [medicos, setMedicos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterEstado, setFilterEstado] = useState('todos');
    const [openForm, setOpenForm] = useState(false);
    const [openDetail, setOpenDetail] = useState(false);
    const [selectedCita, setSelectedCita] = useState(null);
    const [mode, setMode] = useState('create');
    const [loadingPDF, setLoadingPDF] = useState(false);
    const [loadingExcel, setLoadingExcel] = useState(false);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);
            const [citasRes, pacientesRes, medicosRes] = await Promise.all([
                getAllCitas(),
                getAllPacientes(),
                getAllMedicos(),
            ]);

            setPacientes(pacientesRes.data || []);
            setMedicos(medicosRes.data || []);

            // Mapear citas con nombres de pacientes y médicos
            const citasConNombres = (citasRes.data || []).map(cita => {
                const paciente = pacientesRes.data.find(p => p.id === cita.idPaciente);
                const medico = medicosRes.data.find(m => m.id === cita.idMedico);

                return {
                    ...cita,
                    nombrePaciente: paciente ? `${paciente.nombres} ${paciente.apellidos}` : cita.idPaciente,
                    nombreMedico: medico ? `Dr(a). ${medico.nombres} ${medico.apellidos}` : cita.idMedico,
                };
            });

            setCitas(citasConNombres);
        } catch (error) {
            toast.error('Error al cargar datos');
            setCitas([]);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = () => {
        setMode('create');
        setSelectedCita(null);
        setOpenForm(true);
    };

    const handleEdit = (cita) => {
        setMode('edit');
        setSelectedCita(cita);
        setOpenForm(true);
    };

    const handleView = (cita) => {
        setSelectedCita(cita);
        setOpenDetail(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Está seguro de eliminar esta cita?')) {
            try {
                await deleteCita(id);
                toast.success('Cita eliminada exitosamente');
                loadData();
            } catch (error) {
                toast.error('Error al eliminar cita');
            }
        }
    };

    const handleCloseForm = () => {
        setOpenForm(false);
        setSelectedCita(null);
    };

    const handleSuccess = () => {
        loadData();
        handleCloseForm();
    };
    const handleDescargarPDF = async () => {
        try {
            setLoadingPDF(true);
            await descargarCitasPDF();
            toast.success('Reporte PDF descargado correctamente');
        } catch (error) {
            toast.error('Error al descargar el reporte PDF');
        } finally {
            setLoadingPDF(false);
        }
    };

    const handleDescargarExcel = async () => {
        try {
            setLoadingExcel(true);
            await descargarCitasExcel();
            toast.success('Reporte Excel descargado correctamente');
        } catch (error) {
            toast.error('Error al descargar el reporte Excel');
        } finally {
            setLoadingExcel(false);
        }
    };

    const filteredCitas = citas.filter(c => {
        const matchSearch = 
            c.nombrePaciente?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.nombreMedico?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.motivo?.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchEstado = filterEstado === 'todos' || c.estado === filterEstado;
        
        return matchSearch && matchEstado;
    });

    return (
        <Layout>
             <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                        <h2 style={{ margin: 0, fontSize: '2rem', fontWeight: 900 }}>
                            Gestión de Citas Médicas
                        </h2>
                        <Chip 
                            label={`${filteredCitas.length} citas`}
                            color="info"
                            size="small"
                        />
                    </Box>
                    <p style={{ margin: 0, color: '#64748b', fontSize: '1.1rem' }}>
                        Administra las citas médicas y su programación
                    </p>
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                        variant="outlined"
                        startIcon={<PictureAsPdf />}
                        onClick={handleDescargarPDF}
                        disabled={loadingPDF}
                        sx={{ 
                            color: '#dc3545',
                            borderColor: '#dc3545',
                            '&:hover': {
                                borderColor: '#c82333',
                                bgcolor: '#dc354510',
                            }
                        }}
                    >
                        {loadingPDF ? 'Generando...' : 'PDF'}
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<TableChart />}
                        onClick={handleDescargarExcel}
                        disabled={loadingExcel}
                        sx={{ 
                            color: '#28a745',
                            borderColor: '#28a745',
                            '&:hover': {
                                borderColor: '#218838',
                                bgcolor: '#28a74510',
                            }
                        }}
                    >
                        {loadingExcel ? 'Generando...' : 'Excel'}
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={<Add />}
                        size="large"
                        onClick={handleCreate}
                        color="info"
                        sx={{ 
                            px: 3,
                            py: 1.5,
                            fontWeight: 700,
                        }}
                    >
                        Nueva Cita
                    </Button>
                </Box>
            </Box>

            <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
                <TextField
                    fullWidth
                    placeholder="Buscar por paciente, médico o motivo..."
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
                    <MenuItem value="programada">Programada</MenuItem>
                    <MenuItem value="atendida">Atendida</MenuItem>
                    <MenuItem value="cancelada">Cancelada</MenuItem>
                </TextField>
            </Box>

            <CitaTable
                citas={filteredCitas}
                loading={loading}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onView={handleView}
            />

            <CitaForm
                open={openForm}
                onClose={handleCloseForm}
                onSuccess={handleSuccess}
                cita={selectedCita}
                mode={mode}
            />

            <CitaDetail
                open={openDetail}
                onClose={() => setOpenDetail(false)}
                cita={selectedCita}
            />
        </Layout>
    );
};

export default CitasPage;