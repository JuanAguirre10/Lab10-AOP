import React from 'react';
import { Box, Grid, Chip } from '@mui/material';
import { 
    People, 
    CalendarMonth, 
    Description,
} from '@mui/icons-material';
import Layout from '../components/layout/Layout';
import ReporteCard from '../components/reportes/ReporteCard';
import {
    descargarPacientesPDF,
    descargarPacientesExcel,
    descargarCitasPDF,
    descargarCitasExcel,
    descargarConsultasPDF,
    descargarConsultasExcel,
} from '../services/reporteService';

const ReportesPage = () => {
    const reportes = [
        {
            id: 'pacientes',
            titulo: 'Reporte de Pacientes',
            descripcion: 'Lista completa de todos los pacientes registrados con sus datos personales, información de contacto y estado actual en el sistema.',
            color: '#1976d2',
            icon: People,
            onPDF: descargarPacientesPDF,
            onExcel: descargarPacientesExcel,
        },
        {
            id: 'citas',
            titulo: 'Reporte de Citas',
            descripcion: 'Registro detallado de todas las citas médicas programadas, atendidas y canceladas, incluyendo información del paciente y médico asignado.',
            color: '#0288d1',
            icon: CalendarMonth,
            onPDF: descargarCitasPDF,
            onExcel: descargarCitasExcel,
        },
        {
            id: 'consultas',
            titulo: 'Reporte de Consultas',
            descripcion: 'Historial completo de consultas médicas realizadas, incluyendo motivos de consulta, diagnósticos y observaciones del médico tratante.',
            color: '#ed6c02',
            icon: Description,
            onPDF: descargarConsultasPDF,
            onExcel: descargarConsultasExcel,
        },
    ];

    return (
        <Layout>
            <Box sx={{ mb: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                    <h2 style={{ margin: 0, fontSize: '2rem', fontWeight: 900 }}>
                        Generación de Reportes
                    </h2>
                    <Chip 
                        label={`${reportes.length} tipos disponibles`}
                        color="success"
                        size="small"
                    />
                </Box>
                <p style={{ margin: 0, color: '#64748b', fontSize: '1.1rem' }}>
                    Descarga reportes en formato PDF o Excel de los principales módulos del sistema
                </p>
            </Box>

            <Grid container spacing={3}>
                {reportes.map((reporte) => (
                    <Grid item xs={12} md={4} key={reporte.id}>
                        <ReporteCard {...reporte} />
                    </Grid>
                ))}
            </Grid>
        </Layout>
    );
};

export default ReportesPage;