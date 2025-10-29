package com.tecsup.HospitalMdb.facturacion.service;

import com.tecsup.HospitalMdb.facturacion.dao.FacturaDAO;
import com.tecsup.HospitalMdb.facturacion.models.Factura;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FacturaServiceImpl implements FacturaService {

    @Autowired
    private FacturaDAO facturaDAO;

    @Override
    public List<Factura> listarTodos() {
        return facturaDAO.findAll();
    }

    @Override
    public Factura buscarPorId(String id) {
        return facturaDAO.findById(id).orElse(null);
    }

    @Override
    public Factura guardar(Factura factura) {
        return facturaDAO.save(factura);
    }

    @Override
    public void eliminar(String id) {
        facturaDAO.deleteById(id);
    }

    @Override
    public List<Factura> buscarPorIdPaciente(String idPaciente) {
        return facturaDAO.findByIdPaciente(idPaciente);
    }

    @Override
    public List<Factura> buscarPorEstado(String estado) {
        return facturaDAO.findByEstado(estado);
    }
}