import React, { useState, useEffect } from 'react';
import { 
    Box, 
    Button, 
    TextField, 
    InputAdornment,
    Chip,
    Tabs,
    Tab,
} from '@mui/material';
import { 
    Add, 
    Search,
    HealthAndSafety,
    Medication,
    Receipt,
} from '@mui/icons-material';
import Layout from '../components/layout/Layout';
import { getAllDiagnosticos, deleteDiagnostico } from '../services/diagnosticoService';
import { getAllRecetas, deleteReceta } from '../services/recetaService';
import { getAllDetallesReceta, deleteDetalleReceta } from '../services/detalleRecetaService';
import { getAllConsultas } from '../services/consultaService';
import { toast } from 'react-toastify';
import DiagnosticoTable from '../components/diagnosticos/DiagnosticoTable';
import DiagnosticoForm from '../components/diagnosticos/DiagnosticoForm';
import RecetaTable from '../components/diagnosticos/RecetaTable';
import RecetaForm from '../components/diagnosticos/RecetaForm';
import DetalleRecetaTable from '../components/diagnosticos/DetalleRecetaTable';
import DetalleRecetaForm from '../components/diagnosticos/DetalleRecetaForm';

const DiagnosticosPage = () => {
    const [tabValue, setTabValue] = useState(0);
    
    // Estados para Diagnósticos
    const [diagnosticos, setDiagnosticos] = useState([]);
    const [loadingDiagnosticos, setLoadingDiagnosticos] = useState(true);
    const [searchDiagnostico, setSearchDiagnostico] = useState('');
    const [openDiagnosticoForm, setOpenDiagnosticoForm] = useState(false);
    const [selectedDiagnostico, setSelectedDiagnostico] = useState(null);
    const [modeDiagnostico, setModeDiagnostico] = useState('create');

    // Estados para Recetas
    const [recetas, setRecetas] = useState([]);
    const [loadingRecetas, setLoadingRecetas] = useState(true);
    const [searchReceta, setSearchReceta] = useState('');
    const [openRecetaForm, setOpenRecetaForm] = useState(false);
    const [selectedReceta, setSelectedReceta] = useState(null);
    const [modeReceta, setModeReceta] = useState('create');

    // Estados para Detalles de Receta
    const [detallesReceta, setDetallesReceta] = useState([]);
    const [loadingDetalles, setLoadingDetalles] = useState(true);
    const [searchDetalle, setSearchDetalle] = useState('');
    const [openDetalleForm, setOpenDetalleForm] = useState(false);
    const [selectedDetalle, setSelectedDetalle] = useState(null);
    const [modeDetalle, setModeDetalle] = useState('create');

    const [consultas, setConsultas] = useState([]);

    useEffect(() => {
        loadAllData();
    }, []);

    const loadAllData = async () => {
        await Promise.all([
            loadDiagnosticos(),
            loadRecetas(),
            loadDetallesReceta(),
            loadConsultas(),
        ]);
    };

    const loadConsultas = async () => {
        try {
            const response = await getAllConsultas();
            setConsultas(response.data || []);
        } catch (error) {
            console.error('Error al cargar consultas');
        }
    };

    // Funciones para Diagnósticos
    const loadDiagnosticos = async () => {
        try {
            setLoadingDiagnosticos(true);
            const response = await getAllDiagnosticos();
            setDiagnosticos(response.data || []);
        } catch (error) {
            toast.error('Error al cargar diagnósticos');
            setDiagnosticos([]);
        } finally {
            setLoadingDiagnosticos(false);
        }
    };

    const handleCreateDiagnostico = () => {
        setModeDiagnostico('create');
        setSelectedDiagnostico(null);
        setOpenDiagnosticoForm(true);
    };

    const handleEditDiagnostico = (diagnostico) => {
        setModeDiagnostico('edit');
        setSelectedDiagnostico(diagnostico);
        setOpenDiagnosticoForm(true);
    };

    const handleDeleteDiagnostico = async (id) => {
        if (window.confirm('¿Está seguro de eliminar este diagnóstico?')) {
            try {
                await deleteDiagnostico(id);
                toast.success('Diagnóstico eliminado exitosamente');
                loadDiagnosticos();
            } catch (error) {
                toast.error('Error al eliminar diagnóstico');
            }
        }
    };

    // Funciones para Recetas
    const loadRecetas = async () => {
        try {
            setLoadingRecetas(true);
            const response = await getAllRecetas();
            setRecetas(response.data || []);
        } catch (error) {
            toast.error('Error al cargar recetas');
            setRecetas([]);
        } finally {
            setLoadingRecetas(false);
        }
    };

    const handleCreateReceta = () => {
        setModeReceta('create');
        setSelectedReceta(null);
        setOpenRecetaForm(true);
    };

    const handleEditReceta = (receta) => {
        setModeReceta('edit');
        setSelectedReceta(receta);
        setOpenRecetaForm(true);
    };

    const handleDeleteReceta = async (id) => {
        if (window.confirm('¿Está seguro de eliminar esta receta?')) {
            try {
                await deleteReceta(id);
                toast.success('Receta eliminada exitosamente');
                loadRecetas();
            } catch (error) {
                toast.error('Error al eliminar receta');
            }
        }
    };

    // Funciones para Detalles de Receta
    const loadDetallesReceta = async () => {
        try {
            setLoadingDetalles(true);
            const response = await getAllDetallesReceta();
            setDetallesReceta(response.data || []);
        } catch (error) {
            toast.error('Error al cargar detalles de receta');
            setDetallesReceta([]);
        } finally {
            setLoadingDetalles(false);
        }
    };

    const handleCreateDetalle = () => {
        setModeDetalle('create');
        setSelectedDetalle(null);
        setOpenDetalleForm(true);
    };

    const handleEditDetalle = (detalle) => {
        setModeDetalle('edit');
        setSelectedDetalle(detalle);
        setOpenDetalleForm(true);
    };

    const handleDeleteDetalle = async (id) => {
        if (window.confirm('¿Está seguro de eliminar este detalle de receta?')) {
            try {
                await deleteDetalleReceta(id);
                toast.success('Detalle eliminado exitosamente');
                loadDetallesReceta();
            } catch (error) {
                toast.error('Error al eliminar detalle');
            }
        }
    };

    // Filtros
    const filteredDiagnosticos = diagnosticos.filter(d => 
        d.descripcion?.toLowerCase().includes(searchDiagnostico.toLowerCase()) ||
        d.tipo?.toLowerCase().includes(searchDiagnostico.toLowerCase())
    );

    const filteredRecetas = recetas.filter(r => 
        r.indicaciones?.toLowerCase().includes(searchReceta.toLowerCase())
    );

    const filteredDetalles = detallesReceta.filter(d => 
        d.medicamento?.toLowerCase().includes(searchDetalle.toLowerCase())
    );

    const getTabColor = (index) => {
        switch(index) {
            case 0: return 'error';
            case 1: return 'success';
            case 2: return 'warning';
            default: return 'primary';
        }
    };

    const getTabIcon = (index) => {
        switch(index) {
            case 0: return <HealthAndSafety />;
            case 1: return <Medication />;
            case 2: return <Receipt />;
            default: return null;
        }
    };

    return (
        <Layout>
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                        <h2 style={{ margin: 0, fontSize: '2rem', fontWeight: 900 }}>
                            Diagnósticos y Recetas
                        </h2>
                        <Chip 
                            label={
                                tabValue === 0 ? `${filteredDiagnosticos.length} diagnósticos` :
                                tabValue === 1 ? `${filteredRecetas.length} recetas` :
                                `${filteredDetalles.length} medicamentos`
                            }
                            color={getTabColor(tabValue)}
                            size="small"
                        />
                    </Box>
                    <p style={{ margin: 0, color: '#64748b', fontSize: '1.1rem' }}>
                        Gestión integral de diagnósticos y prescripciones médicas
                    </p>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    size="large"
                    color={getTabColor(tabValue)}
                    onClick={() => {
                        if (tabValue === 0) handleCreateDiagnostico();
                        else if (tabValue === 1) handleCreateReceta();
                        else handleCreateDetalle();
                    }}
                    sx={{ 
                        px: 3,
                        py: 1.5,
                        fontWeight: 700,
                    }}
                >
                    {tabValue === 0 ? 'Nuevo Diagnóstico' : 
                     tabValue === 1 ? 'Nueva Receta' : 
                     'Nuevo Medicamento'}
                </Button>
            </Box>

            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
                <Tabs 
                    value={tabValue} 
                    onChange={(e, newValue) => setTabValue(newValue)}
                    variant="fullWidth"
                >
                    <Tab 
                        icon={<HealthAndSafety />} 
                        iconPosition="start"
                        label="Diagnósticos" 
                        sx={{ fontWeight: 700, fontSize: '1rem' }}
                    />
                    <Tab 
                        icon={<Medication />} 
                        iconPosition="start"
                        label="Recetas Médicas" 
                        sx={{ fontWeight: 700, fontSize: '1rem' }}
                    />
                    <Tab 
                        icon={<Receipt />} 
                        iconPosition="start"
                        label="Detalle de Medicamentos" 
                        sx={{ fontWeight: 700, fontSize: '1rem' }}
                    />
                </Tabs>
            </Box>

            {/* TAB 0: DIAGNÓSTICOS */}
            {tabValue === 0 && (
                <>
                    <Box sx={{ mb: 3 }}>
                        <TextField
                            fullWidth
                            placeholder="Buscar diagnóstico por descripción o tipo..."
                            value={searchDiagnostico}
                            onChange={(e) => setSearchDiagnostico(e.target.value)}
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

                    <DiagnosticoTable
                        diagnosticos={filteredDiagnosticos}
                        loading={loadingDiagnosticos}
                        onEdit={handleEditDiagnostico}
                        onDelete={handleDeleteDiagnostico}
                        consultas={consultas}
                    />

                    <DiagnosticoForm
                        open={openDiagnosticoForm}
                        onClose={() => setOpenDiagnosticoForm(false)}
                        onSuccess={() => {
                            loadDiagnosticos();
                            setOpenDiagnosticoForm(false);
                        }}
                        diagnostico={selectedDiagnostico}
                        mode={modeDiagnostico}
                        consultas={consultas}
                    />
                </>
            )}

            {/* TAB 1: RECETAS */}
            {tabValue === 1 && (
                <>
                    <Box sx={{ mb: 3 }}>
                        <TextField
                            fullWidth
                            placeholder="Buscar receta por indicaciones..."
                            value={searchReceta}
                            onChange={(e) => setSearchReceta(e.target.value)}
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

                    <RecetaTable
                        recetas={filteredRecetas}
                        loading={loadingRecetas}
                        onEdit={handleEditReceta}
                        onDelete={handleDeleteReceta}
                        consultas={consultas}
                    />

                    <RecetaForm
                        open={openRecetaForm}
                        onClose={() => setOpenRecetaForm(false)}
                        onSuccess={() => {
                            loadRecetas();
                            setOpenRecetaForm(false);
                        }}
                        receta={selectedReceta}
                        mode={modeReceta}
                        consultas={consultas}
                    />
                </>
            )}

            {/* TAB 2: DETALLES DE RECETA */}
            {tabValue === 2 && (
                <>
                    <Box sx={{ mb: 3 }}>
                        <TextField
                            fullWidth
                            placeholder="Buscar medicamento..."
                            value={searchDetalle}
                            onChange={(e) => setSearchDetalle(e.target.value)}
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

                    <DetalleRecetaTable
                        detalles={filteredDetalles}
                        loading={loadingDetalles}
                        onEdit={handleEditDetalle}
                        onDelete={handleDeleteDetalle}
                        recetas={recetas}
                    />

                    <DetalleRecetaForm
                        open={openDetalleForm}
                        onClose={() => setOpenDetalleForm(false)}
                        onSuccess={() => {
                            loadDetallesReceta();
                            setOpenDetalleForm(false);
                        }}
                        detalle={selectedDetalle}
                        mode={modeDetalle}
                        recetas={recetas}
                    />
                </>
            )}
        </Layout>
    );
};

export default DiagnosticosPage;