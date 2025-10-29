package com.tecsup.HospitalMdb.medicos.service;

import com.tecsup.HospitalMdb.medicos.dao.EspecialidadDAO;
import com.tecsup.HospitalMdb.medicos.models.Especialidad;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EspecialidadServiceImpl implements EspecialidadService {

    @Autowired
    private EspecialidadDAO especialidadDAO;

    @Override
    public List<Especialidad> listarTodos() {
        return especialidadDAO.findAll();
    }

    @Override
    public Especialidad buscarPorId(String id) {
        return especialidadDAO.findById(id).orElse(null);
    }

    @Override
    public Especialidad guardar(Especialidad especialidad) {
        return especialidadDAO.save(especialidad);
    }

    @Override
    public void eliminar(String id) {
        especialidadDAO.deleteById(id);
    }

    @Override
    public Especialidad buscarPorNombre(String nombre) {
        return especialidadDAO.findByNombre(nombre);
    }
}