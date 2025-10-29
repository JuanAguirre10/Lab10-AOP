import api from './api';

export const getAllFacturas = () => api.get('/facturas');

export const getFacturaById = (id) => api.get(`/facturas/${id}`);

export const createFactura = (factura) => {
    // Transformar del formato del frontend al backend
    const facturaBackend = {
        idPaciente: factura.idPaciente,
        fechaEmision: factura.fecha,
        total: parseFloat(factura.montoTotal),
        estado: factura.estado,
    };
    return api.post('/facturas', facturaBackend);
};

export const updateFactura = (id, factura) => {
    // Transformar del formato del frontend al backend
    const facturaBackend = {
        idPaciente: factura.idPaciente,
        fechaEmision: factura.fecha,
        total: parseFloat(factura.montoTotal),
        estado: factura.estado,
    };
    return api.put(`/facturas/${id}`, facturaBackend);
};

export const deleteFactura = (id) => api.delete(`/facturas/${id}`);

export const getFacturasByPaciente = (idPaciente) => api.get(`/facturas/paciente/${idPaciente}`);

export const getFacturasByEstado = (estado) => api.get(`/facturas/estado/${estado}`);