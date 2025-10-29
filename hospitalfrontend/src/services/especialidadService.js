import api from './api';

export const getAllEspecialidades = () => api.get('/especialidades');

export const getEspecialidadById = (id) => api.get(`/especialidades/${id}`);

export const createEspecialidad = (especialidad) => api.post('/especialidades', especialidad);

export const updateEspecialidad = (id, especialidad) => api.put(`/especialidades/${id}`, especialidad);

export const deleteEspecialidad = (id) => api.delete(`/especialidades/${id}`);

export const getEspecialidadByNombre = (nombre) => api.get(`/especialidades/nombre/${nombre}`);