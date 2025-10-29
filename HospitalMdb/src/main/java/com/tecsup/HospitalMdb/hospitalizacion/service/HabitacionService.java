package com.tecsup.HospitalMdb.hospitalizacion.service;

import com.tecsup.HospitalMdb.hospitalizacion.models.Habitacion;

import java.util.List;

public interface HabitacionService {
    List<Habitacion> listarTodos();
    Habitacion buscarPorId(String id);
    Habitacion guardar(Habitacion habitacion);
    void eliminar(String id);
    List<Habitacion> buscarPorEstado(String estado);
    List<Habitacion> buscarPorTipo(String tipo);
    Habitacion buscarPorNumero(String numero);
}