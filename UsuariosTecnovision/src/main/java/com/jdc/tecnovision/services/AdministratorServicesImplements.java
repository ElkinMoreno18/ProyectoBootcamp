package com.jdc.tecnovision.services;

import com.jdc.tecnovision.dao.IDaoAdministrator;
import com.jdc.tecnovision.interfaces.ITransferObjects;
import com.jdc.tecnovision.jpa.entity.Administrator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class AdministratorServicesImplements implements ITransferObjects<Administrator> {

    @Autowired
    IDaoAdministrator iDaoAdministrator;

    @Override
    public void save(Administrator o) {
        iDaoAdministrator.save(o);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Administrator> findAll() {
        return (List<Administrator>) iDaoAdministrator.findAll();
    }

    @Override
    public Administrator findById(Long id) {
        return iDaoAdministrator.findById(id).orElse(null);
    }

    public Administrator login(String email, String password){
        return iDaoAdministrator.findByEmailAndPassword(email,password);
    }
}
