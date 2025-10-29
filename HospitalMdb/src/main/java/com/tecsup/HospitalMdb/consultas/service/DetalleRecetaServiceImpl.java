package com.tecsup.HospitalMdb.consultas.service;

import com.tecsup.HospitalMdb.consultas.dao.DetalleRecetaDAO;
import com.tecsup.HospitalMdb.consultas.models.DetalleReceta;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DetalleRecetaServiceImpl implements DetalleRecetaService {

    @Autowired
    private DetalleRecetaDAO detalleRecetaDAO;

    @Override
    public List<DetalleReceta> listarTodos() {
        return detalleRecetaDAO.findAll();
    }

    @Override
    public DetalleReceta buscarPorId(String id) {
        return detalleRecetaDAO.findById(id).orElse(null);
    }

    @Override
    public DetalleReceta guardar(DetalleReceta detalleReceta) {
        return detalleRecetaDAO.save(detalleReceta);
    }

    @Override
    public void eliminar(String id) {
        detalleRecetaDAO.deleteById(id);
    }

    @Override
    public List<DetalleReceta> buscarPorIdReceta(String idReceta) {
        return detalleRecetaDAO.findByIdReceta(idReceta);
    }
}