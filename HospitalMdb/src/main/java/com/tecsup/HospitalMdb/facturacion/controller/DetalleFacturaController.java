package com.tecsup.HospitalMdb.facturacion.controller;

import com.tecsup.HospitalMdb.facturacion.models.DetalleFactura;
import com.tecsup.HospitalMdb.facturacion.service.DetalleFacturaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/detalle-facturas")
public class DetalleFacturaController {

    @Autowired
    private DetalleFacturaService detalleFacturaService;

    @GetMapping
    public List<DetalleFactura> listarTodos() {
        return detalleFacturaService.listarTodos();
    }

    @GetMapping("/{id}")
    public DetalleFactura buscarPorId(@PathVariable String id) {
        return detalleFacturaService.buscarPorId(id);
    }

    @PostMapping
    public DetalleFactura guardar(@RequestBody DetalleFactura detalleFactura) {
        return detalleFacturaService.guardar(detalleFactura);
    }

    @PutMapping("/{id}")
    public DetalleFactura actualizar(@PathVariable String id, @RequestBody DetalleFactura detalleFactura) {
        detalleFactura.setId(id);
        return detalleFacturaService.guardar(detalleFactura);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable String id) {
        detalleFacturaService.eliminar(id);
    }

    @GetMapping("/factura/{idFactura}")
    public List<DetalleFactura> buscarPorIdFactura(@PathVariable String idFactura) {
        return detalleFacturaService.buscarPorIdFactura(idFactura);
    }
}