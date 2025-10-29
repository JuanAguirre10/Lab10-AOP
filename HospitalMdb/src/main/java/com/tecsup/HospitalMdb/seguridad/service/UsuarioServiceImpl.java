package com.tecsup.HospitalMdb.seguridad.service;

import com.tecsup.HospitalMdb.seguridad.dao.UsuarioDAO;
import com.tecsup.HospitalMdb.seguridad.models.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import java.util.List;

@Service
public class UsuarioServiceImpl implements UsuarioService {

    @Autowired
    private UsuarioDAO usuarioDAO;

    private static final String ADMIN_USERNAME = "juan";
    private static final String ADMIN_ID = "admin-juan-principal";

    @PostConstruct
    public void init() {
        inicializarUsuarioAdmin();
    }

    @Override
    public List<Usuario> listarTodos() {
        return usuarioDAO.findAll();
    }

    @Override
    public Usuario buscarPorId(String id) {
        return usuarioDAO.findById(id).orElse(null);
    }

    @Override
    public Usuario guardar(Usuario usuario) {
        if (ADMIN_ID.equals(usuario.getId())) {
            throw new RuntimeException("No se puede modificar el usuario administrador principal");
        }
        return usuarioDAO.save(usuario);
    }

    @Override
    public void eliminar(String id) {
        if (ADMIN_ID.equals(id)) {
            throw new RuntimeException("No se puede eliminar el usuario administrador principal");
        }
        usuarioDAO.deleteById(id);
    }

    @Override
    public Usuario buscarPorNombreUsuario(String nombreUsuario) {
        return usuarioDAO.findByNombreUsuario(nombreUsuario);
    }

    @Override
    public Usuario login(String nombreUsuario, String contrasena) {
        return usuarioDAO.findByNombreUsuarioAndContrasena(nombreUsuario, contrasena);
    }

    @Override
    public void inicializarUsuarioAdmin() {
        Usuario admin = usuarioDAO.findByNombreUsuario(ADMIN_USERNAME);
        if (admin == null) {
            admin = new Usuario();
            admin.setId(ADMIN_ID);
            admin.setNombreUsuario(ADMIN_USERNAME);
            admin.setContrasena("1234");
            admin.setRol("admin");
            usuarioDAO.save(admin);
        }
    }
}