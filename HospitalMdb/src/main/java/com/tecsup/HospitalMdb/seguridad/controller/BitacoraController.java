package com.tecsup.HospitalMdb.seguridad.controller;

import com.tecsup.HospitalMdb.seguridad.models.Bitacora;
import com.tecsup.HospitalMdb.seguridad.service.BitacoraService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bitacoras")
public class BitacoraController {

    @Autowired
    private BitacoraService bitacoraService;

    @GetMapping
    public List<Bitacora> listarTodos() {
        return bitacoraService.listarTodos();
    }

    @GetMapping("/{id}")
    public Bitacora buscarPorId(@PathVariable String id) {
        return bitacoraService.buscarPorId(id);
    }

    @PostMapping
    public Bitacora guardar(@RequestBody Bitacora bitacora) {
        return bitacoraService.guardar(bitacora);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable String id) {
        bitacoraService.eliminar(id);
    }

    @GetMapping("/usuario/{idUsuario}")
    public List<Bitacora> buscarPorIdUsuario(@PathVariable String idUsuario) {
        return bitacoraService.buscarPorIdUsuario(idUsuario);
    }
}