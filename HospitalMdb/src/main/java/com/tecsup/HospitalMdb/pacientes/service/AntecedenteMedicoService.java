package com.tecsup.HospitalMdb.pacientes.service;

import com.tecsup.HospitalMdb.pacientes.models.AntecedenteMedico;

import java.util.List;

public interface AntecedenteMedicoService {
    List<AntecedenteMedico> listarTodos();
    AntecedenteMedico buscarPorId(String id);
    AntecedenteMedico guardar(AntecedenteMedico antecedenteMedico);
    void eliminar(String id);
    List<AntecedenteMedico> buscarPorIdHistoria(String idHistoria);
}