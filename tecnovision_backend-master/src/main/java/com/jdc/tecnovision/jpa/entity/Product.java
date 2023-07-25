package com.jdc.tecnovision.jpa.entity;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Range;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.io.Serializable;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "Products", uniqueConstraints = {
    @UniqueConstraint(name = "productCode", columnNames = "product_code")
    ,
        @UniqueConstraint(name = "productName", columnNames = "product_name")
})
@Getter
@Setter
public class Product implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id")
    private long productId;

    @Column(name = "product_code")
    @Range(min = 1, message = "El código del producto no puede ser cero")
    private long code;

    @Column(name = "product_description")
    @Size(max = 255, message = "La descripción del producto debe tener un máximo de 255 carácteres")
    @NotBlank(message = "Campo 'Descripción' requerido")
    @NotNull(message = "Campo 'Descripción' requerido")
    private String description;

    @Column(name = "image_path")
    @Size(max = 255, message = "La ruta de la imagen no puede exceder los 255 caracteres")
    @NotBlank(message = "Campo 'Imagen' requerido")
    @NotNull(message = "Campo 'Imagen' requerido")
    private String imagePath;

    @Column(name = "product_name")
    @Size(max = 255, message = "El nombre del producto debe tener un máximo de 255 carácteres")
    @NotBlank(message = "Campo 'Nombre' requerido")
    @NotNull(message = "Campo 'Nombre' requerido")
    private String name;

    @Column(name = "product_price")
    @DecimalMin(value = "0.1", message = "El precio del producto no puede ser cero")
    private double price;

    @Column(name = "stock")
    @Range(min = 1, message = "El stock del producto no puede ser cero")
    private int stock;

    @Column(name = "state")
    private boolean state;

    @ManyToOne(optional = false)
    private Brand brand;

    @ManyToOne(optional = false)
    private Category category;

    @ManyToOne(optional = false)
    private Supplier supplier;

}
