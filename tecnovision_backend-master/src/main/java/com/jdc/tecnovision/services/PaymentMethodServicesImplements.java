package com.jdc.tecnovision.services;

import com.jdc.tecnovision.dao.IDaoPaymentMethod;
import com.jdc.tecnovision.interfaces.ITransferObjects;
import com.jdc.tecnovision.jpa.entity.PaymentMethod;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaymentMethodServicesImplements implements ITransferObjects<PaymentMethod> {

    @Autowired
    IDaoPaymentMethod iDaoPaymentMethod;

    @Override
    public void save(PaymentMethod o) {

    }

    @Override
    public List<PaymentMethod> findAll() {
        return (List<PaymentMethod>) iDaoPaymentMethod.findAll();
    }

    @Override
    public PaymentMethod findById(Long id) {
        return null;
    }
}
