package com.jdc.tecnovision.jpa.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;

@Entity
@Table(name = "Brands", uniqueConstraints = {
        @UniqueConstraint(name = "brandName", columnNames = "brand_name")
})
@Getter
@Setter
public class Brand implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "brand_id")
    private long brandId;


    @Column(name = "brand_name")
    @Size(max = 45, message = "El nombre de la marca debe tener un máximo de 45 caracteres")
    @NotBlank(message = "Campo 'Nombre' requerido")
    @NotNull(message = "Campo 'Nombre' requerido")
    private String name;


    @Column(name = "state")
    private boolean state;

}
