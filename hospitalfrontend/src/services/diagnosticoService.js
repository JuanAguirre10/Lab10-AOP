import api from './api';

export const getAllDiagnosticos = () => api.get('/diagnosticos');

export const getDiagnosticoById = (id) => api.get(`/diagnosticos/${id}`);

export const getDiagnosticosByConsulta = (idConsulta) => api.get(`/diagnosticos/consulta/${idConsulta}`);

export const createDiagnostico = (diagnostico) => api.post('/diagnosticos', diagnostico);

export const updateDiagnostico = (id, diagnostico) => api.put(`/diagnosticos/${id}`, diagnostico);

export const deleteDiagnostico = (id) => api.delete(`/diagnosticos/${id}`);