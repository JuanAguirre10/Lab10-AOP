package com.tecsup.HospitalMdb.facturacion.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Document(collection = "facturas")
@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class Factura {

    @Id
    private String id;
    private String idPaciente;
    private LocalDate fechaEmision;
    private Double total;
    private String estado;
}