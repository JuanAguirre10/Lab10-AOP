package com.tecsup.HospitalMdb.hospitalizacion.service;

import com.tecsup.HospitalMdb.hospitalizacion.models.Hospitalizacion;

import java.util.List;

public interface HospitalizacionService {
    List<Hospitalizacion> listarTodos();
    Hospitalizacion buscarPorId(String id);
    Hospitalizacion guardar(Hospitalizacion hospitalizacion);
    void eliminar(String id);
    List<Hospitalizacion> buscarPorIdPaciente(String idPaciente);
    List<Hospitalizacion> buscarPorIdHabitacion(String idHabitacion);
    List<Hospitalizacion> buscarPorEstado(String estado);
}