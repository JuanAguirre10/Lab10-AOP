package com.tecsup.HospitalMdb.pacientes.service;

import com.tecsup.HospitalMdb.pacientes.dao.HistoriaClinicaDAO;
import com.tecsup.HospitalMdb.pacientes.models.HistoriaClinica;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HistoriaClinicaServiceImpl implements HistoriaClinicaService {

    @Autowired
    private HistoriaClinicaDAO historiaClinicaDAO;

    @Override
    public List<HistoriaClinica> listarTodos() {
        return historiaClinicaDAO.findAll();
    }

    @Override
    public HistoriaClinica buscarPorId(String id) {
        return historiaClinicaDAO.findById(id).orElse(null);
    }

    @Override
    public HistoriaClinica guardar(HistoriaClinica historiaClinica) {
        return historiaClinicaDAO.save(historiaClinica);
    }

    @Override
    public void eliminar(String id) {
        historiaClinicaDAO.deleteById(id);
    }

    @Override
    public HistoriaClinica buscarPorIdPaciente(String idPaciente) {
        return historiaClinicaDAO.findByIdPaciente(idPaciente);
    }
}