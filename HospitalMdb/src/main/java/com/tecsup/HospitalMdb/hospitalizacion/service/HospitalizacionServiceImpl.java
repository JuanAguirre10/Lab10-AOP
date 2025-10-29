package com.tecsup.HospitalMdb.hospitalizacion.service;

import com.tecsup.HospitalMdb.hospitalizacion.dao.HospitalizacionDAO;
import com.tecsup.HospitalMdb.hospitalizacion.models.Hospitalizacion;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HospitalizacionServiceImpl implements HospitalizacionService {

    @Autowired
    private HospitalizacionDAO hospitalizacionDAO;

    @Override
    public List<Hospitalizacion> listarTodos() {
        return hospitalizacionDAO.findAll();
    }

    @Override
    public Hospitalizacion buscarPorId(String id) {
        return hospitalizacionDAO.findById(id).orElse(null);
    }

    @Override
    public Hospitalizacion guardar(Hospitalizacion hospitalizacion) {
        return hospitalizacionDAO.save(hospitalizacion);
    }

    @Override
    public void eliminar(String id) {
        hospitalizacionDAO.deleteById(id);
    }

    @Override
    public List<Hospitalizacion> buscarPorIdPaciente(String idPaciente) {
        return hospitalizacionDAO.findByIdPaciente(idPaciente);
    }

    @Override
    public List<Hospitalizacion> buscarPorIdHabitacion(String idHabitacion) {
        return hospitalizacionDAO.findByIdHabitacion(idHabitacion);
    }

    @Override
    public List<Hospitalizacion> buscarPorEstado(String estado) {
        return hospitalizacionDAO.findByEstado(estado);
    }
}