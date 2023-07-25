package com.jdc.tecnovision.dao;

import com.jdc.tecnovision.jpa.entity.Discount;
import org.springframework.data.repository.CrudRepository;

public interface IDaoDiscount extends CrudRepository<Discount, Long> {

}
