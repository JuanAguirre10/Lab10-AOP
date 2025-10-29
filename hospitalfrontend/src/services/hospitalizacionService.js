import api from './api';

export const getAllHospitalizaciones = () => api.get('/hospitalizaciones');

export const getHospitalizacionById = (id) => api.get(`/hospitalizaciones/${id}`);

export const createHospitalizacion = (hospitalizacion) => {
    // Transformar del formato del frontend al backend
    const hospitalizacionBackend = {
        idPaciente: hospitalizacion.idPaciente,
        idHabitacion: hospitalizacion.idHabitacion,
        fechaIngreso: hospitalizacion.fechaIngreso,
        fechaAlta: hospitalizacion.fechaAlta || null,
        diagnosticoIngreso: hospitalizacion.diagnostico,
        estado: hospitalizacion.estado || 'activo',
    };
    return api.post('/hospitalizaciones', hospitalizacionBackend);
};

export const updateHospitalizacion = (id, hospitalizacion) => {
    // Transformar del formato del frontend al backend
    const hospitalizacionBackend = {
        idPaciente: hospitalizacion.idPaciente,
        idHabitacion: hospitalizacion.idHabitacion,
        fechaIngreso: hospitalizacion.fechaIngreso,
        fechaAlta: hospitalizacion.fechaAlta || null,
        diagnosticoIngreso: hospitalizacion.diagnostico,
        estado: hospitalizacion.estado || 'activo',
    };
    return api.put(`/hospitalizaciones/${id}`, hospitalizacionBackend);
};

export const deleteHospitalizacion = (id) => api.delete(`/hospitalizaciones/${id}`);

export const getHospitalizacionesByPaciente = (idPaciente) => api.get(`/hospitalizaciones/paciente/${idPaciente}`);

export const getHospitalizacionesByEstado = (estado) => api.get(`/hospitalizaciones/estado/${estado}`);