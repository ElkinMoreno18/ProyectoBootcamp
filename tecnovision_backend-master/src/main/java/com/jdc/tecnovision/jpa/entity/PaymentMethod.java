package com.jdc.tecnovision.jpa.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import javax.validation.constraints.Size;

@Entity
@Table(name = "Payment_methods")
@Getter
@Setter
public class PaymentMethod implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "payment_method_id")
    private long paymentMethodId;

    @Column(name = "payment_method")
    @Size(max = 255)
    @NotNull
    private String paymentMethod;

}
