package com.tecsup.HospitalMdb.consultas.service;

import com.tecsup.HospitalMdb.consultas.models.Consulta;
import com.tecsup.HospitalMdb.consultas.models.ConsultaDTO;

import java.util.List;

public interface ConsultaService {
    List<Consulta> listarTodos();
    Consulta buscarPorId(String id);
    Consulta guardar(Consulta consulta);
    void eliminar(String id);
    List<Consulta> buscarPorIdPaciente(String idPaciente);
    List<Consulta> buscarPorIdMedico(String idMedico);
    Consulta buscarPorIdCita(String idCita);
    List<ConsultaDTO> listarTodosConDetalles();
}