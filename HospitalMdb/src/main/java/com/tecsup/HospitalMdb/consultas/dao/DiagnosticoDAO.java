package com.tecsup.HospitalMdb.consultas.dao;

import com.tecsup.HospitalMdb.consultas.models.Diagnostico;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DiagnosticoDAO extends MongoRepository<Diagnostico, String> {
    List<Diagnostico> findByIdConsulta(String idConsulta);
}