package com.tecsup.HospitalMdb.facturacion.service;

import com.tecsup.HospitalMdb.facturacion.dao.DetalleFacturaDAO;
import com.tecsup.HospitalMdb.facturacion.models.DetalleFactura;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DetalleFacturaServiceImpl implements DetalleFacturaService {

    @Autowired
    private DetalleFacturaDAO detalleFacturaDAO;

    @Override
    public List<DetalleFactura> listarTodos() {
        return detalleFacturaDAO.findAll();
    }

    @Override
    public DetalleFactura buscarPorId(String id) {
        return detalleFacturaDAO.findById(id).orElse(null);
    }

    @Override
    public DetalleFactura guardar(DetalleFactura detalleFactura) {
        return detalleFacturaDAO.save(detalleFactura);
    }

    @Override
    public void eliminar(String id) {
        detalleFacturaDAO.deleteById(id);
    }

    @Override
    public List<DetalleFactura> buscarPorIdFactura(String idFactura) {
        return detalleFacturaDAO.findByIdFactura(idFactura);
    }
}