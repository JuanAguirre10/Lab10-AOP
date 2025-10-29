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
import { getAllUsuarios, deleteUsuario } from '../services/usuarioService';
import { toast } from 'react-toastify';
import UsuarioTable from '../components/usuarios/UsuarioTable';
import UsuarioForm from '../components/usuarios/UsuarioForm';
import UsuarioDetail from '../components/usuarios/UsuarioDetail';

const UsuariosPage = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterRol, setFilterRol] = useState('todos');
    const [openForm, setOpenForm] = useState(false);
    const [openDetail, setOpenDetail] = useState(false);
    const [selectedUsuario, setSelectedUsuario] = useState(null);
    const [mode, setMode] = useState('create');

    useEffect(() => {
        loadUsuarios();
    }, []);

    const loadUsuarios = async () => {
        try {
            setLoading(true);
            const response = await getAllUsuarios();
            // Transformar datos del backend al formato del frontend
            const usuariosTransformados = (response.data || []).map(u => ({
                id: u.id,
                username: u.nombreUsuario,
                rol: u.rol,
                email: u.email || `${u.nombreUsuario}@hospital.com`,
                activo: true,
            }));
            setUsuarios(usuariosTransformados);
        } catch (error) {
            toast.error('Error al cargar usuarios');
            setUsuarios([]);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = () => {
        setMode('create');
        setSelectedUsuario(null);
        setOpenForm(true);
    };

    const handleEdit = (usuario) => {
        setMode('edit');
        setSelectedUsuario(usuario);
        setOpenForm(true);
    };

    const handleView = (usuario) => {
        setSelectedUsuario(usuario);
        setOpenDetail(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Está seguro de eliminar este usuario?')) {
            try {
                await deleteUsuario(id);
                toast.success('Usuario eliminado exitosamente');
                loadUsuarios();
            } catch (error) {
                toast.error('Error al eliminar usuario');
            }
        }
    };

    const handleCloseForm = () => {
        setOpenForm(false);
        setSelectedUsuario(null);
    };

    const handleSuccess = () => {
        loadUsuarios();
        handleCloseForm();
    };

    const filteredUsuarios = usuarios.filter(u => {
        const matchSearch = 
            u.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            u.email?.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchRol = filterRol === 'todos' || u.rol === filterRol;
        
        return matchSearch && matchRol;
    });

    return (
        <Layout>
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                        <h2 style={{ margin: 0, fontSize: '2rem', fontWeight: 900 }}>Usuarios</h2>
                        <Chip 
                            label={`${filteredUsuarios.length} registros`} 
                            color="secondary" 
                            size="small"
                        />
                    </Box>
                    <p style={{ margin: 0, color: '#64748b', fontSize: '1.1rem' }}>
                        Gestión de usuarios del sistema
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
                    Nuevo Usuario
                </Button>
            </Box>

            <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
                <TextField
                    fullWidth
                    placeholder="Buscar por nombre de usuario..."
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
                    value={filterRol}
                    onChange={(e) => setFilterRol(e.target.value)}
                    sx={{ minWidth: 200 }}
                >
                    <MenuItem value="todos">Todos los roles</MenuItem>
                    <MenuItem value="admin">Administrador</MenuItem>
                    <MenuItem value="medico">Médico</MenuItem>
                    <MenuItem value="recepcionista">Recepcionista</MenuItem>
                </TextField>
            </Box>

            <UsuarioTable
                usuarios={filteredUsuarios}
                loading={loading}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onView={handleView}
            />

            <UsuarioForm
                open={openForm}
                onClose={handleCloseForm}
                onSuccess={handleSuccess}
                usuario={selectedUsuario}
                mode={mode}
            />

            <UsuarioDetail
                open={openDetail}
                onClose={() => setOpenDetail(false)}
                usuario={selectedUsuario}
            />
        </Layout>
    );
};

export default UsuariosPage;