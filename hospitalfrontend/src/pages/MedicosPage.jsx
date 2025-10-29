import React, { useState, useEffect } from 'react';
import { 
    Box, 
    Button, 
    TextField, 
    InputAdornment,
    Chip,
    IconButton,
} from '@mui/material';
import { 
    Add, 
    Search, 
    FilterList,
} from '@mui/icons-material';
import Layout from '../components/layout/Layout';
import { getAllMedicos, deleteMedico } from '../services/medicoService';
import { toast } from 'react-toastify';
import MedicoTable from '../components/medicos/MedicoTable';
import MedicoForm from '../components/medicos/MedicoForm';
import MedicoDetail from '../components/medicos/MedicoDetail';

const MedicosPage = () => {
    const [medicos, setMedicos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [openForm, setOpenForm] = useState(false);
    const [openDetail, setOpenDetail] = useState(false);
    const [selectedMedico, setSelectedMedico] = useState(null);
    const [mode, setMode] = useState('create');

    useEffect(() => {
        loadMedicos();
    }, []);

    const loadMedicos = async () => {
        try {
            setLoading(true);
            const response = await getAllMedicos();
            setMedicos(response.data);
        } catch (error) {
            toast.error('Error al cargar médicos');
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = () => {
        setMode('create');
        setSelectedMedico(null);
        setOpenForm(true);
    };

    const handleEdit = (medico) => {
        setMode('edit');
        setSelectedMedico(medico);
        setOpenForm(true);
    };

    const handleView = (medico) => {
        setSelectedMedico(medico);
        setOpenDetail(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Está seguro de eliminar este médico?')) {
            try {
                await deleteMedico(id);
                toast.success('Médico eliminado exitosamente');
                loadMedicos();
            } catch (error) {
                toast.error('Error al eliminar médico');
            }
        }
    };

    const handleCloseForm = () => {
        setOpenForm(false);
        setSelectedMedico(null);
    };

    const handleSuccess = () => {
        loadMedicos();
        handleCloseForm();
    };

    const filteredMedicos = medicos.filter(m => 
        m.nombres?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.apellidos?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.colegiatura?.includes(searchTerm)
    );

    return (
        <Layout>
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                        <h2 style={{ margin: 0, fontSize: '2rem', fontWeight: 900 }}>Médicos</h2>
                        <Chip 
                            label={`${filteredMedicos.length} registros`} 
                            color="secondary" 
                            size="small"
                        />
                    </Box>
                    <p style={{ margin: 0, color: '#64748b', fontSize: '1.1rem' }}>
                        Gestión de personal médico del sistema
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
                    Nuevo Médico
                </Button>
            </Box>

            <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
                <TextField
                    fullWidth
                    placeholder="Buscar por nombre, apellido o colegiatura..."
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

            <MedicoTable
                medicos={filteredMedicos}
                loading={loading}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onView={handleView}
            />

            <MedicoForm
                open={openForm}
                onClose={handleCloseForm}
                onSuccess={handleSuccess}
                medico={selectedMedico}
                mode={mode}
            />

            <MedicoDetail
                open={openDetail}
                onClose={() => setOpenDetail(false)}
                medico={selectedMedico}
            />
        </Layout>
    );
};

export default MedicosPage;