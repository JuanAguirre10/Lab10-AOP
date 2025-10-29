package com.tecsup.HospitalMdb.consultas.controller;

import com.tecsup.HospitalMdb.consultas.models.RecetaMedica;
import com.tecsup.HospitalMdb.consultas.service.RecetaMedicaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recetas")
public class RecetaMedicaController {

    @Autowired
    private RecetaMedicaService recetaMedicaService;

    @GetMapping
    public List<RecetaMedica> listarTodos() {
        return recetaMedicaService.listarTodos();
    }

    @GetMapping("/{id}")
    public RecetaMedica buscarPorId(@PathVariable String id) {
        return recetaMedicaService.buscarPorId(id);
    }

    @PostMapping
    public RecetaMedica guardar(@RequestBody RecetaMedica recetaMedica) {
        return recetaMedicaService.guardar(recetaMedica);
    }

    @PutMapping("/{id}")
    public RecetaMedica actualizar(@PathVariable String id, @RequestBody RecetaMedica recetaMedica) {
        recetaMedica.setId(id);
        return recetaMedicaService.guardar(recetaMedica);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable String id) {
        recetaMedicaService.eliminar(id);
    }

    @GetMapping("/consulta/{idConsulta}")
    public List<RecetaMedica> buscarPorIdConsulta(@PathVariable String idConsulta) {
        return recetaMedicaService.buscarPorIdConsulta(idConsulta);
    }
}