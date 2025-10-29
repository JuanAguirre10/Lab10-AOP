package com.tecsup.HospitalMdb.medicos.service;

import com.tecsup.HospitalMdb.medicos.dao.MedicoEspecialidadDAO;
import com.tecsup.HospitalMdb.medicos.models.MedicoEspecialidad;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MedicoEspecialidadServiceImpl implements MedicoEspecialidadService {

    @Autowired
    private MedicoEspecialidadDAO medicoEspecialidadDAO;

    @Override
    public List<MedicoEspecialidad> listarTodos() {
        return medicoEspecialidadDAO.findAll();
    }

    @Override
    public MedicoEspecialidad buscarPorId(String id) {
        return medicoEspecialidadDAO.findById(id).orElse(null);
    }

    @Override
    public MedicoEspecialidad guardar(MedicoEspecialidad medicoEspecialidad) {
        return medicoEspecialidadDAO.save(medicoEspecialidad);
    }

    @Override
    public void eliminar(String id) {
        medicoEspecialidadDAO.deleteById(id);
    }

    @Override
    public List<MedicoEspecialidad> buscarPorIdMedico(String idMedico) {
        return medicoEspecialidadDAO.findByIdMedico(idMedico);
    }

    @Override
    public List<MedicoEspecialidad> buscarPorIdEspecialidad(String idEspecialidad) {
        return medicoEspecialidadDAO.findByIdEspecialidad(idEspecialidad);
    }
}