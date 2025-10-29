package com.tecsup.HospitalMdb.medicos.service;

import com.tecsup.HospitalMdb.medicos.dao.MedicoDAO;
import com.tecsup.HospitalMdb.medicos.models.Medico;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MedicoServiceImpl implements MedicoService {

    @Autowired
    private MedicoDAO medicoDAO;

    @Override
    public List<Medico> listarTodos() {
        return medicoDAO.findAll();
    }

    @Override
    public Medico buscarPorId(String id) {
        return medicoDAO.findById(id).orElse(null);
    }

    @Override
    public Medico guardar(Medico medico) {
        return medicoDAO.save(medico);
    }

    @Override
    public void eliminar(String id) {
        medicoDAO.deleteById(id);
    }

    @Override
    public List<Medico> buscarPorEstado(String estado) {
        return medicoDAO.findByEstado(estado);
    }

    @Override
    public Medico buscarPorColegiatura(String colegiatura) {
        return medicoDAO.findByColegiatura(colegiatura);
    }
}