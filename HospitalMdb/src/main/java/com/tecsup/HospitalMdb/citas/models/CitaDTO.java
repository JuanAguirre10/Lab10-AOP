package com.tecsup.HospitalMdb.citas.models;

import lombok.Data;
import java.time.LocalDate;

@Data
public class CitaDTO {
    private String id;
    private String nombrePaciente;
    private String nombreMedico;
    private LocalDate fecha;
    private String hora;
    private String motivo;
    private String estado;
}