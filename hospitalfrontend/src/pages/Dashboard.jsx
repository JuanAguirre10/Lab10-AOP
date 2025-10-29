import React, { useState, useEffect } from 'react';
import { 
    Box, 
    Grid, 
    Paper, 
    Typography,
    Card,
    CardContent,
    LinearProgress,
    Chip,
} from '@mui/material';
import { 
    People, 
    LocalHospital, 
    CalendarMonth, 
    Description,
    Hotel,
    Receipt,
    TrendingUp,
    EventAvailable,
    CheckCircle,
    HourglassEmpty,
    Cancel,
} from '@mui/icons-material';
import Layout from '../components/layout/Layout';
import { getAllPacientes } from '../services/pacienteService';
import { getAllMedicos } from '../services/medicoService';
import { getAllCitas } from '../services/citaService';
import { getAllConsultas } from '../services/consultaService';
import { getAllHospitalizaciones } from '../services/hospitalizacionService';
import { getAllFacturas } from '../services/facturaService';

const StatCard = ({ title, value, icon: Icon, color, subtitle, loading }) => (
    <Card 
        sx={{ 
            height: '100%',
            background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`,
            border: `2px solid ${color}30`,
            transition: 'all 0.3s ease',
            '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: `0 12px 24px ${color}40`,
                border: `2px solid ${color}`,
            }
        }}
    >
        <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600, mb: 1 }}>
                        {title}
                    </Typography>
                    <Typography variant="h3" sx={{ fontWeight: 900, color, mb: 1 }}>
                        {value}
                    </Typography>
                    {subtitle && (
                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                            {subtitle}
                        </Typography>
                    )}
                </Box>
                <Box
                    sx={{
                        width: 64,
                        height: 64,
                        borderRadius: 3,
                        bgcolor: color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: `0 8px 16px ${color}40`,
                    }}
                >
                    <Icon sx={{ color: 'white', fontSize: 32 }} />
                </Box>
            </Box>
        </CardContent>
    </Card>
);

const ActivityItem = ({ title, value, subtitle, icon: Icon, color }) => (
    <Box 
        sx={{ 
            p: 3,
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            bgcolor: `${color}08`,
            borderRadius: 2,
            border: `2px solid ${color}20`,
            transition: 'all 0.3s ease',
            '&:hover': {
                transform: 'translateX(8px)',
                border: `2px solid ${color}`,
                bgcolor: `${color}15`,
            }
        }}
    >
        <Box
            sx={{
                width: 56,
                height: 56,
                borderRadius: 2,
                bgcolor: color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: `0 4px 12px ${color}40`,
            }}
        >
            <Icon sx={{ color: 'white', fontSize: 28 }} />
        </Box>
        <Box sx={{ flex: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                {title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                {subtitle}
            </Typography>
        </Box>
        <Typography variant="h3" sx={{ fontWeight: 900, color }}>
            {value}
        </Typography>
    </Box>
);

const Dashboard = () => {
    const [stats, setStats] = useState({
        pacientes: 0,
        medicos: 0,
        citas: 0,
        citasHoy: 0,
        citasProgramadas: 0,
        citasAtendidas: 0,
        citasCanceladas: 0,
        consultas: 0,
        hospitalizaciones: 0,
        hospitalizacionesActivas: 0,
        facturas: 0,
        facturasTotal: 0,
        facturasPendientes: 0,
        facturasPagadas: 0,
        facturasAnuladas: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {
        try {
            setLoading(true);
            const [
                pacientesRes,
                medicosRes,
                citasRes,
                consultasRes,
                hospitalizacionesRes,
                facturasRes,
            ] = await Promise.all([
                getAllPacientes(),
                getAllMedicos(),
                getAllCitas(),
                getAllConsultas(),
                getAllHospitalizaciones(),
                getAllFacturas(),
            ]);

            const hoy = new Date().toISOString().split('T')[0];
            const citasHoy = (citasRes.data || []).filter(c => c.fecha === hoy).length;
            const citasProgramadas = (citasRes.data || []).filter(c => c.estado === 'programada').length;
            const citasAtendidas = (citasRes.data || []).filter(c => c.estado === 'atendida').length;
            const citasCanceladas = (citasRes.data || []).filter(c => c.estado === 'cancelada').length;
            
            const hospitalizacionesActivas = (hospitalizacionesRes.data || []).filter(h => !h.fechaAlta).length;
            
            const facturasTotal = (facturasRes.data || []).reduce((sum, f) => sum + (f.total || 0), 0);
            const facturasPendientes = (facturasRes.data || []).filter(f => f.estado === 'pendiente').length;
            const facturasPagadas = (facturasRes.data || []).filter(f => f.estado === 'pagada').length;
            const facturasAnuladas = (facturasRes.data || []).filter(f => f.estado === 'anulada').length;

            setStats({
                pacientes: pacientesRes.data?.length || 0,
                medicos: medicosRes.data?.length || 0,
                citas: citasRes.data?.length || 0,
                citasHoy,
                citasProgramadas,
                citasAtendidas,
                citasCanceladas,
                consultas: consultasRes.data?.length || 0,
                hospitalizaciones: hospitalizacionesRes.data?.length || 0,
                hospitalizacionesActivas,
                facturas: facturasRes.data?.length || 0,
                facturasTotal,
                facturasPendientes,
                facturasPagadas,
                facturasAnuladas,
            });
        } catch (error) {
            console.error('Error al cargar estadísticas:', error);
        } finally {
            setLoading(false);
        }
    };

    const porcentajePagado = stats.facturas > 0 ? Math.round(((stats.facturasPagadas) / stats.facturas) * 100) : 0;

    return (
        <Layout>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" sx={{ fontWeight: 900, mb: 1 }}>
                    Dashboard
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem' }}>
                    Resumen general del sistema de gestión hospitalaria
                </Typography>
            </Box>

            {/* Estadísticas principales */}
            <Grid container spacing={0.5} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="Total Pacientes"
                        value={stats.pacientes}
                        icon={People}
                        color="#1976d2"
                        subtitle="Pacientes registrados en el sistema"
                        loading={loading}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="Total Médicos"
                        value={stats.medicos}
                        icon={LocalHospital}
                        color="#9c27b0"
                        subtitle="Médicos activos disponibles"
                        loading={loading}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="Citas Programadas"
                        value={stats.citas}
                        icon={CalendarMonth}
                        color="#0288d1"
                        subtitle={`${stats.citasHoy} citas para hoy`}
                        loading={loading}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard
                        title="Consultas Realizadas"
                        value={stats.consultas}
                        icon={Description}
                        color="#ed6c02"
                        subtitle="Total de consultas médicas"
                        loading={loading}
                    />
                </Grid>
            </Grid>

            {/* Actividad del día y Hospitalizaciones */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} md={8}>
    <Paper sx={{ p: 4, height: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
        <TrendingUp sx={{ color: '#1976d2', fontSize: 32 }} />
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Estado de Citas
        </Typography>
      </Box>

      {/* Aquí el cambio */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <ActivityItem
            title="Citas de Hoy"
            value={stats.citasHoy}
            subtitle="Citas programadas para el día de hoy"
            icon={EventAvailable}
            color="#0288d1"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <ActivityItem
            title="Citas Programadas"
            value={stats.citasProgramadas}
            subtitle="Total de citas pendientes de atención"
            icon={CalendarMonth}
            color="#2196f3"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <ActivityItem
            title="Citas Atendidas"
            value={stats.citasAtendidas}
            subtitle="Citas completadas exitosamente"
            icon={CheckCircle}
            color="#2e7d32"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <ActivityItem
            title="Citas Canceladas"
            value={stats.citasCanceladas}
            subtitle="Citas canceladas por pacientes o médicos"
            icon={Cancel}
            color="#d32f2f"
          />
        </Grid>
      </Grid>
    </Paper>
  </Grid>

                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                            <Hotel sx={{ color: '#d32f2f', fontSize: 32 }} />
                            <Typography variant="h5" sx={{ fontWeight: 700 }}>
                                Hospitalización
                            </Typography>
                        </Box>

                        <Box sx={{ 
                            flex: 1, 
                            display: 'flex', 
                            flexDirection: 'column', 
                            justifyContent: 'center',
                            alignItems: 'center',
                            bgcolor: '#d32f2f10',
                            borderRadius: 3,
                            p: 4,
                            border: '2px solid #d32f2f30',
                        }}>
                            <Hotel sx={{ fontSize: 80, color: '#d32f2f', mb: 2 }} />
                            <Typography variant="h1" sx={{ fontWeight: 900, color: '#d32f2f', mb: 1 }}>
                                {stats.hospitalizacionesActivas}
                            </Typography>
                            <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 600, mb: 1 }}>
                                Pacientes Hospitalizados
                            </Typography>
                            <Chip 
                                label={`${stats.hospitalizaciones} Total`}
                                color="error"
                                sx={{ fontWeight: 600, mt: 2 }}
                            />
                        </Box>
                    </Paper>
                </Grid>
            </Grid>

            {/* Resumen Financiero */}
            <Paper sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                    <Receipt sx={{ color: '#2e7d32', fontSize: 32 }} />
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                        Resumen Financiero
                    </Typography>
                </Box>

                <Grid container spacing={3}>
                    <Grid item xs={12} md={5}>
                        <Box sx={{ 
                            p: 4, 
                            bgcolor: '#2e7d3210', 
                            borderRadius: 3,
                            border: '2px solid #2e7d3230',
                            textAlign: 'center',
                        }}>
                            <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 600, mb: 1 }}>
                                Total Facturado
                            </Typography>
                            <Typography variant="h2" sx={{ fontWeight: 900, color: '#2e7d32', mb: 2 }}>
                                S/ {stats.facturasTotal.toFixed(2)}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Ingresos totales del sistema
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={7}>
                        <Grid container spacing={2} sx={{ mb: 3 }}>
                            <Grid item xs={4}>
                                <Paper sx={{ p: 3, bgcolor: '#2e7d3210', textAlign: 'center', border: '2px solid #2e7d3220' }}>
                                    <Receipt sx={{ color: '#2e7d32', fontSize: 36, mb: 1 }} />
                                    <Typography variant="h4" sx={{ fontWeight: 900, color: '#2e7d32', mb: 0.5 }}>
                                        {stats.facturas}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                                        Total Facturas
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={4}>
                                <Paper sx={{ p: 3, bgcolor: '#2e7d3210', textAlign: 'center', border: '2px solid #2e7d3220' }}>
                                    <CheckCircle sx={{ color: '#2e7d32', fontSize: 36, mb: 1 }} />
                                    <Typography variant="h4" sx={{ fontWeight: 900, color: '#2e7d32', mb: 0.5 }}>
                                        {stats.facturasPagadas}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                                        Pagadas
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={4}>
                                <Paper sx={{ p: 3, bgcolor: '#ed6c0210', textAlign: 'center', border: '2px solid #ed6c0220' }}>
                                    <HourglassEmpty sx={{ color: '#ed6c02', fontSize: 36, mb: 1 }} />
                                    <Typography variant="h4" sx={{ fontWeight: 900, color: '#ed6c02', mb: 0.5 }}>
                                        {stats.facturasPendientes}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                                        Pendientes
                                    </Typography>
                                </Paper>
                            </Grid>
                        </Grid>

                        <Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 600 }}>
                                    Progreso de Pagos
                                </Typography>
                                <Chip 
                                    label={`${porcentajePagado}% Completado`}
                                    color="success"
                                    sx={{ fontWeight: 700 }}
                                />
                            </Box>
                            <LinearProgress 
                                variant="determinate" 
                                value={porcentajePagado}
                                sx={{ 
                                    height: 12, 
                                    borderRadius: 6,
                                    bgcolor: '#ed6c0230',
                                    '& .MuiLinearProgress-bar': {
                                        bgcolor: '#2e7d32',
                                        borderRadius: 6,
                                    }
                                }}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </Layout>
    );
};

export default Dashboard;