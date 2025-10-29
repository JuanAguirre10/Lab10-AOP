package com.tecsup.HospitalMdb.consultas.models;

import lombok.Data;
import java.time.LocalDate;

@Data
public class ConsultaDTO {
    private String id;
    private String numeroCita;
    private String nombreMedico;
    private String nombrePaciente;
    private LocalDate fecha;
    private String hora;
    private String motivoConsulta;
    private String observaciones;
}