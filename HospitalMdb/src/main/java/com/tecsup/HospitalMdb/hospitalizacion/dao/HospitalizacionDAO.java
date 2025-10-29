package com.tecsup.HospitalMdb.hospitalizacion.dao;

import com.tecsup.HospitalMdb.hospitalizacion.models.Hospitalizacion;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HospitalizacionDAO extends MongoRepository<Hospitalizacion, String> {
    List<Hospitalizacion> findByIdPaciente(String idPaciente);
    List<Hospitalizacion> findByIdHabitacion(String idHabitacion);
    List<Hospitalizacion> findByEstado(String estado);
}