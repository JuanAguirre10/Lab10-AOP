package com.tecsup.HospitalMdb.medicos.dao;

import com.tecsup.HospitalMdb.medicos.models.MedicoEspecialidad;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MedicoEspecialidadDAO extends MongoRepository<MedicoEspecialidad, String> {
    List<MedicoEspecialidad> findByIdMedico(String idMedico);
    List<MedicoEspecialidad> findByIdEspecialidad(String idEspecialidad);
}