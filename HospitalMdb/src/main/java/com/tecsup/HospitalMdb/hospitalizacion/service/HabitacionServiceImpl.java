package com.tecsup.HospitalMdb.hospitalizacion.service;

import com.tecsup.HospitalMdb.hospitalizacion.dao.HabitacionDAO;
import com.tecsup.HospitalMdb.hospitalizacion.models.Habitacion;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HabitacionServiceImpl implements HabitacionService {

    @Autowired
    private HabitacionDAO habitacionDAO;

    @Override
    public List<Habitacion> listarTodos() {
        return habitacionDAO.findAll();
    }

    @Override
    public Habitacion buscarPorId(String id) {
        return habitacionDAO.findById(id).orElse(null);
    }

    @Override
    public Habitacion guardar(Habitacion habitacion) {
        return habitacionDAO.save(habitacion);
    }

    @Override
    public void eliminar(String id) {
        habitacionDAO.deleteById(id);
    }

    @Override
    public List<Habitacion> buscarPorEstado(String estado) {
        return habitacionDAO.findByEstado(estado);
    }

    @Override
    public List<Habitacion> buscarPorTipo(String tipo) {
        return habitacionDAO.findByTipo(tipo);
    }

    @Override
    public Habitacion buscarPorNumero(String numero) {
        return habitacionDAO.findByNumero(numero);
    }
}