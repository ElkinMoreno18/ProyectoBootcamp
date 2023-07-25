package com.jdc.tecnovision.jpa.entity;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Range;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.math.BigDecimal;

@Entity
@Table(name = "Administrators", uniqueConstraints = {
        @UniqueConstraint(name = "administratorDocument", columnNames = "administrator_document")
        ,
        @UniqueConstraint(name = "administratorEmail", columnNames = "administrator_email")
})
@Getter
@Setter
public class Administrator implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "administrator_id")
    private long administratorId;


    @Column(name = "administrator_document")
    @NotNull
    @Range(min = 1, message = "El documento del administrador no puede ser cero")
    private long document;


    @Column(name = "administrator_address")
    @Size(max = 50, message = "La dirección del administrador debe tener un máximo de 50 caracteres")
    @NotBlank(message = "Campo 'Dirección' requerido")
    @NotNull(message = "Campo 'Dirección' requerido")
    private String address;


    @Column(name = "administrator_email")
    @Size(max = 75, message = "El email del administrador debe tener un máximo de 75 caracteres")
    @NotBlank(message = "Campo 'Correo Electrónico' requerido")
    @NotNull(message = "Campo 'Correo Electrónico' requerido")
    private String email;


    @Column(name = "administrator_last_name")
    @Size(min = 4, max = 50, message = "El apellido del administrador debe tener un máximo de 50 caracteres")
    @NotBlank(message = "Campo 'Apellido' requerido")
    @NotNull(message = "Campo 'Apellido' requerido")
    private String lastName;


    @Column(name = "administrator_name")
    @Size(max = 50, message = "El nombre del administrador debe tener un máximo de 50 caracteres")
    @NotBlank(message = "Campo 'Nombre' requerido")
    @NotNull(message = "Campo 'Nombre' requerido")
    private String name;


    @Column(name = "administrator_password")
    @Size(min = 6, max = 12, message = "La contraseña del administrador debe estar entre 6 y 12 caracteres")
    @NotBlank(message = "Campo 'Contraseña' requerido")
    @NotNull(message = "Campo 'Contraseña' requerido")
    private String password;


    @Column(name = "administrator_phone")
    @Range(min = 1, message = "El telefono del administrador no puede ser igual a cero")
    @NotNull(message = "Campo 'Teléfono' requerido")
    private BigDecimal phone;


    @Column(name = "state")
    private boolean state;


    @ManyToOne(optional = false)
    private City city;

}
