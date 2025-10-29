package com.tecsup.HospitalMdb.seguridad.controller;

import com.tecsup.HospitalMdb.seguridad.models.Usuario;
import com.tecsup.HospitalMdb.seguridad.service.UsuarioService;
import com.tecsup.HospitalMdb.seguridad.service.BitacoraService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private BitacoraService bitacoraService;

    @GetMapping
    public List<Usuario> listarTodos() {
        return usuarioService.listarTodos();
    }

    @GetMapping("/{id}")
    public Usuario buscarPorId(@PathVariable String id) {
        return usuarioService.buscarPorId(id);
    }

    @PostMapping
    public Usuario guardar(@RequestBody Usuario usuario) {
        Usuario nuevoUsuario = usuarioService.guardar(usuario);
        bitacoraService.registrarAccion("sistema", "Usuario creado: " + usuario.getNombreUsuario());
        return nuevoUsuario;
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> actualizar(@PathVariable String id, @RequestBody Usuario usuario) {
        try {
            usuario.setId(id);
            Usuario usuarioActualizado = usuarioService.guardar(usuario);
            bitacoraService.registrarAccion("sistema", "Usuario actualizado: " + usuario.getNombreUsuario());
            return ResponseEntity.ok(usuarioActualizado);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(@PathVariable String id) {
        try {
            Usuario usuario = usuarioService.buscarPorId(id);
            usuarioService.eliminar(id);
            bitacoraService.registrarAccion("sistema", "Usuario eliminado: " + usuario.getNombreUsuario());
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String nombreUsuario = credentials.get("nombreUsuario");
        String contrasena = credentials.get("contrasena");

        Usuario usuario = usuarioService.login(nombreUsuario, contrasena);

        if (usuario != null) {
            bitacoraService.registrarAccion(usuario.getId(), "Login exitoso");
            return ResponseEntity.ok(usuario);
        } else {
            return ResponseEntity.status(401).body(Map.of("error", "Credenciales inválidas"));
        }
    }
}