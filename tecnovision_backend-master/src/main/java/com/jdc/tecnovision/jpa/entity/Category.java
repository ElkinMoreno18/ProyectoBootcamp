package com.jdc.tecnovision.jpa.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;

@Entity
@Table(name = "Categories", uniqueConstraints = {
        @UniqueConstraint(name = "categoryName", columnNames = "category_name")
})
@Getter
@Setter
public class Category implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_id")
    private long categoryId;


    @Column(name = "category_name")
    @Size(max = 45, message = "El nombre de la categoria debe tener un máximo de 45 caracteres")
    @NotBlank(message = "Campo 'Nombre' requerido")
    @NotNull(message = "Campo 'Nombre' requerido")
    private String name;


    @Column(name = "state")
    private boolean state;


    @ManyToOne()
    private Discount discount;

}
