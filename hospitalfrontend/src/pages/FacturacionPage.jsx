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
import { getAllFacturas, deleteFactura } from '../services/facturaService';
import { getAllPacientes } from '../services/pacienteService';
import { toast } from 'react-toastify';
import FacturaTable from '../components/facturacion/FacturaTable';
import FacturaForm from '../components/facturacion/FacturaForm';
import FacturaDetail from '../components/facturacion/FacturaDetail';

const FacturacionPage = () => {
    const [facturas, setFacturas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterEstado, setFilterEstado] = useState('todos');
    const [openForm, setOpenForm] = useState(false);
    const [openDetail, setOpenDetail] = useState(false);
    const [selectedFactura, setSelectedFactura] = useState(null);
    const [mode, setMode] = useState('create');

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);
            const [facturasRes, pacientesRes] = await Promise.all([
                getAllFacturas(),
                getAllPacientes(),
            ]);

            // Mapear facturas con nombres
            const facturasConNombres = (facturasRes.data || []).map(f => {
                const paciente = pacientesRes.data.find(p => p.id === f.idPaciente);

                return {
                    id: f.id,
                    numeroFactura: f.id?.substring(0, 8).toUpperCase() || 'N/A',
                    idPaciente: f.idPaciente,
                    nombrePaciente: paciente ? `${paciente.nombres} ${paciente.apellidos}` : f.idPaciente,
                    fecha: f.fechaEmision,
                    montoTotal: f.total || 0,
                    estado: f.estado,
                    metodoPago: 'Efectivo',
                };
            });

            setFacturas(facturasConNombres);
        } catch (error) {
            toast.error('Error al cargar facturas');
            setFacturas([]);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = () => {
        setMode('create');
        setSelectedFactura(null);
        setOpenForm(true);
    };

    const handleEdit = (factura) => {
        setMode('edit');
        setSelectedFactura(factura);
        setOpenForm(true);
    };

    const handleView = (factura) => {
        setSelectedFactura(factura);
        setOpenDetail(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Está seguro de eliminar esta factura?')) {
            try {
                await deleteFactura(id);
                toast.success('Factura eliminada exitosamente');
                loadData();
            } catch (error) {
                toast.error('Error al eliminar factura');
            }
        }
    };

    const handleCloseForm = () => {
        setOpenForm(false);
        setSelectedFactura(null);
    };

    const handleSuccess = () => {
        loadData();
        handleCloseForm();
    };

    const filteredFacturas = facturas.filter(f => {
        const matchSearch = 
            f.nombrePaciente?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            f.numeroFactura?.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchEstado = filterEstado === 'todos' || f.estado === filterEstado;
        
        return matchSearch && matchEstado;
    });

    return (
        <Layout>
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                        <h2 style={{ margin: 0, fontSize: '2rem', fontWeight: 900 }}>Facturación</h2>
                        <Chip 
                            label={`${filteredFacturas.length} registros`} 
                            color="success" 
                            size="small"
                        />
                    </Box>
                    <p style={{ margin: 0, color: '#64748b', fontSize: '1.1rem' }}>
                        Gestión de facturas del sistema
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
                    Nueva Factura
                </Button>
            </Box>

            <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
                <TextField
                    fullWidth
                    placeholder="Buscar por paciente o número de factura..."
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
                    <MenuItem value="pendiente">Pendiente</MenuItem>
                    <MenuItem value="pagada">Pagada</MenuItem>
                    <MenuItem value="anulada">Anulada</MenuItem>
                </TextField>
            </Box>

            <FacturaTable
                facturas={filteredFacturas}
                loading={loading}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onView={handleView}
            />

            <FacturaForm
                open={openForm}
                onClose={handleCloseForm}
                onSuccess={handleSuccess}
                factura={selectedFactura}
                mode={mode}
            />

            <FacturaDetail
                open={openDetail}
                onClose={() => setOpenDetail(false)}
                factura={selectedFactura}
            />
        </Layout>
    );
};

export default FacturacionPage;