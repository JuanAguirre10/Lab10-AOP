package com.tecsup.HospitalMdb.pacientes.service;

import com.tecsup.HospitalMdb.pacientes.models.Paciente;

import java.util.List;

public interface PacienteService {
    List<Paciente> listarTodos();
    Paciente buscarPorId(String id);
    Paciente guardar(Paciente paciente);
    void eliminar(String id);
    List<Paciente> buscarPorEstado(String estado);
    Paciente buscarPorDni(String dni);
}