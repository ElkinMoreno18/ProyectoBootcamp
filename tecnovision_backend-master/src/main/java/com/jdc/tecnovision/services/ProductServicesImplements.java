package com.jdc.tecnovision.services;

import com.jdc.tecnovision.dao.IDaoProduct;
import com.jdc.tecnovision.interfaces.ITransferObjects;
import com.jdc.tecnovision.jpa.entity.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServicesImplements implements ITransferObjects<Product> {

    @Autowired
    IDaoProduct iDaoProduct;

    @Override
    public void save(Product o) {
        iDaoProduct.save(o);
    }

    @Override
    public List<Product> findAll() {
        return (List<Product>) iDaoProduct.findAll();
    }

    @Override
    public Product findById(Long id) {
        return iDaoProduct.findById(id).orElse(null);
    }
}
