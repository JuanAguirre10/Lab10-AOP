package com.tecsup.HospitalMdb.pacientes.controller;

import com.tecsup.HospitalMdb.pacientes.models.HistoriaClinica;
import com.tecsup.HospitalMdb.pacientes.service.HistoriaClinicaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/historias")
public class HistoriaClinicaController {

    @Autowired
    private HistoriaClinicaService historiaClinicaService;

    @GetMapping
    public List<HistoriaClinica> listarTodos() {
        return historiaClinicaService.listarTodos();
    }

    @GetMapping("/{id}")
    public HistoriaClinica buscarPorId(@PathVariable String id) {
        return historiaClinicaService.buscarPorId(id);
    }

    @PostMapping
    public HistoriaClinica guardar(@RequestBody HistoriaClinica historiaClinica) {
        return historiaClinicaService.guardar(historiaClinica);
    }

    @PutMapping("/{id}")
    public HistoriaClinica actualizar(@PathVariable String id, @RequestBody HistoriaClinica historiaClinica) {
        historiaClinica.setId(id);
        return historiaClinicaService.guardar(historiaClinica);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable String id) {
        historiaClinicaService.eliminar(id);
    }

    @GetMapping("/paciente/{idPaciente}")
    public HistoriaClinica buscarPorIdPaciente(@PathVariable String idPaciente) {
        return historiaClinicaService.buscarPorIdPaciente(idPaciente);
    }
}