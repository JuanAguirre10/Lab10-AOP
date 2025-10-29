package com.tecsup.HospitalMdb.consultas.dao;

import com.tecsup.HospitalMdb.consultas.models.Consulta;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ConsultaDAO extends MongoRepository<Consulta, String> {
    List<Consulta> findByIdPaciente(String idPaciente);
    List<Consulta> findByIdMedico(String idMedico);
    Consulta findByIdCita(String idCita);
}