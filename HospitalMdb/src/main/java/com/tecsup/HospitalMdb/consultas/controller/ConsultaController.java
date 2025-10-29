package com.tecsup.HospitalMdb.consultas.controller;

import com.tecsup.HospitalMdb.consultas.models.Consulta;
import com.tecsup.HospitalMdb.consultas.service.ConsultaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import org.springframework.web.servlet.ModelAndView;
import com.tecsup.HospitalMdb.consultas.views.ConsultasPdfView;
import com.tecsup.HospitalMdb.consultas.views.ConsultasXlsView;
import java.util.HashMap;
import java.util.Map;
import com.tecsup.HospitalMdb.consultas.models.ConsultaDTO;

@RestController
@RequestMapping("/api/consultas")
public class ConsultaController {

    @Autowired
    private ConsultaService consultaService;

    @GetMapping
    public List<Consulta> listarTodos() {
        return consultaService.listarTodos();
    }

    @GetMapping("/{id}")
    public Consulta buscarPorId(@PathVariable String id) {
        return consultaService.buscarPorId(id);
    }

    @PostMapping
    public Consulta guardar(@RequestBody Consulta consulta) {
        return consultaService.guardar(consulta);
    }

    @PutMapping("/{id}")
    public Consulta actualizar(@PathVariable String id, @RequestBody Consulta consulta) {
        consulta.setId(id);
        return consultaService.guardar(consulta);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable String id) {
        consultaService.eliminar(id);
    }

    @GetMapping("/paciente/{idPaciente}")
    public List<Consulta> buscarPorIdPaciente(@PathVariable String idPaciente) {
        return consultaService.buscarPorIdPaciente(idPaciente);
    }

    @GetMapping("/medico/{idMedico}")
    public List<Consulta> buscarPorIdMedico(@PathVariable String idMedico) {
        return consultaService.buscarPorIdMedico(idMedico);
    }

    @GetMapping("/cita/{idCita}")
    public Consulta buscarPorIdCita(@PathVariable String idCita) {
        return consultaService.buscarPorIdCita(idCita);
    }

    @GetMapping("/reporte/pdf")
    public ModelAndView generarReportePdf() {
        List<ConsultaDTO> consultas = consultaService.listarTodosConDetalles();
        Map<String, Object> model = new HashMap<>();
        model.put("consultas", consultas);
        return new ModelAndView(new ConsultasPdfView(), model);
    }

    @GetMapping("/reporte/excel")
    public ModelAndView generarReporteExcel() {
        List<ConsultaDTO> consultas = consultaService.listarTodosConDetalles();
        Map<String, Object> model = new HashMap<>();
        model.put("consultas", consultas);
        return new ModelAndView(new ConsultasXlsView(), model);
    }
}