package com.tecsup.HospitalMdb.pacientes.service;

import com.tecsup.HospitalMdb.pacientes.dao.PacienteDAO;
import com.tecsup.HospitalMdb.pacientes.models.Paciente;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PacienteServiceImpl implements PacienteService {

    @Autowired
    private PacienteDAO pacienteDAO;

    @Override
    public List<Paciente> listarTodos() {
        return pacienteDAO.findAll();
    }

    @Override
    public Paciente buscarPorId(String id) {
        return pacienteDAO.findById(id).orElse(null);
    }

    @Override
    public Paciente guardar(Paciente paciente) {
        return pacienteDAO.save(paciente);
    }

    @Override
    public void eliminar(String id) {
        pacienteDAO.deleteById(id);
    }

    @Override
    public List<Paciente> buscarPorEstado(String estado) {
        return pacienteDAO.findByEstado(estado);
    }

    @Override
    public Paciente buscarPorDni(String dni) {
        return pacienteDAO.findByDni(dni);
    }
}