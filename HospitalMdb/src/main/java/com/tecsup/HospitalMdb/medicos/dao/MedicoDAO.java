package com.tecsup.HospitalMdb.medicos.dao;

import com.tecsup.HospitalMdb.medicos.models.Medico;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MedicoDAO extends MongoRepository<Medico, String> {
    List<Medico> findByEstado(String estado);
    Medico findByColegiatura(String colegiatura);
}