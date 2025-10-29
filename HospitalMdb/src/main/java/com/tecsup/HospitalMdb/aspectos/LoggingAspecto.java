package com.tecsup.HospitalMdb.aspectos;

import com.tecsup.HospitalMdb.auditoria.Auditoria;
import com.tecsup.HospitalMdb.auditoria.AuditoriaDao;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.Calendar;

/**
 * ASPECTO DE LOGGING Y AUDITORÍA
 *
 * Este aspecto intercepta automáticamente los métodos de:
 * - Services: Para medir tiempo de ejecución y loggear parámetros
 * - Controllers: Para auditar operaciones CREATE, UPDATE, DELETE
 *
 * AOP (Aspect Oriented Programming) permite:
 * - Añadir funcionalidad sin modificar el código original
 * - Separar "concerns" transversales (logging, auditoría, seguridad)
 * - Mantener el código limpio y enfocado en la lógica de negocio
 */
@Component
@Aspect
public class LoggingAspecto {

    /**
     * Identificador único de transacción basado en timestamp
     * Se usa para rastrear operaciones relacionadas en los logs
     */
    private Long tx;

    @Autowired
    private AuditoriaDao auditoriaDao;

    /**
     * ASPECTO @Around - Envuelve la ejecución de métodos Service
     *
     * Se aplica a: Todos los métodos de clases *ServiceImpl
     * Objetivo: Medir tiempo de ejecución y loggear entrada/salida
     *
     * @param joinPoint Punto de ejecución interceptado
     * @return Resultado del método interceptado
     * @throws Throwable Si ocurre un error
     */
    @Around("execution(* com.tecsup.HospitalMdb..*ServiceImpl.*(..))")
    public Object logAround(ProceedingJoinPoint joinPoint) throws Throwable {

        // Iniciar transacción y timer
        tx = System.currentTimeMillis();
        long currTime = tx;

        // Obtener información del método interceptado
        Logger logger = LoggerFactory.getLogger(joinPoint.getTarget().getClass());
        String metodo = joinPoint.getSignature().getName();

        // Loggear parámetros de entrada (si los hay)
        if (joinPoint.getArgs().length > 0) {
            logger.info(metodo + "() INPUT: " + Arrays.toString(joinPoint.getArgs()));
        }

        // Ejecutar el método interceptado
        Object result = null;
        try {
            result = joinPoint.proceed(); // Llamada al método real
        } catch (Throwable e) {
            logger.error(metodo + "() ERROR: " + e.getMessage());
            throw e; // Re-lanzar la excepción
        }

        // Loggear tiempo de ejecución
        long tiempoTranscurrido = System.currentTimeMillis() - currTime;
        logger.info(metodo + "(): tiempo transcurrido " + tiempoTranscurrido + " ms.");

        return result;
    }

    /**
     * ASPECTO @After - Se ejecuta después de operaciones CRUD
     *
     * Se aplica a métodos de Controllers que:
     * - Comienzan con "guardar" (CREATE)
     * - Comienzan con "actualizar" (UPDATE)
     * - Comienzan con "eliminar" (DELETE)
     *
     * Objetivo: Registrar automáticamente en la colección "auditoria"
     *
     * @param joinPoint Punto de ejecución interceptado
     * @throws Throwable Si ocurre un error
     */
    @After("execution(* com.tecsup.HospitalMdb..*Controller.guardar*(..)) || " +
            "execution(* com.tecsup.HospitalMdb..*Controller.actualizar*(..)) || " +
            "execution(* com.tecsup.HospitalMdb..*Controller.eliminar*(..))")
    public void auditoria(JoinPoint joinPoint) throws Throwable {

        // Obtener información del método
        Logger logger = LoggerFactory.getLogger(joinPoint.getTarget().getClass());
        String metodo = joinPoint.getSignature().getName();
        String nombreClase = joinPoint.getTarget().getClass().getSimpleName();

        // Determinar tabla y acción
        String tabla = extraerNombreTabla(nombreClase);
        String accion = determinarAccion(metodo);
        String idRegistro = "desconocido";

        try {
            // Extraer ID del registro según el tipo de operación
            Object[] parametros = joinPoint.getArgs();

            if (metodo.startsWith("guardar") && parametros.length > 0) {
                // CREATE: El objeto completo viene como parámetro
                idRegistro = extraerIdDeObjeto(parametros[0]);

            } else if (metodo.startsWith("actualizar") && parametros.length >= 2) {
                // UPDATE: Generalmente (ID, Objeto)
                idRegistro = parametros[0].toString();

            } else if (metodo.startsWith("eliminar") && parametros.length > 0) {
                // DELETE: Solo el ID
                idRegistro = parametros[0].toString();
            }

            // Registrar en logs
            String traza = "tx[" + tx + "] - " + metodo;
            logger.info(traza + "(): registrando auditoria [" + tabla + "/" + idRegistro + "/" + accion + "]");

            // Guardar en base de datos
            Auditoria auditoria = new Auditoria(
                    tabla,
                    idRegistro,
                    Calendar.getInstance().getTime(),
                    "sistema", // TODO: Obtener usuario de sesión
                    accion
            );
            auditoriaDao.save(auditoria);

            logger.info(traza + "(): auditoria registrada exitosamente");

        } catch (Exception e) {
            logger.error("Error al registrar auditoria: " + e.getMessage());
            // No lanzar excepción para no afectar el flujo principal
        }
    }

    /**
     * Extrae el nombre de la tabla desde el nombre de la clase Controller
     * Ejemplo: PacienteController -> pacientes
     */
    private String extraerNombreTabla(String nombreClase) {
        if (nombreClase.endsWith("Controller")) {
            String tabla = nombreClase.replace("Controller", "").toLowerCase();
            // Pluralizar (simplificado)
            if (!tabla.endsWith("s")) {
                tabla += "s";
            }
            return tabla;
        }
        return "desconocido";
    }

    /**
     * Determina el tipo de acción según el nombre del método
     */
    private String determinarAccion(String metodo) {
        if (metodo.startsWith("guardar") || metodo.startsWith("crear")) {
            return "CREATE";
        } else if (metodo.startsWith("actualizar") || metodo.startsWith("editar")) {
            return "UPDATE";
        } else if (metodo.startsWith("eliminar")) {
            return "DELETE";
        }
        return "UNKNOWN";
    }

    /**
     * Intenta extraer el ID de un objeto usando reflexión
     * Busca métodos getId() o getters que retornen el ID
     */
    private String extraerIdDeObjeto(Object objeto) {
        try {
            // Intentar getId()
            var metodo = objeto.getClass().getMethod("getId");
            Object id = metodo.invoke(objeto);
            return id != null ? id.toString() : "generado";

        } catch (Exception e) {
            try {
                // Intentar getDni() para pacientes
                var metodo = objeto.getClass().getMethod("getDni");
                Object id = metodo.invoke(objeto);
                return id != null ? id.toString() : "desconocido";
            } catch (Exception ex) {
                return "desconocido";
            }
        }
    }
}