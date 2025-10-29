package com.tecsup.HospitalMdb.consultas.controller;

import com.tecsup.HospitalMdb.consultas.models.DetalleReceta;
import com.tecsup.HospitalMdb.consultas.service.DetalleRecetaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/detalle-recetas")
public class DetalleRecetaController {

    @Autowired
    private DetalleRecetaService detalleRecetaService;

    @GetMapping
    public List<DetalleReceta> listarTodos() {
        return detalleRecetaService.listarTodos();
    }

    @GetMapping("/{id}")
    public DetalleReceta buscarPorId(@PathVariable String id) {
        return detalleRecetaService.buscarPorId(id);
    }

    @PostMapping
    public DetalleReceta guardar(@RequestBody DetalleReceta detalleReceta) {
        return detalleRecetaService.guardar(detalleReceta);
    }

    @PutMapping("/{id}")
    public DetalleReceta actualizar(@PathVariable String id, @RequestBody DetalleReceta detalleReceta) {
        detalleReceta.setId(id);
        return detalleRecetaService.guardar(detalleReceta);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable String id) {
        detalleRecetaService.eliminar(id);
    }

    @GetMapping("/receta/{idReceta}")
    public List<DetalleReceta> buscarPorIdReceta(@PathVariable String idReceta) {
        return detalleRecetaService.buscarPorIdReceta(idReceta);
    }
}