package com.tecsup.HospitalMdb.pacientes.dao;

import com.tecsup.HospitalMdb.pacientes.models.AntecedenteMedico;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AntecedenteMedicoDAO extends MongoRepository<AntecedenteMedico, String> {
    List<AntecedenteMedico> findByIdHistoria(String idHistoria);
}