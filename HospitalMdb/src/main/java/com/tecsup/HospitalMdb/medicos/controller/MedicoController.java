package com.tecsup.HospitalMdb.medicos.controller;

import com.tecsup.HospitalMdb.medicos.models.Medico;
import com.tecsup.HospitalMdb.medicos.service.MedicoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/medicos")
public class MedicoController {

    @Autowired
    private MedicoService medicoService;

    @GetMapping
    public List<Medico> listarTodos() {
        return medicoService.listarTodos();
    }

    @GetMapping("/{id}")
    public Medico buscarPorId(@PathVariable String id) {
        return medicoService.buscarPorId(id);
    }

    @PostMapping
    public Medico guardar(@RequestBody Medico medico) {
        return medicoService.guardar(medico);
    }

    @PutMapping("/{id}")
    public Medico actualizar(@PathVariable String id, @RequestBody Medico medico) {
        medico.setId(id);
        return medicoService.guardar(medico);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable String id) {
        medicoService.eliminar(id);
    }

    @GetMapping("/estado/{estado}")
    public List<Medico> buscarPorEstado(@PathVariable String estado) {
        return medicoService.buscarPorEstado(estado);
    }

    @GetMapping("/colegiatura/{colegiatura}")
    public Medico buscarPorColegiatura(@PathVariable String colegiatura) {
        return medicoService.buscarPorColegiatura(colegiatura);
    }
}