package com.tecsup.HospitalMdb.pacientes.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Document(collection = "antecedentes_medicos")
@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class AntecedenteMedico {

    @Id
    private String id;
    private String idHistoria;
    private String tipo;
    private String descripcion;
}