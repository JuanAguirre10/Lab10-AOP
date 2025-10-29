package com.tecsup.HospitalMdb.consultas.dao;

import com.tecsup.HospitalMdb.consultas.models.RecetaMedica;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecetaMedicaDAO extends MongoRepository<RecetaMedica, String> {
    List<RecetaMedica> findByIdConsulta(String idConsulta);
}