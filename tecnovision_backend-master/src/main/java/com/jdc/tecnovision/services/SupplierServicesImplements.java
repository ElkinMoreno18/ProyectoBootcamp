package com.jdc.tecnovision.services;

import com.jdc.tecnovision.interfaces.ITransferObjects;
import com.jdc.tecnovision.dao.IDaoSupplier;
import com.jdc.tecnovision.jpa.entity.Supplier;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class SupplierServicesImplements implements ITransferObjects<Supplier> {

    @Autowired
    IDaoSupplier iDaoSupplier;

    @Override
    public void save(Supplier o) {
        iDaoSupplier.save(o);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Supplier> findAll() {
        return (List<Supplier>) iDaoSupplier.findAll();
    }


    @Override
    public Supplier findById(Long id) {
        return iDaoSupplier.findById(id).orElse(null);
    }

}
