package com.tecsup.HospitalMdb.pacientes.service;

import com.tecsup.HospitalMdb.pacientes.dao.AntecedenteMedicoDAO;
import com.tecsup.HospitalMdb.pacientes.models.AntecedenteMedico;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AntecedenteMedicoServiceImpl implements AntecedenteMedicoService {

    @Autowired
    private AntecedenteMedicoDAO antecedenteMedicoDAO;

    @Override
    public List<AntecedenteMedico> listarTodos() {
        return antecedenteMedicoDAO.findAll();
    }

    @Override
    public AntecedenteMedico buscarPorId(String id) {
        return antecedenteMedicoDAO.findById(id).orElse(null);
    }

    @Override
    public AntecedenteMedico guardar(AntecedenteMedico antecedenteMedico) {
        return antecedenteMedicoDAO.save(antecedenteMedico);
    }

    @Override
    public void eliminar(String id) {
        antecedenteMedicoDAO.deleteById(id);
    }

    @Override
    public List<AntecedenteMedico> buscarPorIdHistoria(String idHistoria) {
        return antecedenteMedicoDAO.findByIdHistoria(idHistoria);
    }
}