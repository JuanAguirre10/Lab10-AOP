package com.tecsup.HospitalMdb.medicos.controller;

import com.tecsup.HospitalMdb.medicos.models.MedicoEspecialidad;
import com.tecsup.HospitalMdb.medicos.service.MedicoEspecialidadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/medico-especialidades")
public class MedicoEspecialidadController {

    @Autowired
    private MedicoEspecialidadService medicoEspecialidadService;

    @GetMapping
    public List<MedicoEspecialidad> listarTodos() {
        return medicoEspecialidadService.listarTodos();
    }

    @GetMapping("/{id}")
    public MedicoEspecialidad buscarPorId(@PathVariable String id) {
        return medicoEspecialidadService.buscarPorId(id);
    }

    @PostMapping
    public MedicoEspecialidad guardar(@RequestBody MedicoEspecialidad medicoEspecialidad) {
        return medicoEspecialidadService.guardar(medicoEspecialidad);
    }

    @PutMapping("/{id}")
    public MedicoEspecialidad actualizar(@PathVariable String id, @RequestBody MedicoEspecialidad medicoEspecialidad) {
        medicoEspecialidad.setId(id);
        return medicoEspecialidadService.guardar(medicoEspecialidad);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable String id) {
        medicoEspecialidadService.eliminar(id);
    }

    @GetMapping("/medico/{idMedico}")
    public List<MedicoEspecialidad> buscarPorIdMedico(@PathVariable String idMedico) {
        return medicoEspecialidadService.buscarPorIdMedico(idMedico);
    }

    @GetMapping("/especialidad/{idEspecialidad}")
    public List<MedicoEspecialidad> buscarPorIdEspecialidad(@PathVariable String idEspecialidad) {
        return medicoEspecialidadService.buscarPorIdEspecialidad(idEspecialidad);
    }
}