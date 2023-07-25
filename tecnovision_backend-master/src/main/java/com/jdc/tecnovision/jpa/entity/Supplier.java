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
@Table(name = "Suppliers", uniqueConstraints =
        {@UniqueConstraint(name = "supplierNit", columnNames = "nit"),
         @UniqueConstraint(name = "supplierName", columnNames = "supplier_name")
        })
@Getter
@Setter
public class Supplier implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "supplier_id")
    private long supplierId;

    @Column(name = "supplier_email")
    @Size(max = 75, message = "El email del proveedor debe tener un máximo de 75 caracteres")
    @NotBlank(message = "Campo 'Correo Electronico' requerido")
    @NotNull(message = "Campo 'Correo Electronico' requerido")
    private String email;

    @Column(name = "supplier_name")
    @Size(max = 75, message = "El nombre del proveedor debe tener un máximo de 75 caracteres")
    @NotBlank(message = "Campo 'Nombre' requerido")
    @NotNull(message = "Campo 'Nombre' requerido")
    private String name;

    @Column(name = "nit")
    @Size(max = 50, message = "El nit del proveedor debe tener un máximo de 50 caracteres")
    @NotBlank(message = "Campo 'Nit' requerido")
    @NotNull(message = "Campo 'Nit' requerido")
    private String nit;

    @Column(name = "supplier_phone")
    @Range(min = 1, message = "El telefono del proveedor no puede ser igual a cero")
    @NotNull(message = "Campo 'Telefono' requerido")
    private BigDecimal phone;

    @Column(name = "state")
    private boolean state;

    @ManyToOne(optional = false)
    private City city;


}
