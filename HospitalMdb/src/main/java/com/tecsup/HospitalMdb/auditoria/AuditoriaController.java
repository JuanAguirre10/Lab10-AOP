package com.tecsup.HospitalMdb.auditoria;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

/**
 * Controlador REST para consultar auditorías del sistema
 *
 * Endpoints disponibles:
 * - GET /api/auditorias - Listar todas
 * - GET /api/auditorias/tabla/{tabla} - Por tabla
 * - GET /api/auditorias/usuario/{usuario} - Por usuario
 * - GET /api/auditorias/accion/{accion} - Por acción
 * - GET /api/auditorias/registro/{id} - Por ID de registro
 */
@RestController
@RequestMapping("/api/auditorias")
@CrossOrigin(origins = "*")
public class AuditoriaController {

    @Autowired
    private AuditoriaDao auditoriaDao;

    /**
     * Listar todas las auditorías (más recientes primero)
     * GET /api/auditorias
     */
    @GetMapping
    public ResponseEntity<List<Auditoria>> listarTodas() {
        List<Auditoria> auditorias = auditoriaDao.findAllByOrderByFechaDesc();
        return ResponseEntity.ok(auditorias);
    }

    /**
     * Buscar auditorías por tabla
     * GET /api/auditorias/tabla/pacientes
     */
    @GetMapping("/tabla/{tabla}")
    public ResponseEntity<List<Auditoria>> buscarPorTabla(@PathVariable String tabla) {
        List<Auditoria> auditorias = auditoriaDao.findByTabla(tabla);
        return ResponseEntity.ok(auditorias);
    }

    /**
     * Buscar auditorías por usuario
     * GET /api/auditorias/usuario/juan
     */
    @GetMapping("/usuario/{usuario}")
    public ResponseEntity<List<Auditoria>> buscarPorUsuario(@PathVariable String usuario) {
        List<Auditoria> auditorias = auditoriaDao.findByUsuario(usuario);
        return ResponseEntity.ok(auditorias);
    }

    /**
     * Buscar auditorías por acción
     * GET /api/auditorias/accion/CREATE
     */
    @GetMapping("/accion/{accion}")
    public ResponseEntity<List<Auditoria>> buscarPorAccion(@PathVariable String accion) {
        List<Auditoria> auditorias = auditoriaDao.findByAccion(accion);
        return ResponseEntity.ok(auditorias);
    }

    /**
     * Buscar auditorías de un registro específico
     * GET /api/auditorias/registro/12345678
     */
    @GetMapping("/registro/{id}")
    public ResponseEntity<List<Auditoria>> buscarPorRegistro(@PathVariable String id) {
        List<Auditoria> auditorias = auditoriaDao.findByIdRegistro(id);
        return ResponseEntity.ok(auditorias);
    }

    /**
     * Buscar auditorías entre fechas
     * GET /api/auditorias/rango?inicio=2025-10-01&fin=2025-10-31
     */
    @GetMapping("/rango")
    public ResponseEntity<List<Auditoria>> buscarPorRangoFechas(
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date inicio,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date fin) {
        List<Auditoria> auditorias = auditoriaDao.findByFechaBetween(inicio, fin);
        return ResponseEntity.ok(auditorias);
    }

    /**
     * Buscar auditorías por tabla y acción
     * GET /api/auditorias/filtro?tabla=pacientes&accion=CREATE
     */
    @GetMapping("/filtro")
    public ResponseEntity<List<Auditoria>> buscarPorTablaYAccion(
            @RequestParam String tabla,
            @RequestParam String accion) {
        List<Auditoria> auditorias = auditoriaDao.findByTablaAndAccion(tabla, accion);
        return ResponseEntity.ok(auditorias);
    }

    /**
     * Obtener estadísticas de auditoría
     * GET /api/auditorias/estadisticas
     */
    @GetMapping("/estadisticas")
    public ResponseEntity<Object> obtenerEstadisticas() {
        long total = auditoriaDao.count();
        long creates = auditoriaDao.findByAccion("CREATE").size();
        long updates = auditoriaDao.findByAccion("UPDATE").size();
        long deletes = auditoriaDao.findByAccion("DELETE").size();

        var estadisticas = new java.util.HashMap<String, Object>();
        estadisticas.put("total", total);
        estadisticas.put("creates", creates);
        estadisticas.put("updates", updates);
        estadisticas.put("deletes", deletes);

        return ResponseEntity.ok(estadisticas);
    }
}