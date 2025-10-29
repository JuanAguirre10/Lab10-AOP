import api from './api';

const downloadFile = async (endpoint, filename) => {
    try {
        const response = await api.get(endpoint, {
            responseType: 'blob'
        });

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Error al descargar archivo:', error);
        throw error;
    }
};

// Pacientes
export const descargarPacientesPDF = () => 
    downloadFile('/pacientes/reporte/pdf', `Reporte_Pacientes_${new Date().getTime()}.pdf`);

export const descargarPacientesExcel = () => 
    downloadFile('/pacientes/reporte/excel', `Reporte_Pacientes_${new Date().getTime()}.xlsx`);

// Citas
export const descargarCitasPDF = () => 
    downloadFile('/citas/reporte/pdf', `Reporte_Citas_${new Date().getTime()}.pdf`);

export const descargarCitasExcel = () => 
    downloadFile('/citas/reporte/excel', `Reporte_Citas_${new Date().getTime()}.xlsx`);

// Consultas
export const descargarConsultasPDF = () => 
    downloadFile('/consultas/reporte/pdf', `Reporte_Consultas_${new Date().getTime()}.pdf`);

export const descargarConsultasExcel = () => 
    downloadFile('/consultas/reporte/excel', `Reporte_Consultas_${new Date().getTime()}.xlsx`);