package com.tecsup.HospitalMdb.facturacion.service;

import com.tecsup.HospitalMdb.facturacion.models.DetalleFactura;

import java.util.List;

public interface DetalleFacturaService {
    List<DetalleFactura> listarTodos();
    DetalleFactura buscarPorId(String id);
    DetalleFactura guardar(DetalleFactura detalleFactura);
    void eliminar(String id);
    List<DetalleFactura> buscarPorIdFactura(String idFactura);
}