package com.tecsup.HospitalMdb.facturacion.dao;

import com.tecsup.HospitalMdb.facturacion.models.DetalleFactura;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DetalleFacturaDAO extends MongoRepository<DetalleFactura, String> {
    List<DetalleFactura> findByIdFactura(String idFactura);
}