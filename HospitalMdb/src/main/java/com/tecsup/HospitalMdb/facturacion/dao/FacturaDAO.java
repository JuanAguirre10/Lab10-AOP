package com.tecsup.HospitalMdb.facturacion.dao;

import com.tecsup.HospitalMdb.facturacion.models.Factura;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FacturaDAO extends MongoRepository<Factura, String> {
    List<Factura> findByIdPaciente(String idPaciente);
    List<Factura> findByEstado(String estado);
}