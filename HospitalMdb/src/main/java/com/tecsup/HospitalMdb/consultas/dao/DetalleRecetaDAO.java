package com.tecsup.HospitalMdb.consultas.dao;

import com.tecsup.HospitalMdb.consultas.models.DetalleReceta;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DetalleRecetaDAO extends MongoRepository<DetalleReceta, String> {
    List<DetalleReceta> findByIdReceta(String idReceta);
}