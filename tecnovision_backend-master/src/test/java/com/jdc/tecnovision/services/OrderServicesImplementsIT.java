package com.jdc.tecnovision.services;

import com.jdc.tecnovision.jpa.entity.Order;
import com.jdc.tecnovision.jpa.entity.OrderDetail;
import com.jdc.tecnovision.jpa.entity.Product;
import com.jdc.tecnovision.jpa.entity.Service;
import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import org.junit.Test;
import static org.junit.Assert.*;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@SpringBootTest
@RunWith(SpringRunner.class)
public class OrderServicesImplementsIT {
    
    @Autowired
    private OrderServicesImplements orderServicesImplements;
    
    @Autowired
    private CustomerServicesImplements customerServicesImplements;
    
    @Autowired
    private ProductServicesImplements productServicesImplements;
    
    @Autowired
    private ServiceServicesImplements serviceServicesImplements;
    
    @Autowired
    private PaymentMethodServicesImplements paymentMethodServicesImplements;

    /**
     * Test of save method, of class OrderServicesImplements.
     */
    @Test
    public void testSave() {
        Order order = new Order();
        order.setDispatchDate(Date.valueOf(LocalDate.now()));
        order.setDeliveryDate(Date.valueOf(LocalDate.now().plusDays(5)));
        order.setPaymentMethod(this.paymentMethodServicesImplements.findAll().get(0));
        order.setState("active");
        order.setCustomer(this.customerServicesImplements.findById((long) 1));
        order.setOrderDetailList(new ArrayList<>());
        long lastOrderId = this.orderServicesImplements.orderLastId();
        List<Product> products = this.productServicesImplements.findAll();
        List<Service> services = this.serviceServicesImplements.findAll();
        for (int i = 0; i < products.size(); i++) {
            OrderDetail orderDetail = new OrderDetail();
            orderDetail.setOrderDetailOrderId(lastOrderId);
            orderDetail.setService((i % 2 == 0) ? null : services.get((int) (Math.random() * (services.size() - 1))));
            orderDetail.setProduct(products.get(i));
            orderDetail.setQuantity((int) ((Math.random() * 15) + 1));
            orderDetail.setUnitPrice(products.get(i).getPrice());
            orderDetail.setTotalPrice(orderDetail.getQuantity() * orderDetail.getUnitPrice());
            order.getOrderDetailList().add(orderDetail);
        }
        order.getOrderDetailList().forEach(orderDetail -> order.setTotalPrice(order.getTotalPrice() + orderDetail.getTotalPrice()));
        this.orderServicesImplements.save(order);
        assertTrue(order.getOrderId() > 0);
    }

    /**
     * Test of findAll method, of class OrderServicesImplements.
     */
    @Test
    public void testFindAll() {
        assertTrue(this.orderServicesImplements.findAll().size() > 0);
    }

    /**
     * Test of findById method, of class OrderServicesImplements.
     */
    @Test
    public void testFindById() {
        assertNotNull(this.orderServicesImplements.findById((long) 2));
    }
    
}
