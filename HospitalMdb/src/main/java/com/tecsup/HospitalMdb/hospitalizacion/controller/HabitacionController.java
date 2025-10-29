package com.tecsup.HospitalMdb.hospitalizacion.controller;

import com.tecsup.HospitalMdb.hospitalizacion.models.Habitacion;
import com.tecsup.HospitalMdb.hospitalizacion.service.HabitacionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/habitaciones")
public class HabitacionController {

    @Autowired
    private HabitacionService habitacionService;

    @GetMapping
    public List<Habitacion> listarTodos() {
        return habitacionService.listarTodos();
    }

    @GetMapping("/{id}")
    public Habitacion buscarPorId(@PathVariable String id) {
        return habitacionService.buscarPorId(id);
    }

    @PostMapping
    public Habitacion guardar(@RequestBody Habitacion habitacion) {
        return habitacionService.guardar(habitacion);
    }

    @PutMapping("/{id}")
    public Habitacion actualizar(@PathVariable String id, @RequestBody Habitacion habitacion) {
        habitacion.setId(id);
        return habitacionService.guardar(habitacion);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable String id) {
        habitacionService.eliminar(id);
    }

    @GetMapping("/estado/{estado}")
    public List<Habitacion> buscarPorEstado(@PathVariable String estado) {
        return habitacionService.buscarPorEstado(estado);
    }

    @GetMapping("/tipo/{tipo}")
    public List<Habitacion> buscarPorTipo(@PathVariable String tipo) {
        return habitacionService.buscarPorTipo(tipo);
    }

    @GetMapping("/numero/{numero}")
    public Habitacion buscarPorNumero(@PathVariable String numero) {
        return habitacionService.buscarPorNumero(numero);
    }
}