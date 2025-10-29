import api from './api';

export const getAllRecetas = () => api.get('/recetas');

export const getRecetaById = (id) => api.get(`/recetas/${id}`);

export const getRecetasByConsulta = (idConsulta) => api.get(`/recetas/consulta/${idConsulta}`);

export const createReceta = (receta) => api.post('/recetas', receta);

export const updateReceta = (id, receta) => api.put(`/recetas/${id}`, receta);

export const deleteReceta = (id) => api.delete(`/recetas/${id}`);