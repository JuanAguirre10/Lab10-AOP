package com.tecsup.HospitalMdb.pacientes.dao;

import com.tecsup.HospitalMdb.pacientes.models.HistoriaClinica;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HistoriaClinicaDAO extends MongoRepository<HistoriaClinica, String> {
    HistoriaClinica findByIdPaciente(String idPaciente);
    List<HistoriaClinica> findAllByIdPaciente(String idPaciente);
}