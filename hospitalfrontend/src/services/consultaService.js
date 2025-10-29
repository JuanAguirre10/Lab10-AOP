import api from './api';

export const getAllConsultas = () => api.get('/consultas');

export const getConsultaById = (id) => api.get(`/consultas/${id}`);

export const createConsulta = (consulta) => api.post('/consultas', consulta);

export const updateConsulta = (id, consulta) => api.put(`/consultas/${id}`, consulta);

export const deleteConsulta = (id) => api.delete(`/consultas/${id}`);

export const getConsultasByPaciente = (idPaciente) => api.get(`/consultas/paciente/${idPaciente}`);

export const getConsultasByMedico = (idMedico) => api.get(`/consultas/medico/${idMedico}`);

export const getConsultasByCita = (idCita) => api.get(`/consultas/cita/${idCita}`);