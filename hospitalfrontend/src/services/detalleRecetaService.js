import api from './api';

export const getAllDetallesReceta = () => api.get('/detalle-recetas');

export const getDetalleRecetaById = (id) => api.get(`/detalle-recetas/${id}`);

export const getDetallesRecetaByReceta = (idReceta) => api.get(`/detalle-recetas/receta/${idReceta}`);

export const createDetalleReceta = (detalle) => api.post('/detalle-recetas', detalle);

export const updateDetalleReceta = (id, detalle) => api.put(`/detalle-recetas/${id}`, detalle);

export const deleteDetalleReceta = (id) => api.delete(`/detalle-recetas/${id}`);