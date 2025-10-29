package com.tecsup.HospitalMdb.citas.service;

import com.tecsup.HospitalMdb.citas.models.Cita;
import com.tecsup.HospitalMdb.citas.models.CitaDTO;

import java.time.LocalDate;
import java.util.List;

public interface CitaService {
    List<Cita> listarTodos();
    Cita buscarPorId(String id);
    Cita guardar(Cita cita);
    void eliminar(String id);
    List<Cita> buscarPorIdPaciente(String idPaciente);
    List<Cita> buscarPorIdMedico(String idMedico);
    List<Cita> buscarPorEstado(String estado);
    List<Cita> buscarPorFecha(LocalDate fecha);
    List<CitaDTO> listarTodosConDetalles();
}