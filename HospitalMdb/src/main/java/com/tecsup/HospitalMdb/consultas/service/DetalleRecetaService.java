package com.tecsup.HospitalMdb.consultas.service;

import com.tecsup.HospitalMdb.consultas.models.DetalleReceta;

import java.util.List;

public interface DetalleRecetaService {
    List<DetalleReceta> listarTodos();
    DetalleReceta buscarPorId(String id);
    DetalleReceta guardar(DetalleReceta detalleReceta);
    void eliminar(String id);
    List<DetalleReceta> buscarPorIdReceta(String idReceta);
}