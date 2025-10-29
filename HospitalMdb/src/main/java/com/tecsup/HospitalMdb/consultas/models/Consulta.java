package com.tecsup.HospitalMdb.consultas.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Data
@Document(collection = "consultas")
@JsonIgnoreProperties(ignoreUnknown = true)
public class Consulta {
    @Id
    private String id;
    private String idCita;
    private String idMedico;
    private String idPaciente;
    private LocalDate fecha;
    private String hora;
    private String motivoConsulta;
    private String observaciones;
}