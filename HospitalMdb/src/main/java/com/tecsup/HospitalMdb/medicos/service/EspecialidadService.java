package com.tecsup.HospitalMdb.medicos.service;

import com.tecsup.HospitalMdb.medicos.models.Especialidad;

import java.util.List;

public interface EspecialidadService {
    List<Especialidad> listarTodos();
    Especialidad buscarPorId(String id);
    Especialidad guardar(Especialidad especialidad);
    void eliminar(String id);
    Especialidad buscarPorNombre(String nombre);
}