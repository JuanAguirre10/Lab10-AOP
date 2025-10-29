import api from './api';

export const getAllMedicos = () => api.get('/medicos');

export const getMedicoById = (id) => api.get(`/medicos/${id}`);

export const createMedico = (medico) => api.post('/medicos', medico);

export const updateMedico = (id, medico) => api.put(`/medicos/${id}`, medico);

export const deleteMedico = (id) => api.delete(`/medicos/${id}`);

export const getMedicosByEstado = (estado) => api.get(`/medicos/estado/${estado}`);

export const getMedicoByColegiatura = (colegiatura) => api.get(`/medicos/colegiatura/${colegiatura}`);