package com.tecsup.HospitalMdb.facturacion.controller;

import com.tecsup.HospitalMdb.facturacion.models.Factura;
import com.tecsup.HospitalMdb.facturacion.service.FacturaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/facturas")
public class FacturaController {

    @Autowired
    private FacturaService facturaService;

    @GetMapping
    public List<Factura> listarTodos() {
        return facturaService.listarTodos();
    }

    @GetMapping("/{id}")
    public Factura buscarPorId(@PathVariable String id) {
        return facturaService.buscarPorId(id);
    }

    @PostMapping
    public Factura guardar(@RequestBody Factura factura) {
        return facturaService.guardar(factura);
    }

    @PutMapping("/{id}")
    public Factura actualizar(@PathVariable String id, @RequestBody Factura factura) {
        factura.setId(id);
        return facturaService.guardar(factura);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable String id) {
        facturaService.eliminar(id);
    }

    @GetMapping("/paciente/{idPaciente}")
    public List<Factura> buscarPorIdPaciente(@PathVariable String idPaciente) {
        return facturaService.buscarPorIdPaciente(idPaciente);
    }

    @GetMapping("/estado/{estado}")
    public List<Factura> buscarPorEstado(@PathVariable String estado) {
        return facturaService.buscarPorEstado(estado);
    }
}