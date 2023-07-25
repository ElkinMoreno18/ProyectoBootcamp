package com.jdc.tecnovision.dao;

import com.jdc.tecnovision.jpa.entity.Customer;
import org.springframework.data.repository.CrudRepository;

public interface IDaoCustomer extends CrudRepository<Customer, Long> {

    Customer findByEmailAndPassword(String email, String password);
}
