package com.tecsup.HospitalMdb.citas.dao;

import com.tecsup.HospitalMdb.citas.models.Cita;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface CitaDAO extends MongoRepository<Cita, String> {
    List<Cita> findByIdPaciente(String idPaciente);
    List<Cita> findByIdMedico(String idMedico);
    List<Cita> findByEstado(String estado);
    List<Cita> findByFecha(LocalDate fecha);
}