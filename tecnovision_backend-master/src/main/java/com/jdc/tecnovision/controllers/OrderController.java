package com.jdc.tecnovision.controllers;

import com.jdc.tecnovision.jpa.entity.Order;
import com.jdc.tecnovision.services.OrderServicesImplements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.support.SessionStatus;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/order")
@SessionAttributes("orderController")
public class OrderController {

    @Autowired
    OrderServicesImplements orderServicesImplements;

    @GetMapping(value = "/list")
    public List<Order> listOrders(@RequestParam(value = "personId") long id, @RequestParam(value = "filter") String filter) {
        List<Order> orders = new ArrayList<>();
        if (filter.equals("None")) {
            orders = listWithOutFilter(id, orders);
        } else if (filter.contains("Ones")) {
            filter = filter.replace("Ones","");
            orders = listByOrderState(id, orders, filter);
        } else {
            orders = listByDate(id, orders, filter);
        }
        return orders;
    }

    @PostMapping(value = "/save")
    public List<String> saveOrder(@Valid @RequestBody Order order, BindingResult bd, SessionStatus sd) {
        String[] field = {"deliveryDate", "dispatchDate"};
        String message = "Error al crear el pedido";
        List<String> results = new ArrayList<>();
        results.add(message);
        if (bd.hasErrors()) {
            results.remove(0);
            for (String s : field) {
                if (bd.hasFieldErrors(s)) {
                    results.add(bd.getFieldError(s).getDefaultMessage());
                } else {
                    results.add(" ");
                }
            }
        } else {
            if (order.getOrderId() == 0) {
                long orderId = orderServicesImplements.orderLastId();
                order.getOrderDetailList().forEach(orderDetail -> orderDetail.setOrderDetailOrderId(orderId));
            }
            message = ((order.getOrderId() == 0) ? "El pedido ha sido registrado" : "Datos actualizados correctamente");
            orderServicesImplements.save(order);
            sd.setComplete();
            results.set(0, message);
        }
        return results;
    }

    @GetMapping(value = "/view/{id}")
    public Order viewOrder(@PathVariable(value = "id") Long idOrder) {
        return orderServicesImplements.findById(idOrder);
    }

    public List<Order> listWithOutFilter(long id, List<Order> orders) {
        if (id > 0) {
            orders = orderServicesImplements.findAllByCustomerIdAndState(id, "active");
        } else {
            orders = orderServicesImplements.findAll();
        }
        return orders;
    }

    public List<Order> listByOrderState(long id, List<Order> orders, String filter) {
        if (id > 0) {
            orders = orderServicesImplements.findAllByCustomerIdAndState(id, filter);
        } else {
            orders = orderServicesImplements.findAllByState(filter);
        }
        return orders;
    }

    public List<Order> listByDate(long id, List<Order> orders, String filter) {
        if (id > 0) {
            orders = orderServicesImplements.findAllByCustomerIdAndDate(id, filter);
        } else {
            orders = orderServicesImplements.findAllByDate(filter);
        }
        return orders;
    }

}
