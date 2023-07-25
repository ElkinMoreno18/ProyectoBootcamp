package com.jdc.tecnovision.services;

import com.jdc.tecnovision.dao.IDaoOrder;
import com.jdc.tecnovision.interfaces.ITransferObjects;
import com.jdc.tecnovision.jpa.entity.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class OrderServicesImplements implements ITransferObjects<Order> {

    @Autowired
    IDaoOrder iDaoOrder;

    @Override
    public void save(Order o) {
        iDaoOrder.save(o);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Order> findAll() {
        return (List<Order>) iDaoOrder.findAll();
    }

    @Override
    public Order findById(Long id) {
        return iDaoOrder.findById(id).orElse(null);
    }

    @Transactional(readOnly = true)
    public List<Order> findAllByCustomerIdAndState(long customerId, String state) {
        return iDaoOrder.findAllByCustomer_CustomerIdAndState(customerId, state);
    }

    @Transactional(readOnly = true)
    public List<Order> findAllByState(String state) {
        return iDaoOrder.findAllByState(state);
    }

    @Transactional(readOnly = true)
    public List<Order> findAllByCustomerIdAndDate(long customerId, String filter) {
        List<Order> orders;
        if (filter.equals("oldest")) {
            orders = iDaoOrder.findAllByCustomer_CustomerIdAndStateOrderByDispatchDateAsc(customerId, "active");
        } else {
            orders = iDaoOrder.findAllByCustomer_CustomerIdAndStateOrderByDispatchDateDesc(customerId, "active");
        }
        return orders;
    }

    @Transactional(readOnly = true)
    public List<Order> findAllByDate(String filter) {
        List<Order> orders;
        if (filter.equals("oldest")) {
            orders = iDaoOrder.findAllByOrderByDispatchDateAsc();
        } else {
            orders = iDaoOrder.findAllByOrderByDispatchDateDesc();
        }
        return orders;
    }

    public long orderLastId() {
        return iDaoOrder.orderLastId();
    }

}
