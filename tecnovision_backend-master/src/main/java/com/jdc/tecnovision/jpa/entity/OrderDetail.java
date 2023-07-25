package com.jdc.tecnovision.jpa.entity;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Reference;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "Order_Details")
@Getter
@Setter
public class OrderDetail implements Serializable {

    @Id
    @Reference(Order.class)
    private long orderDetailOrderId;

    @Id
    @ManyToOne(optional = false)
    private Product product;

    @Column(name = "quantity")
    private int quantity;

    @Column(name = "total_price")
    private double totalPrice;

    @Column(name = "unit_price")
    private double unitPrice;

    @Column(name = "service_price")
    private double servicePrice;

    @ManyToOne()
    private Service service;

}
