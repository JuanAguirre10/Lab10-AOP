package com.tecsup.HospitalMdb.citas.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Data
@Document(collection = "citas")
@JsonIgnoreProperties(ignoreUnknown = true)
public class Cita {
    @Id
    private String id;
    private String idPaciente;
    private String idMedico;
    private LocalDate fecha;
    private String hora;
    private String motivo;
    private String estado;
}