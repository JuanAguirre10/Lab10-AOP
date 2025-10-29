package com.tecsup.HospitalMdb.consultas.service;

import com.tecsup.HospitalMdb.consultas.dao.RecetaMedicaDAO;
import com.tecsup.HospitalMdb.consultas.models.RecetaMedica;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecetaMedicaServiceImpl implements RecetaMedicaService {

    @Autowired
    private RecetaMedicaDAO recetaMedicaDAO;

    @Override
    public List<RecetaMedica> listarTodos() {
        return recetaMedicaDAO.findAll();
    }

    @Override
    public RecetaMedica buscarPorId(String id) {
        return recetaMedicaDAO.findById(id).orElse(null);
    }

    @Override
    public RecetaMedica guardar(RecetaMedica recetaMedica) {
        return recetaMedicaDAO.save(recetaMedica);
    }

    @Override
    public void eliminar(String id) {
        recetaMedicaDAO.deleteById(id);
    }

    @Override
    public List<RecetaMedica> buscarPorIdConsulta(String idConsulta) {
        return recetaMedicaDAO.findByIdConsulta(idConsulta);
    }
}