package com.tecsup.HospitalMdb.pacientes.dao;

import com.tecsup.HospitalMdb.pacientes.models.Paciente;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PacienteDAO extends MongoRepository<Paciente, String> {
    List<Paciente> findByEstado(String estado);
    Paciente findByDni(String dni);
}