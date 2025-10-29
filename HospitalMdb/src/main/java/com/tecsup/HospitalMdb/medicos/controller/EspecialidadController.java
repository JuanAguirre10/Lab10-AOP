package com.tecsup.HospitalMdb.medicos.controller;

import com.tecsup.HospitalMdb.medicos.models.Especialidad;
import com.tecsup.HospitalMdb.medicos.service.EspecialidadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/especialidades")
public class EspecialidadController {

    @Autowired
    private EspecialidadService especialidadService;

    @GetMapping
    public List<Especialidad> listarTodos() {
        return especialidadService.listarTodos();
    }

    @GetMapping("/{id}")
    public Especialidad buscarPorId(@PathVariable String id) {
        return especialidadService.buscarPorId(id);
    }

    @PostMapping
    public Especialidad guardar(@RequestBody Especialidad especialidad) {
        return especialidadService.guardar(especialidad);
    }

    @PutMapping("/{id}")
    public Especialidad actualizar(@PathVariable String id, @RequestBody Especialidad especialidad) {
        especialidad.setId(id);
        return especialidadService.guardar(especialidad);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable String id) {
        especialidadService.eliminar(id);
    }

    @GetMapping("/nombre/{nombre}")
    public Especialidad buscarPorNombre(@PathVariable String nombre) {
        return especialidadService.buscarPorNombre(nombre);
    }
}