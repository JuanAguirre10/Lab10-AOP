package com.tecsup.HospitalMdb.consultas.service;

import com.tecsup.HospitalMdb.consultas.dao.DiagnosticoDAO;
import com.tecsup.HospitalMdb.consultas.models.Diagnostico;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DiagnosticoServiceImpl implements DiagnosticoService {

    @Autowired
    private DiagnosticoDAO diagnosticoDAO;

    @Override
    public List<Diagnostico> listarTodos() {
        return diagnosticoDAO.findAll();
    }

    @Override
    public Diagnostico buscarPorId(String id) {
        return diagnosticoDAO.findById(id).orElse(null);
    }

    @Override
    public Diagnostico guardar(Diagnostico diagnostico) {
        return diagnosticoDAO.save(diagnostico);
    }

    @Override
    public void eliminar(String id) {
        diagnosticoDAO.deleteById(id);
    }

    @Override
    public List<Diagnostico> buscarPorIdConsulta(String idConsulta) {
        return diagnosticoDAO.findByIdConsulta(idConsulta);
    }
}