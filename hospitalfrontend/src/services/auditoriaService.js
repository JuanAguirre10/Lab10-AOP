import api from './api';

const BASE_PATH = '/auditorias';

export const getAllAuditorias = () => api.get(BASE_PATH);

export const getAuditoriaById = (id) => api.get(`${BASE_PATH}/${id}`);

export const getAuditoriaByUsuario = (usuario) => api.get(`${BASE_PATH}/usuario/${usuario}`);

export const getAuditoriaByAccion = (accion) => api.get(`${BASE_PATH}/accion/${accion}`);

export const getAuditoriaByTabla = (tabla) => api.get(`${BASE_PATH}/tabla/${tabla}`);

export const getAuditoriaByFechaRango = (inicio, fin) => 
    api.get(`${BASE_PATH}/rango?inicio=${inicio}&fin=${fin}`);

export const getAuditoriaByRegistro = (id) => api.get(`${BASE_PATH}/registro/${id}`);

export const getAuditoriaByTablaYAccion = (tabla, accion) => 
    api.get(`${BASE_PATH}/filtro?tabla=${tabla}&accion=${accion}`);

export const getEstadisticas = () => api.get(`${BASE_PATH}/estadisticas`);