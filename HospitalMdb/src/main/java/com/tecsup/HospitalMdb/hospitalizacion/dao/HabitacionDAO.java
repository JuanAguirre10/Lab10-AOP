package com.tecsup.HospitalMdb.hospitalizacion.dao;

import com.tecsup.HospitalMdb.hospitalizacion.models.Habitacion;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HabitacionDAO extends MongoRepository<Habitacion, String> {
    List<Habitacion> findByEstado(String estado);
    List<Habitacion> findByTipo(String tipo);
    Habitacion findByNumero(String numero);
}