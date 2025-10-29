package com.tecsup.HospitalMdb.consultas.service;

import com.tecsup.HospitalMdb.consultas.models.RecetaMedica;

import java.util.List;

public interface RecetaMedicaService {
    List<RecetaMedica> listarTodos();
    RecetaMedica buscarPorId(String id);
    RecetaMedica guardar(RecetaMedica recetaMedica);
    void eliminar(String id);
    List<RecetaMedica> buscarPorIdConsulta(String idConsulta);
}