package com.jdc.tecnovision.services;

import com.jdc.tecnovision.dao.IDaoBrand;
import com.jdc.tecnovision.interfaces.ITransferObjects;
import com.jdc.tecnovision.jpa.entity.Brand;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class BrandServicesImplements implements ITransferObjects<Brand> {

    @Autowired
    IDaoBrand iDaoBrand;

    @Override
    public void save(Brand o) {
        iDaoBrand.save(o);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Brand> findAll() {
        return (List<Brand>) iDaoBrand.findAll();
    }


    @Override
    public Brand findById(Long id) {
        return iDaoBrand.findById(id).orElse(null);
    }

}
