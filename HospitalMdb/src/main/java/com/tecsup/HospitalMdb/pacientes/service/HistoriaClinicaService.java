package com.tecsup.HospitalMdb.pacientes.service;

import com.tecsup.HospitalMdb.pacientes.models.HistoriaClinica;

import java.util.List;

public interface HistoriaClinicaService {
    List<HistoriaClinica> listarTodos();
    HistoriaClinica buscarPorId(String id);
    HistoriaClinica guardar(HistoriaClinica historiaClinica);
    void eliminar(String id);
    HistoriaClinica buscarPorIdPaciente(String idPaciente);
}