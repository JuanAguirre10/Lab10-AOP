import React, { useState, useEffect } from 'react';
import { 
    Box, 
    Button, 
    Chip,
} from '@mui/material';
import { 
    Refresh,
} from '@mui/icons-material';
import Layout from '../components/layout/Layout';
import AuditoriaTable from '../components/auditoria/AuditoriaTable';
import AuditoriaFiltros from '../components/auditoria/AuditoriaFiltros';
import AuditoriaDetalle from '../components/auditoria/AuditoriaDetalle';
import { 
    getAllAuditorias,
    getAuditoriaByUsuario,
    getAuditoriaByAccion,
    getAuditoriaByTabla,
    getAuditoriaByFechaRango,
} from '../services/auditoriaService';
import { toast } from 'react-toastify';

const AuditoriaPage = () => {
    const [auditorias, setAuditorias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedAuditoria, setSelectedAuditoria] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        loadAuditorias();
    }, []);

    const loadAuditorias = async () => {
        try {
            setLoading(true);
            const response = await getAllAuditorias();
            setAuditorias(response.data || []);
        } catch (error) {
            console.error('Error al cargar auditorías:', error);
            toast.error('Error al cargar auditorías');
            setAuditorias([]);
        } finally {
            setLoading(false);
        }
    };

    const aplicarFiltros = async (filtros) => {
        try {
            setLoading(true);
            let response;

            if (filtros.usuario) {
                response = await getAuditoriaByUsuario(filtros.usuario);
            } else if (filtros.accion) {
                response = await getAuditoriaByAccion(filtros.accion);
            } else if (filtros.tabla) {
                response = await getAuditoriaByTabla(filtros.tabla);
            } else if (filtros.fechaInicio && filtros.fechaFin) {
                response = await getAuditoriaByFechaRango(filtros.fechaInicio, filtros.fechaFin);
            } else {
                response = await getAllAuditorias();
            }

            setAuditorias(response.data || []);
            toast.success('Filtros aplicados correctamente');
        } catch (error) {
            console.error('Error al filtrar:', error);
            toast.error('Error al aplicar filtros');
        } finally {
            setLoading(false);
        }
    };

    const verDetalle = (auditoria) => {
        setSelectedAuditoria(auditoria);
        setShowModal(true);
    };

    return (
        <Layout>
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                        <h2 style={{ margin: 0, fontSize: '2rem', fontWeight: 900 }}>
                            Registro de Auditoría
                        </h2>
                        <Chip 
                            label={`${auditorias.length} registros`}
                            color="primary"
                            size="small"
                        />
                    </Box>
                    <p style={{ margin: 0, color: '#64748b', fontSize: '1.1rem' }}>
                        Seguimiento de todas las operaciones realizadas en el sistema
                    </p>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<Refresh />}
                    onClick={loadAuditorias}
                    size="large"
                    sx={{ 
                        px: 3,
                        py: 1.5,
                        fontWeight: 700,
                    }}
                >
                    Actualizar
                </Button>
            </Box>

            <AuditoriaFiltros onFiltrar={aplicarFiltros} />

            <AuditoriaTable
                auditorias={auditorias}
                loading={loading}
                onVerDetalle={verDetalle}
            />

            <AuditoriaDetalle
                open={showModal}
                onClose={() => setShowModal(false)}
                auditoria={selectedAuditoria}
            />
        </Layout>
    );
};

export default AuditoriaPage;