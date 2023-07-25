package com.jdc.tecnovision.services;

import com.jdc.tecnovision.dao.IDaoDiscount;
import com.jdc.tecnovision.interfaces.ITransferObjects;
import com.jdc.tecnovision.jpa.entity.Discount;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class DiscountServicesImplements implements ITransferObjects<Discount> {

    @Autowired
    IDaoDiscount iDaoDiscount;

    @Override
    public void save(Discount o) {
        iDaoDiscount.save(o);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Discount> findAll() {
        return (List<Discount>) iDaoDiscount.findAll();
    }


    @Override
    public Discount findById(Long id) {
        return iDaoDiscount.findById(id).orElse(null);
    }

}
