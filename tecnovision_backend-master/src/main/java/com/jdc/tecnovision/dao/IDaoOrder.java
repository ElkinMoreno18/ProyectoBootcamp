package com.jdc.tecnovision.dao;

import com.jdc.tecnovision.jpa.entity.Order;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface IDaoOrder extends CrudRepository<Order, Long> {

    List<Order> findAllByCustomer_CustomerIdAndState(long id, String state);

    List<Order> findAllByState(String state);

    List<Order> findAllByCustomer_CustomerIdAndStateOrderByDispatchDateAsc(long id, String state);

    List<Order> findAllByCustomer_CustomerIdAndStateOrderByDispatchDateDesc(long id, String state);

    List<Order> findAllByOrderByDispatchDateAsc();

    List<Order> findAllByOrderByDispatchDateDesc();

    @Transactional
    @Procedure(procedureName = "ORDER_LAST_ID")
    Long orderLastId();

}
