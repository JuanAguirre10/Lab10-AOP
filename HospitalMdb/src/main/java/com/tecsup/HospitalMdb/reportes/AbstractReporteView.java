package com.tecsup.HospitalMdb.reportes;

import org.springframework.web.servlet.view.AbstractView;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.util.Map;

/**
 * Clase base abstracta para vistas de reportes.
 */
public abstract class AbstractReporteView extends AbstractView {

    /**
     * Constructor que establece el tipo de contenido
     */
    public AbstractReporteView(String contentType) {
        setContentType(contentType);
    }
}