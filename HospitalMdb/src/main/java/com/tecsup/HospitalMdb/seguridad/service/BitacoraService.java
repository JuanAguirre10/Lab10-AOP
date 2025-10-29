package com.tecsup.HospitalMdb.seguridad.service;

import com.tecsup.HospitalMdb.seguridad.models.Bitacora;

import java.util.List;

public interface BitacoraService {
    List<Bitacora> listarTodos();
    Bitacora buscarPorId(String id);
    Bitacora guardar(Bitacora bitacora);
    void eliminar(String id);
    List<Bitacora> buscarPorIdUsuario(String idUsuario);
    void registrarAccion(String idUsuario, String accion);
}