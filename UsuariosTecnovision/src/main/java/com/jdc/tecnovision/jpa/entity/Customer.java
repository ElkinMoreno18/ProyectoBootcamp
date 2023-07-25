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
@Table(name = "Customers", uniqueConstraints = {
    @UniqueConstraint(name = "customerDocument", columnNames = "customer_document")
    ,
        @UniqueConstraint(name = "customerEmail", columnNames = "customer_email")
})
@Getter
@Setter
public class Customer implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    @Column(name = "customer_id")
    private long customerId;


    @Column(name = "customer_address")
    @Size(max = 50, message = "La dirección del cliente debe tener un máximo de 50 caracteres")
    @NotBlank(message = "Campo 'Dirección' requerido")
    @NotNull(message = "Campo 'Dirección' requerido")
    private String address;


    @Column(name = "customer_document")
    @Range(min = 1, message = "El documento del cliente no puede ser cero")
    private long document;


    @Column(name = "customer_email")
    @Size(max = 75, message = "El email del cliente debe tener un máximo de 75 caracteres")
    @NotBlank(message = "Campo 'Email' requerido")
    @NotNull(message = "Campo 'Email' requerido")
    private String email;


    @Column(name = "customer_last_name")
    @Size(max = 50, message = "El apellido del cliente debe tener un máximo de 50 caracteres")
    @NotBlank(message = "Campo 'Apellido' requerido")
    @NotNull(message = "Campo 'Apellido' requerido")
    private String lastName;


    @Column(name = "customer_name")
    @Size(max = 50, message = "El nombre del cliente debe tener un máximo de 50 caracteres")
    @NotNull(message = "Campo 'Nombre' requerido")
    @NotBlank(message = "Campo 'Nombre' requerido")
    private String name;


    @Column(name = "state")
    private boolean state;


    @Column(name = "customer_phone")
    @Range(min = 1, message = "El telefono del cliente no puede ser igual a cero")
    @NotNull(message = "Campo 'Telefono' requerido")
    private BigDecimal phone;


    @Column(name = "customer_password")
    @Size(min = 6, max = 12, message = "La contraseña del cliente debe estar entre 6 y 12 carácteres")
    @NotBlank(message = "Campo 'Contraseña' requerido")
    @NotNull(message = "Campo 'Contraseña' requerido")
    private String password;


    @ManyToOne(optional = false)
    private City city;


    @ManyToOne(optional = false)
    private Administrator administrator;

}
