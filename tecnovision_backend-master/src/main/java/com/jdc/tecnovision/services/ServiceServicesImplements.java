package com.jdc.tecnovision.services;

import com.jdc.tecnovision.dao.IDaoService;
import com.jdc.tecnovision.interfaces.ITransferObjects;
import com.jdc.tecnovision.jpa.entity.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@org.springframework.stereotype.Service
public class ServiceServicesImplements implements ITransferObjects<Service> {

    @Autowired
    IDaoService iDaoService;

    @Override
    public void save(Service o) {
        iDaoService.save(o);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Service> findAll() {
        return (List<Service>) iDaoService.findAll();
    }


    @Override
    public Service findById(Long id) {
        return iDaoService.findById(id).orElse(null);
    }

}
