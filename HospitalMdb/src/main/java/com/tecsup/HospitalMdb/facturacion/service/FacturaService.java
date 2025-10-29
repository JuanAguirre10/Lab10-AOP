package com.tecsup.HospitalMdb.facturacion.service;

import com.tecsup.HospitalMdb.facturacion.models.Factura;

import java.util.List;

public interface FacturaService {
    List<Factura> listarTodos();
    Factura buscarPorId(String id);
    Factura guardar(Factura factura);
    void eliminar(String id);
    List<Factura> buscarPorIdPaciente(String idPaciente);
    List<Factura> buscarPorEstado(String estado);
}