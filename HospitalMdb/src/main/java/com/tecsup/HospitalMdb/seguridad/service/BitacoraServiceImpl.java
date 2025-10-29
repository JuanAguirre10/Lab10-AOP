package com.tecsup.HospitalMdb.seguridad.service;

import com.tecsup.HospitalMdb.seguridad.dao.BitacoraDAO;
import com.tecsup.HospitalMdb.seguridad.models.Bitacora;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class BitacoraServiceImpl implements BitacoraService {

    @Autowired
    private BitacoraDAO bitacoraDAO;

    @Override
    public List<Bitacora> listarTodos() {
        return bitacoraDAO.findAll();
    }

    @Override
    public Bitacora buscarPorId(String id) {
        return bitacoraDAO.findById(id).orElse(null);
    }

    @Override
    public Bitacora guardar(Bitacora bitacora) {
        return bitacoraDAO.save(bitacora);
    }

    @Override
    public void eliminar(String id) {
        bitacoraDAO.deleteById(id);
    }

    @Override
    public List<Bitacora> buscarPorIdUsuario(String idUsuario) {
        return bitacoraDAO.findByIdUsuario(idUsuario);
    }

    @Override
    public void registrarAccion(String idUsuario, String accion) {
        Bitacora bitacora = new Bitacora();
        bitacora.setIdUsuario(idUsuario);
        bitacora.setAccion(accion);
        bitacora.setFechaHora(LocalDateTime.now());
        bitacoraDAO.save(bitacora);
    }
}