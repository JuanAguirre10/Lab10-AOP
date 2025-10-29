import api from './api';

export const getAllHabitaciones = () => api.get('/habitaciones');

export const getHabitacionById = (id) => api.get(`/habitaciones/${id}`);

export const createHabitacion = (habitacion) => api.post('/habitaciones', habitacion);

export const updateHabitacion = (id, habitacion) => api.put(`/habitaciones/${id}`, habitacion);

export const deleteHabitacion = (id) => api.delete(`/habitaciones/${id}`);

export const getHabitacionesByEstado = (estado) => api.get(`/habitaciones/estado/${estado}`);

export const getHabitacionesByTipo = (tipo) => api.get(`/habitaciones/tipo/${tipo}`);