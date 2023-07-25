package com.jdc.tecnovision.services;

import com.jdc.tecnovision.dao.IDaoCustomer;
import com.jdc.tecnovision.interfaces.ITransferObjects;
import com.jdc.tecnovision.jpa.entity.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CustomerServicesImplements implements ITransferObjects<Customer> {

    @Autowired
    IDaoCustomer iDaoCustomer;

    @Override
    public void save(Customer o) {
        iDaoCustomer.save(o);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Customer> findAll() {
        return (List<Customer>) iDaoCustomer.findAll();
    }

    @Override
    public Customer findById(Long id) {
        return iDaoCustomer.findById(id).orElse(null);
    }

    public Customer login(String email, String password){
        return iDaoCustomer.findByEmailAndPassword(email,password);
    }
}
