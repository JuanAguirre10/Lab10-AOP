package com.tecsup.HospitalMdb.pacientes.controller;

import com.tecsup.HospitalMdb.pacientes.models.AntecedenteMedico;
import com.tecsup.HospitalMdb.pacientes.service.AntecedenteMedicoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/antecedentes")
public class AntecedenteMedicoController {

    @Autowired
    private AntecedenteMedicoService antecedenteMedicoService;

    @GetMapping
    public List<AntecedenteMedico> listarTodos() {
        return antecedenteMedicoService.listarTodos();
    }

    @GetMapping("/{id}")
    public AntecedenteMedico buscarPorId(@PathVariable String id) {
        return antecedenteMedicoService.buscarPorId(id);
    }

    @PostMapping
    public AntecedenteMedico guardar(@RequestBody AntecedenteMedico antecedenteMedico) {
        return antecedenteMedicoService.guardar(antecedenteMedico);
    }

    @PutMapping("/{id}")
    public AntecedenteMedico actualizar(@PathVariable String id, @RequestBody AntecedenteMedico antecedenteMedico) {
        antecedenteMedico.setId(id);
        return antecedenteMedicoService.guardar(antecedenteMedico);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable String id) {
        antecedenteMedicoService.eliminar(id);
    }

    @GetMapping("/historia/{idHistoria}")
    public List<AntecedenteMedico> buscarPorIdHistoria(@PathVariable String idHistoria) {
        return antecedenteMedicoService.buscarPorIdHistoria(idHistoria);
    }
}