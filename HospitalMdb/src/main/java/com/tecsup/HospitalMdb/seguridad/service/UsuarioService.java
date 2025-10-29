package com.tecsup.HospitalMdb.seguridad.service;

import com.tecsup.HospitalMdb.seguridad.models.Usuario;

import java.util.List;

public interface UsuarioService {
    List<Usuario> listarTodos();
    Usuario buscarPorId(String id);
    Usuario guardar(Usuario usuario);
    void eliminar(String id);
    Usuario buscarPorNombreUsuario(String nombreUsuario);
    Usuario login(String nombreUsuario, String contrasena);
    void inicializarUsuarioAdmin();
}