package com.jdc.tecnovision.services;

import com.jdc.tecnovision.dao.IDaoCategory;
import com.jdc.tecnovision.interfaces.ITransferObjects;
import com.jdc.tecnovision.jpa.entity.Category;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CategoryServicesImplements implements ITransferObjects<Category> {

    @Autowired
    IDaoCategory iDaoCategory;

    @Override
    public void save(Category o) {
        iDaoCategory.save(o);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Category> findAll() {
        return (List<Category>) iDaoCategory.findAll();
    }


    @Override
    public Category findById(Long id) {
        return iDaoCategory.findById(id).orElse(null);
    }

}
