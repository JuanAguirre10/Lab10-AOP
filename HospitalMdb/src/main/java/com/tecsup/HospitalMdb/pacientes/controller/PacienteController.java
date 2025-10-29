package com.tecsup.HospitalMdb.pacientes.controller;

import com.tecsup.HospitalMdb.pacientes.models.Paciente;
import com.tecsup.HospitalMdb.pacientes.service.PacienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import com.tecsup.HospitalMdb.pacientes.views.PacientesPdfView;
import com.tecsup.HospitalMdb.pacientes.views.PacientesXlsView;
import java.util.HashMap;
import java.util.Map;

import java.util.List;

@RestController
@RequestMapping("/api/pacientes")
public class PacienteController {

    @Autowired
    private PacienteService pacienteService;

    @GetMapping
    public List<Paciente> listarTodos() {
        return pacienteService.listarTodos();
    }

    @GetMapping("/{id}")
    public Paciente buscarPorId(@PathVariable String id) {
        return pacienteService.buscarPorId(id);
    }

    @PostMapping
    public Paciente guardar(@RequestBody Paciente paciente) {
        return pacienteService.guardar(paciente);
    }

    @PutMapping("/{id}")
    public Paciente actualizar(@PathVariable String id, @RequestBody Paciente paciente) {
        paciente.setId(id);
        return pacienteService.guardar(paciente);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable String id) {
        pacienteService.eliminar(id);
    }

    @GetMapping("/estado/{estado}")
    public List<Paciente> buscarPorEstado(@PathVariable String estado) {
        return pacienteService.buscarPorEstado(estado);
    }

    @GetMapping("/dni/{dni}")
    public Paciente buscarPorDni(@PathVariable String dni) {
        return pacienteService.buscarPorDni(dni);
    }

    /**
     * Generar reporte de pacientes en PDF
     * GET /api/pacientes/reporte/pdf
     */
    @GetMapping("/reporte/pdf")
    public ModelAndView generarReportePdf() {
        List<Paciente> pacientes = pacienteService.listarTodos();

        Map<String, Object> model = new HashMap<>();
        model.put("pacientes", pacientes);

        return new ModelAndView(new PacientesPdfView(), model);
    }

    /**
     * Generar reporte de pacientes en Excel
     * GET /api/pacientes/reporte/excel
     */
    @GetMapping("/reporte/excel")
    public ModelAndView generarReporteExcel() {
        List<Paciente> pacientes = pacienteService.listarTodos();

        Map<String, Object> model = new HashMap<>();
        model.put("pacientes", pacientes);

        return new ModelAndView(new PacientesXlsView(), model);
    }
}