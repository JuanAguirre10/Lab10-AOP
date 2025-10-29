package com.tecsup.HospitalMdb.hospitalizacion.controller;

import com.tecsup.HospitalMdb.hospitalizacion.models.Hospitalizacion;
import com.tecsup.HospitalMdb.hospitalizacion.service.HospitalizacionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hospitalizaciones")
public class HospitalizacionController {

    @Autowired
    private HospitalizacionService hospitalizacionService;

    @GetMapping
    public List<Hospitalizacion> listarTodos() {
        return hospitalizacionService.listarTodos();
    }

    @GetMapping("/{id}")
    public Hospitalizacion buscarPorId(@PathVariable String id) {
        return hospitalizacionService.buscarPorId(id);
    }

    @PostMapping
    public Hospitalizacion guardar(@RequestBody Hospitalizacion hospitalizacion) {
        return hospitalizacionService.guardar(hospitalizacion);
    }

    @PutMapping("/{id}")
    public Hospitalizacion actualizar(@PathVariable String id, @RequestBody Hospitalizacion hospitalizacion) {
        hospitalizacion.setId(id);
        return hospitalizacionService.guardar(hospitalizacion);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable String id) {
        hospitalizacionService.eliminar(id);
    }

    @GetMapping("/paciente/{idPaciente}")
    public List<Hospitalizacion> buscarPorIdPaciente(@PathVariable String idPaciente) {
        return hospitalizacionService.buscarPorIdPaciente(idPaciente);
    }

    @GetMapping("/habitacion/{idHabitacion}")
    public List<Hospitalizacion> buscarPorIdHabitacion(@PathVariable String idHabitacion) {
        return hospitalizacionService.buscarPorIdHabitacion(idHabitacion);
    }

    @GetMapping("/estado/{estado}")
    public List<Hospitalizacion> buscarPorEstado(@PathVariable String estado) {
        return hospitalizacionService.buscarPorEstado(estado);
    }
}