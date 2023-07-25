package com.jdc.tecnovision.dao;

import com.jdc.tecnovision.jpa.entity.PaymentMethod;
import org.springframework.data.repository.CrudRepository;

public interface IDaoPaymentMethod extends CrudRepository<PaymentMethod,Long> {
}
