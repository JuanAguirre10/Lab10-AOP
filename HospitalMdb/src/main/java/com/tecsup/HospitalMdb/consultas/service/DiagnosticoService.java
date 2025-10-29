package com.tecsup.HospitalMdb.consultas.service;

import com.tecsup.HospitalMdb.consultas.models.Diagnostico;

import java.util.List;

public interface DiagnosticoService {
    List<Diagnostico> listarTodos();
    Diagnostico buscarPorId(String id);
    Diagnostico guardar(Diagnostico diagnostico);
    void eliminar(String id);
    List<Diagnostico> buscarPorIdConsulta(String idConsulta);
}