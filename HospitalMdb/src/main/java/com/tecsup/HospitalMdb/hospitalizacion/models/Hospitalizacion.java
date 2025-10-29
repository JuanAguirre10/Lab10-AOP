package com.tecsup.HospitalMdb.hospitalizacion.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.time.LocalDate;

@Document(collection = "hospitalizaciones")
@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class Hospitalizacion {

    @Id
    private String id;
    private String idPaciente;
    private String idHabitacion;
    private LocalDate fechaIngreso;
    private LocalDate fechaAlta;
    private String diagnosticoIngreso;
    private String estado;
}