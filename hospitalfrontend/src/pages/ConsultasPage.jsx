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
    FilterList,
} from '@mui/icons-material';
import Layout from '../components/layout/Layout';
import { getAllConsultas, deleteConsulta } from '../services/consultaService';
import { getAllPacientes } from '../services/pacienteService';
import { getAllMedicos } from '../services/medicoService';
import { toast } from 'react-toastify';
import ConsultaTable from '../components/consultas/ConsultaTable';
import ConsultaForm from '../components/consultas/ConsultaForm';
import ConsultaDetail from '../components/consultas/ConsultaDetail';
import { descargarConsultasPDF, descargarConsultasExcel } from '../services/reporteService';
import { PictureAsPdf, TableChart } from '@mui/icons-material';

const ConsultasPage = () => {
    const [consultas, setConsultas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [openForm, setOpenForm] = useState(false);
    const [openDetail, setOpenDetail] = useState(false);
    const [selectedConsulta, setSelectedConsulta] = useState(null);
    const [mode, setMode] = useState('create');
    const [loadingPDF, setLoadingPDF] = useState(false);
    const [loadingExcel, setLoadingExcel] = useState(false);


    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);
            const [consultasRes, pacientesRes, medicosRes] = await Promise.all([
                getAllConsultas(),
                getAllPacientes(),
                getAllMedicos(),
            ]);

            // Mapear consultas con nombres
            const consultasConNombres = (consultasRes.data || []).map(consulta => {
                const paciente = pacientesRes.data.find(p => p.id === consulta.idPaciente);
                const medico = medicosRes.data.find(m => m.id === consulta.idMedico);

                return {
                    ...consulta,
                    nombrePaciente: paciente ? `${paciente.nombres} ${paciente.apellidos}` : consulta.idPaciente,
                    nombreMedico: medico ? `Dr(a). ${medico.nombres} ${medico.apellidos}` : consulta.idMedico,
                };
            });

            setConsultas(consultasConNombres);
        } catch (error) {
            toast.error('Error al cargar consultas');
            setConsultas([]);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = () => {
        setMode('create');
        setSelectedConsulta(null);
        setOpenForm(true);
    };

    const handleEdit = (consulta) => {
        setMode('edit');
        setSelectedConsulta(consulta);
        setOpenForm(true);
    };

    const handleView = (consulta) => {
        setSelectedConsulta(consulta);
        setOpenDetail(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Está seguro de eliminar esta consulta?')) {
            try {
                await deleteConsulta(id);
                toast.success('Consulta eliminada exitosamente');
                loadData();
            } catch (error) {
                toast.error('Error al eliminar consulta');
            }
        }
    };

    const handleCloseForm = () => {
        setOpenForm(false);
        setSelectedConsulta(null);
    };

    const handleSuccess = () => {
        loadData();
        handleCloseForm();
    };

    const handleDescargarPDF = async () => {
        try {
            setLoadingPDF(true);
            await descargarConsultasPDF();
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
            await descargarConsultasExcel();
            toast.success('Reporte Excel descargado correctamente');
        } catch (error) {
            toast.error('Error al descargar el reporte Excel');
        } finally {
            setLoadingExcel(false);
        }
    };

    const filteredConsultas = consultas.filter(c => 
        c.nombrePaciente?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.nombreMedico?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.motivoConsulta?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Layout>
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                        <h2 style={{ margin: 0, fontSize: '2rem', fontWeight: 900 }}>
                            Gestión de Consultas Médicas
                        </h2>
                        <Chip 
                            label={`${filteredConsultas.length} consultas`}
                            color="warning"
                            size="small"
                        />
                    </Box>
                    <p style={{ margin: 0, color: '#64748b', fontSize: '1.1rem' }}>
                        Administra las consultas médicas realizadas
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
                        color="warning"
                        sx={{ 
                            px: 3,
                            py: 1.5,
                            fontWeight: 700,
                        }}
                    >
                        Nueva Consulta
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
                <Button
                    variant="outlined"
                    startIcon={<FilterList />}
                    sx={{ minWidth: 120 }}
                >
                    Filtros
                </Button>
            </Box>

            <ConsultaTable
                consultas={filteredConsultas}
                loading={loading}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onView={handleView}
            />

            <ConsultaForm
                open={openForm}
                onClose={handleCloseForm}
                onSuccess={handleSuccess}
                consulta={selectedConsulta}
                mode={mode}
            />

            <ConsultaDetail
                open={openDetail}
                onClose={() => setOpenDetail(false)}
                consulta={selectedConsulta}
            />
        </Layout>
    );
};

export default ConsultasPage;