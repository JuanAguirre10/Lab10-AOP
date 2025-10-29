package com.tecsup.HospitalMdb.seguridad.dao;

import com.tecsup.HospitalMdb.seguridad.models.Bitacora;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BitacoraDAO extends MongoRepository<Bitacora, String> {
    List<Bitacora> findByIdUsuario(String idUsuario);
}