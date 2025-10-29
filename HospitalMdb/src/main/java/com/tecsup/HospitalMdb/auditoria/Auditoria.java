package com.tecsup.HospitalMdb.auditoria;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

/**
 * Entidad para registrar automáticamente todas las operaciones
 * CREATE, UPDATE, DELETE realizadas en el sistema.
 *
 * Esta auditoría es diferente a la colección "bitacoras":
 * - bitacoras: LOGIN, LOGOUT, acciones del usuario
 * - auditoria: CREATE, UPDATE, DELETE de registros (automático con AOP)
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "auditoria")
public class Auditoria {

    @Id
    private String id;

    /**
     * Nombre de la colección/tabla afectada
     * Ejemplos: "pacientes", "citas", "medicos", "facturas"
     */
    private String tabla;

    /**
     * ID del registro que fue creado, actualizado o eliminado
     */
    private String idRegistro;

    /**
     * Fecha y hora en que se realizó la operación
     */
    private Date fecha;

    /**
     * Usuario que realizó la operación
     * TODO: Integrar con sistema de autenticación
     */
    private String usuario;

    /**
     * Tipo de acción realizada
     * Valores: "CREATE", "UPDATE", "DELETE"
     */
    private String accion;

    /**
     * Tiempo de ejecución del método en milisegundos (opcional)
     */
    private Long tiempoEjecucion;

    /**
     * Constructor sin ID (MongoDB lo genera automáticamente)
     */
    public Auditoria(String tabla, String idRegistro, Date fecha, String usuario, String accion) {
        this.tabla = tabla;
        this.idRegistro = idRegistro;
        this.fecha = fecha;
        this.usuario = usuario;
        this.accion = accion;
    }

    /**
     * Constructor con tiempo de ejecución
     */
    public Auditoria(String tabla, String idRegistro, Date fecha, String usuario, String accion, Long tiempoEjecucion) {
        this.tabla = tabla;
        this.idRegistro = idRegistro;
        this.fecha = fecha;
        this.usuario = usuario;
        this.accion = accion;
        this.tiempoEjecucion = tiempoEjecucion;
    }
}