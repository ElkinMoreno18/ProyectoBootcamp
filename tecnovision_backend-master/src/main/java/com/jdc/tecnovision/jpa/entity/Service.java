package com.jdc.tecnovision.jpa.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.io.Serializable;
import javax.validation.constraints.DecimalMax;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotNull;
import org.hibernate.validator.constraints.Range;

@Entity
@Table(name = "Services", uniqueConstraints
        = @UniqueConstraint(name = "serviceName", columnNames = "service_name"))
@Getter
@Setter
public class Service implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "service_id")
    private long serviceId;

    @Column(name = "service_description")
    @Size(max = 255, message = "La descripcion del servicio debe tener un máximo de 255 caracteres")
    @NotBlank(message = "Campo 'Descripción' requerido")
    @NotNull(message = "Campo 'Descripción' requerido")
    private String description;

    @Column(name = "service_name")
    @Size(max = 45, message = "El nombre del servicio debe tener un máximo de 45 caracteres")
    @NotBlank(message = "Campo 'Nombre' requerido")
    @NotNull(message = "Campo 'Nombre' requerido")
    private String name;

    @Column(name = "service_value")
    @DecimalMin(value = "0")
    @DecimalMax("100")
    private double value;

    @Column(name = "state")
    private boolean state;

}
