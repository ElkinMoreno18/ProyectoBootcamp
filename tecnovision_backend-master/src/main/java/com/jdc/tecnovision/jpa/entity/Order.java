package com.jdc.tecnovision.jpa.entity;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Range;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "Orders")
@Getter
@Setter
public class Order implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    @Column(name = "order_id")
    private long orderId;


    @Column(name = "delivery_date")
    @Temporal(TemporalType.DATE)
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @NotNull
    private Date deliveryDate;

    @Column(name = "dispatch_date")
    @Temporal(TemporalType.DATE)
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @NotNull
    private Date dispatchDate;

    @Column(name = "state")
    private String state;

    @Column(name = "total_price")
    @Range(min = 0, message = "El valor del pedido no puede ser cero")
    private double totalPrice;

    @ManyToOne(optional = false)
    private Customer customer;

    @ManyToOne(optional = false)
    private PaymentMethod paymentMethod;

    @OneToMany(mappedBy ="orderDetailOrderId", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<OrderDetail> orderDetailList;

}
