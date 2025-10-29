package com.tecsup.HospitalMdb.medicos.dao;

import com.tecsup.HospitalMdb.medicos.models.Especialidad;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EspecialidadDAO extends MongoRepository<Especialidad, String> {
    Especialidad findByNombre(String nombre);
}