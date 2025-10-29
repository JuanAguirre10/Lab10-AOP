package com.tecsup.HospitalMdb.medicos.service;

import com.tecsup.HospitalMdb.medicos.models.MedicoEspecialidad;

import java.util.List;

public interface MedicoEspecialidadService {
    List<MedicoEspecialidad> listarTodos();
    MedicoEspecialidad buscarPorId(String id);
    MedicoEspecialidad guardar(MedicoEspecialidad medicoEspecialidad);
    void eliminar(String id);
    List<MedicoEspecialidad> buscarPorIdMedico(String idMedico);
    List<MedicoEspecialidad> buscarPorIdEspecialidad(String idEspecialidad);
}