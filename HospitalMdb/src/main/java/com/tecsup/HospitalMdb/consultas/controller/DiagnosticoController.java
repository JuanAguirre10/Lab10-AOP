package com.tecsup.HospitalMdb.consultas.controller;

import com.tecsup.HospitalMdb.consultas.models.Diagnostico;
import com.tecsup.HospitalMdb.consultas.service.DiagnosticoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/diagnosticos")
public class DiagnosticoController {

    @Autowired
    private DiagnosticoService diagnosticoService;

    @GetMapping
    public List<Diagnostico> listarTodos() {
        return diagnosticoService.listarTodos();
    }

    @GetMapping("/{id}")
    public Diagnostico buscarPorId(@PathVariable String id) {
        return diagnosticoService.buscarPorId(id);
    }

    @PostMapping
    public Diagnostico guardar(@RequestBody Diagnostico diagnostico) {
        return diagnosticoService.guardar(diagnostico);
    }

    @PutMapping("/{id}")
    public Diagnostico actualizar(@PathVariable String id, @RequestBody Diagnostico diagnostico) {
        diagnostico.setId(id);
        return diagnosticoService.guardar(diagnostico);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable String id) {
        diagnosticoService.eliminar(id);
    }

    @GetMapping("/consulta/{idConsulta}")
    public List<Diagnostico> buscarPorIdConsulta(@PathVariable String idConsulta) {
        return diagnosticoService.buscarPorIdConsulta(idConsulta);
    }
}