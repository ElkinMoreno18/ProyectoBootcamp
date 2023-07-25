package com.jdc.tecnovision.jpa.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import javax.validation.constraints.DecimalMax;
import javax.validation.constraints.DecimalMin;
import org.hibernate.validator.constraints.Range;

@Entity
@Table(name = "Discounts", uniqueConstraints = {
        @UniqueConstraint(name = "discountValue", columnNames = "discount_value")
})
@Getter
@Setter
public class Discount implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "discount_id")
    private long discountId;


    @Column(name = "state")
    private boolean state;
    

    @Column(name = "discount_value")
    @DecimalMin(value = "0.01", message= "El valor del descuento no puede ser cero")
    @DecimalMax("100")
    private double value;

}
