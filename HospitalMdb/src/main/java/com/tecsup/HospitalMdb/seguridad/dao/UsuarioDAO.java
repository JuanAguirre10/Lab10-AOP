package com.tecsup.HospitalMdb.seguridad.dao;

import com.tecsup.HospitalMdb.seguridad.models.Usuario;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioDAO extends MongoRepository<Usuario, String> {
    Usuario findByNombreUsuario(String nombreUsuario);
    Usuario findByNombreUsuarioAndContrasena(String nombreUsuario, String contrasena);
}