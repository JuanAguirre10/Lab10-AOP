package com.tecsup.HospitalMdb.auditoria;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

/**
 * Repositorio para gestionar la auditoría de operaciones
 * en la base de datos.
 */
@Repository
public interface AuditoriaDao extends MongoRepository<Auditoria, String> {

    /**
     * Buscar todas las auditorías de una tabla específica
     * @param tabla Nombre de la tabla (ej: "pacientes", "citas")
     * @return Lista de auditorías de esa tabla
     */
    List<Auditoria> findByTabla(String tabla);

    /**
     * Buscar auditorías de un registro específico
     * @param idRegistro ID del registro auditado
     * @return Lista de auditorías de ese registro
     */
    List<Auditoria> findByIdRegistro(String idRegistro);

    /**
     * Buscar auditorías por usuario
     * @param usuario Nombre del usuario
     * @return Lista de auditorías realizadas por ese usuario
     */
    List<Auditoria> findByUsuario(String usuario);

    /**
     * Buscar auditorías por acción
     * @param accion Tipo de acción (CREATE, UPDATE, DELETE)
     * @return Lista de auditorías de ese tipo
     */
    List<Auditoria> findByAccion(String accion);

    /**
     * Buscar auditorías entre fechas
     * @param fechaInicio Fecha inicial
     * @param fechaFin Fecha final
     * @return Lista de auditorías en ese rango
     */
    List<Auditoria> findByFechaBetween(Date fechaInicio, Date fechaFin);

    /**
     * Buscar auditorías de una tabla y acción específica
     * @param tabla Nombre de la tabla
     * @param accion Tipo de acción
     * @return Lista de auditorías
     */
    List<Auditoria> findByTablaAndAccion(String tabla, String accion);

    /**
     * Obtener auditorías ordenadas por fecha descendente
     * @return Lista de auditorías más recientes primero
     */
    List<Auditoria> findAllByOrderByFechaDesc();
}