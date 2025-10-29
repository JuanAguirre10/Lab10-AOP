package com.tecsup.HospitalMdb.medicos.service;

import com.tecsup.HospitalMdb.medicos.models.Medico;

import java.util.List;

public interface MedicoService {
    List<Medico> listarTodos();
    Medico buscarPorId(String id);
    Medico guardar(Medico medico);
    void eliminar(String id);
    List<Medico> buscarPorEstado(String estado);
    Medico buscarPorColegiatura(String colegiatura);
}